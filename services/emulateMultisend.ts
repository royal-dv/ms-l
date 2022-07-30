import { Contract, BigNumber, BigNumberish } from 'ethers'

import { EmulateCallback, EmulateInput, PrepareParamsInput, SimulationInput, Statuses } from '@/types'

import { numbers } from '@/constants/numbers'
import { contracts } from '@/constants/contracts'
import { CHAINS, NATIVE_CURRENCY_ADDRESS } from '@/constants/chains'

import { setMaxApprove } from '@/services/token'
import { getProvider } from '@/services/provider'
import { makeMultisendRequest } from '@/services/tokenMultisend'
import { getFork, removeForkRPC, topUpEther } from '@/services/tenderly'

import { sleep } from '@/utils/promises'
import { generateAddresses } from '@/utils/generateAddresses'
import { getBatchParams, getBatchSize } from '@/utils/emulate'

import ERC20ABI from '@/abi/ERC20.json'
import MultisenderABI from '@/abi/Multisender.json'

async function prepareParams(payload: PrepareParamsInput, callback: EmulateCallback) {
  const { chainId, recipientsAmount, tokenAddress, ownerAddress, rpc } = payload
  const provider = getProvider(rpc)

  // You don't need to impersonate the address to use it!
  const signer = provider.getUncheckedSigner(ownerAddress)

  const erc20Contract = new Contract(tokenAddress, ERC20ABI, signer)
  const multisenderContract = new Contract(contracts.MULTISENDER[chainId], MultisenderABI, signer)

  await topUpEther(provider, signer._address)

  let decimals = numbers.ETH_DECIMALS

  if (erc20Contract.address !== NATIVE_CURRENCY_ADDRESS) {
    callback({ status: 'emulate approve' })
    await setMaxApprove(erc20Contract, signer._address, multisenderContract.address)
    decimals = await erc20Contract.callStatic.decimals()
  }

  callback({ status: 'generate addresses' })
  const recipients = generateAddresses(recipientsAmount, decimals)

  callback({ status: 'fetch fee' })
  const fee: BigNumberish = await multisenderContract.callStatic.fee()

  return { fee, recipients, multisenderContract, decimals }
}

async function findGasForOne(payload: SimulationInput, callback, txCountPerCall?: number, statuses: Statuses = []) {
  const result = []
  try {
    const { multisendParams, recipients, chainId } = payload
    if (!txCountPerCall) {
      txCountPerCall = payload.recipients.length
    }

    const batches = Math.ceil(recipients.length / txCountPerCall)

    callback({ status: `emulate multisend, batches: ${batches}, addresses in batch: ${txCountPerCall}` })

    for (let i = 0; i < batches; i++) {
      const contributors = recipients
      const multisendReceipt = await makeMultisendRequest({ contributors, ...multisendParams })

      let [last, prevLast] = statuses

      if (!last?.status && txCountPerCall !== contributors.length) {
        i = recipients.length
        if (!prevLast?.txCountPerCall) {
          statuses = [{ status: true, txCountPerCall }, { status: false, txCountPerCall: txCountPerCall * 1.5 }]
        } else {
          statuses.unshift({ status: true, txCountPerCall })
        }
        const batchSize = getBatchSize(txCountPerCall, payload.recipients.length, statuses)
        return findGasForOne(payload, callback, batchSize, statuses)
      }
      result.push(multisendReceipt)
    }

    const maxSpendGas = result.reduce((acc, curr) => acc.gte(curr.gasUsed) ? acc : curr.gasUsed, numbers.BG_ZERO)

    const bump = 1150 // 1.15 (15%)
    const bumpDivider = 1000

    const gasForOne = maxSpendGas.div(txCountPerCall).mul(bump).div(bumpDivider)
    const txInBLock = BigNumber.from(CHAINS[chainId].blockGasLimit).div(gasForOne).sub(1)
    const batchesCount = Math.ceil(recipients.length / Number(txInBLock._hex))

    callback({ status: `calculate data for multisend, batches: ${batchesCount}, addresses in batch: ${txInBLock}, gas used for 1: ${gasForOne}` })
    // ToDo should remove that? If ll remove, set this data to UI
    await sleep(1500)

    return { batchesCount, txInBLock, gasForOne }
  } catch (err) {
    statuses.unshift({ status: false, txCountPerCall })

    console.error(`multisend - ${txCountPerCall}`, err.message)
    const batchSize = getBatchSize(txCountPerCall, payload.recipients.length, statuses)
    callback({ status: `failed: ${err.message}` })

    await sleep(1000)
    if(txCountPerCall >= 5) {
      return findGasForOne(payload, callback, batchSize, statuses)
    } else {
      throw err
    }
  }
}

async function multisend(payload, callback, txCountPerCall: number, batchCount: number) {
  try {
    const { multisendParams, recipients } = payload

    const txs = []

    for (let i = 0; i < batchCount; i++) {
      callback({ status: `sending transaction: ${i + 1} / ${batchCount}` })

      const { contributors } = getBatchParams(recipients, txCountPerCall, i)
      const multisendReceipt = await makeMultisendRequest({ ...multisendParams, contributors })

      txs.push(multisendReceipt)
    }

    const gasUsed = txs.reduce((acc, curr) => acc.add(curr.gasUsed), numbers.BG_ZERO)
    const totalTxs = txs.length

    return { gasUsed, totalTxs, batchCount, txInBLock: txCountPerCall }
  } catch (err) {
    console.error(`multisend - ${txCountPerCall}`, err.message)
    const newBatchSize = Math.ceil(txCountPerCall - (txCountPerCall * 0.2))

    const newBatchCount = Math.ceil(payload.recipients.length / newBatchSize)
    callback({ status: `FAILED!! \n new batch count: ${newBatchCount}, new batch size: ${newBatchSize}, ` })

    return multisend(payload, callback, newBatchSize, batchCount)
  }
}

export async function emulateMultisend(payload: EmulateInput, callback: EmulateCallback) {
  const { rpc, id } = await getFork(payload.chainId)

  try {
    callback({ step: 'preparing params', status: '' })
    const { fee, recipients, multisenderContract, decimals } = await prepareParams({ rpc, ...payload }, callback)

    const multisendParams = { fee, multisenderContract, tokenAddress: payload.tokenAddress, decimals }
    const simulateParams = { multisendParams, recipients, chainId: payload.chainId }

    callback({ step: 'txs in batch calculation', status: '' })
    const { batchesCount, txInBLock, gasForOne } = await findGasForOne(simulateParams, callback)

    callback({ step: 'multisend emulation', status: '' })
    const multisendReceipt = await multisend(simulateParams, callback, Number(txInBLock._hex), batchesCount)
    callback({ step: '', status: '' })

    return { ...multisendReceipt, gasForOne }
  } catch (err) {
    console.error('emulateMultisend error:', err.message)
    throw err
  } finally {
    await removeForkRPC(id)
  }
}


