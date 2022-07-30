import { BigNumber, Contract, utils } from 'ethers'

import { ChainId, MultisendParams } from '@/types'

import { getTotal } from '@/utils/emulate'
import { getProvider } from '@/services/provider'

import { RPC_LIST } from '@/constants/rpc'
import { numbers } from '@/constants/numbers'
import { contracts } from '@/constants/contracts'
import { NATIVE_CURRENCY_ADDRESS, ZERO_ADDRESS } from '@/constants/chains'

import MultisenderABI from '@/abi/Multisender.json'


async function getServiceFee(batches: number, chainId: ChainId, owner: string) {
  const provider = getProvider(RPC_LIST[chainId])
  const multisenderContract = new Contract(contracts.MULTISENDER[chainId], MultisenderABI, provider)
  const unlimAccess = await multisenderContract.callStatic.getUnlimAccess(owner)
  if (unlimAccess.isZero()) {
    const fee = await multisenderContract.callStatic.fee()
    return utils.parseEther(fee.toString()).mul(batches)
  }
  return numbers.BG_ZERO
}

async function makeMultisendRequest(payload: MultisendParams) {
  const { fee, contributors, multisenderContract, tokenAddress, decimals } = payload

  const total = getTotal(contributors, decimals)
  const hardcodeGasPrice = 100_000_000_000 // 100 gwei

  if (tokenAddress !== NATIVE_CURRENCY_ADDRESS) {
    const multisend = await multisenderContract.multisendToken(tokenAddress, contributors, total._hex, ZERO_ADDRESS, {
      value: fee,
      gasPrice: hardcodeGasPrice,
    })

    return await multisend.wait()
  } else {
    const multisendEther = await multisenderContract.multisendEther(contributors, {
      value: total.add(fee),
      gasPrice: hardcodeGasPrice,
    })

    return await multisendEther.wait()
  }
}

export { makeMultisendRequest, getServiceFee }
