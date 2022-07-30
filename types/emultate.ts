import { BigNumberish, Contract } from 'ethers'

import { ChainId } from '@/constants/chains'

export type EmulateInput = {
  chainId: ChainId
  tokenAddress: string
  ownerAddress: string
  recipientsAmount: number
}

type EmulateCallbackInput = {
  step?: string
  status: string
}
export type EmulateCallback = (payload: EmulateCallbackInput) => void

export type Status = {
  txCountPerCall: number
  status: boolean
}

export type GeneratedMultisend = {
  fee: BigNumberish
  tokenAddress: string
  multisenderContract: Contract
  decimals: number
}

export type Contributor = { recipient: string; balance: BigNumberish }
export type Contributors = Contributor[]

export type MultisendParams = GeneratedMultisend & {
  contributors: Contributors
}

export type SimulationInput = {
  chainId: ChainId
  recipients: Contributors
  multisendParams: GeneratedMultisend
}

export type PrepareParamsInput = EmulateInput & { rpc: string }

export type Statuses = Status[]

export type AirdropParams = {
  airdropName: string
  merkleRootHex: string
  tokenAddress: string
  total: BigNumberish
  fee: BigNumberish
  massdropContract: Contract
}
