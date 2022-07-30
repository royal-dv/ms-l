import type { ChainId } from '@/constants/chains'

export { ChainId }

export type NetworkConfigItem = {
  symbol: string
  name: string
  icon: string
  blockDuration: number
  blockGasLimit: number
  tokenApis: Array<{
    type: string
    url: string
    queryParams: string
  }>
}

export interface WalletInfo {
  // eslint-disable-next-line
  connector?: any
  name: string
  iconName: string
  description: string
}
