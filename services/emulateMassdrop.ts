import { Contract, BigNumberish } from 'ethers'

import { EmulateCallback, EmulateInput, PrepareParamsInput } from '@/types'

import { numbers } from '@/constants/numbers'
import { contracts } from '@/constants/contracts'

import { setMaxApprove } from '@/services/token'
import { getProvider } from '@/services/provider'
import { getFork, removeForkRPC, topUpEther } from '@/services/tenderly'

import { generateAddresses } from '@/utils/generateAddresses'
import { getTotal } from '@/utils/emulate'

import ERC20ABI from '@/abi/ERC20.json'
import MassdropABI from '@/abi/Massdrop.json'
import { createMerkleTree, makeCreateAirdropRequest } from './tokenCreateAirdrop'

async function prepareParams(payload: PrepareParamsInput, callback: EmulateCallback) {
  const { chainId, recipientsAmount, tokenAddress, ownerAddress, rpc } = payload
  const provider = getProvider(rpc)

  // You don't need to impersonate the address to use it!
  const signer = provider.getUncheckedSigner(ownerAddress)

  const erc20Contract = new Contract(tokenAddress, ERC20ABI, signer)
  const massdropContract = new Contract(contracts.MASSDROP[chainId], MassdropABI, signer)

  await topUpEther(provider, signer._address)

  callback({ status: 'emulate approve' })
  await setMaxApprove(erc20Contract, signer._address, massdropContract.address)
  const tokenDecimals = await erc20Contract.callStatic.decimals()

  callback({ status: 'generate addresses' })
  const recipients = generateAddresses(recipientsAmount, tokenDecimals)

  const merkleTree = createMerkleTree(recipients)
  const total = getTotal(recipients, tokenDecimals)

  callback({ status: 'fetch fee' })
  const fee: BigNumberish = await massdropContract.fee()

  // any string like id from backend
  const airdropName = String(Date.now())

  return {
    recipients,
    airdropName,
    massdropContract,
    merkleRootHex: merkleTree.getHexRoot(),
    tokenAddress,
    total,
    fee,
  }
}

export async function emulateMassdrop(payload: EmulateInput, callback: EmulateCallback) {
  const { rpc, id } = await getFork(payload.chainId)

  try {
    callback({ step: 'preparing params', status: '' })
    const params = await prepareParams({ rpc, ...payload }, callback)

    callback({ step: 'multisend emulation', status: '' })

    const { airdropName, massdropContract, merkleRootHex, tokenAddress, total, fee } = params

    console.log(params)

    const receipt = await makeCreateAirdropRequest({
      airdropName,
      merkleRootHex,
      tokenAddress,
      total,
      fee,
      massdropContract,
    })

    callback({ step: '', status: '' })

    return { ...receipt, fee }
  } catch (err) {
    console.error('emulateMassdrop error:', err.message)
    throw err
  } finally {
    await removeForkRPC(id)
  }
}
