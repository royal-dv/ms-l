import { NetworkConfigItem } from '@/types'

const BSC_CHAIN_ID = 56
const XDAI_CHAIN_ID = 100
const MAINNET_CHAIN_ID = 1
const GOERLI_CHAIN_ID = 5
const ARBITRUM_CHAIN_ID = 42161
const AVAX_CHAIN_ID = 43114
const FANTOM_CHAIN_ID = 250
const MATIC_CHAIN_ID = 137
const MOON_RIVER_CHAIN_ID = 1285
const MOON_BEAM_CHAIN_ID = 1284
const METIS_CHAIN_ID = 1088
const CRONOS_CHAIN_ID = 25
const HUOBI_CHAIN_ID = 128
const CELO_CHAIN_ID = 42220
const HARMONY_CHAIN_ID = 1666600000
const IOTEX_CHAIN_ID = 4689
const THUNDERCORE_CHAIN_ID = 108
const AURORA_CHAIN_ID = 1313161554
const TELOS_CHAIN_ID = 40
const ZENITH_CHAIN_ID = 79

export enum ChainId {
  BSC = BSC_CHAIN_ID,
  XDAI = XDAI_CHAIN_ID,
  MAINNET = MAINNET_CHAIN_ID,
  GOERLI = GOERLI_CHAIN_ID,
  ARBITRUM = ARBITRUM_CHAIN_ID,
  AVAX = AVAX_CHAIN_ID,
  FANTOM = FANTOM_CHAIN_ID,
  MATIC = MATIC_CHAIN_ID,
  MOON_RIVER = MOON_RIVER_CHAIN_ID,
  MOON_BEAM = MOON_BEAM_CHAIN_ID,
  METIS = METIS_CHAIN_ID,
  CRONOS = CRONOS_CHAIN_ID,
  HUOBI = HUOBI_CHAIN_ID,
  CELO = CELO_CHAIN_ID,
  HARMONY = HARMONY_CHAIN_ID,
  IOTEX = IOTEX_CHAIN_ID,
  THUNDERCORE = THUNDERCORE_CHAIN_ID,
  AURORA = AURORA_CHAIN_ID,
  TELOS = TELOS_CHAIN_ID,
  ZENITH = ZENITH_CHAIN_ID,
}

export const CHAINS: Record<ChainId, NetworkConfigItem> = {
  [ChainId.MAINNET]: {
    symbol: 'ETH',
    name: 'Ethereum Mainnet',
    icon: 'ethereum',
    blockDuration: 15000,
    tokenApis: [
      {
        type: 'ethplorer',
        url: 'https://api.ethplorer.io/getAddressInfo',
        queryParams: 'apiKey=freekey'
      }
    ],
    blockGasLimit: 7300000,
  },
  [ChainId.GOERLI]: {
    symbol: 'ETH',
    name: 'Goerli Testnet',
    icon: 'ethereum',
    blockDuration: 15000,
    tokenApis: [],
    blockGasLimit: 7300000,
  },
  [ChainId.XDAI]: {
    symbol: 'XDAI',
    name: 'Gnosis Chain',
    icon: 'gnosis',
    blockDuration: 3000, // ms
    tokenApis: [
      {
        type: 'blockScout',
        url: 'https://blockscout.com/poa/xdai/api',
        queryParams: 'module=account&action=tokenlist&address=',
      },
    ],
    blockGasLimit: 7000000,
  },
  [ChainId.BSC]: {
    symbol: 'BNB',
    name: 'Binance Smart Chain',
    icon: 'binance',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'convalenthq',
        url: 'https://api.covalenthq.com/v1',
        queryParams: 'no-nft-fetch=true&key=ckey_a7ad9dc8bab3459ba4ed5522568',
      },
    ],
    blockGasLimit: 25000000,
  },
  [ChainId.ARBITRUM]: {
    symbol: 'ETH',
    name: 'Arbitrum One',
    icon: 'arbitrum',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'convalenthq',
        url: 'https://api.covalenthq.com/v1',
        queryParams: 'no-nft-fetch=true&key=ckey_a7ad9dc8bab3459ba4ed5522568',
      },
    ],
    blockGasLimit: 2000000,
  },
  [ChainId.AVAX]: {
    symbol: 'AVAX',
    name: 'Avalanche C Chain',
    icon: 'avax',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'convalenthq',
        url: 'https://api.covalenthq.com/v1',
        queryParams: 'no-nft-fetch=true&key=ckey_a7ad9dc8bab3459ba4ed5522568',
      },
    ],
    blockGasLimit: 6000000,
  },
  [ChainId.FANTOM]: {
    symbol: 'FTM',
    name: 'Fantom Opera',
    icon: 'fantom',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'convalenthq',
        url: 'https://api.covalenthq.com/v1',
        queryParams: 'no-nft-fetch=true&key=ckey_a7ad9dc8bab3459ba4ed5522568',
      },
    ],
    blockGasLimit: 7300000,
  },
  [ChainId.MATIC]: {
    symbol: 'Matic',
    name: 'Polygon Chain',
    icon: 'matic',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'convalenthq',
        url: 'https://api.covalenthq.com/v1',
        queryParams: 'no-nft-fetch=true&key=ckey_a7ad9dc8bab3459ba4ed5522568',
      },
    ],
    blockGasLimit: 7300000,
  },
  [ChainId.MOON_RIVER]: {
    symbol: 'MOVR',
    name: 'MoonRiver',
    icon: 'moonriver',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'convalenthq',
        url: 'https://api.covalenthq.com/v1',
        queryParams: 'no-nft-fetch=true&key=ckey_a7ad9dc8bab3459ba4ed5522568',
      },
    ],
    blockGasLimit: 6000000,
  },
  [ChainId.MOON_BEAM]: {
    symbol: 'GLMR',
    name: 'MoonBeam',
    icon: 'moonbeam',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'convalenthq',
        url: 'https://api.covalenthq.com/v1',
        queryParams: 'no-nft-fetch=true&key=ckey_a7ad9dc8bab3459ba4ed5522568',
      },
    ],
    blockGasLimit: 6000000,
  },
  [ChainId.METIS]: {
    symbol: 'METIS',
    name: 'Metis',
    icon: 'metis',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'blockScout',
        url: 'https://andromeda-explorer.metis.io/api',
        queryParams: 'module=account&action=tokenlist&address=',
      },
    ],
    blockGasLimit: 8000000,
  },
  [ChainId.CRONOS]: {
    symbol: 'CRO',
    name: 'Cronos',
    icon: 'cronos',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'blockScout',
        url: 'https://cronos.crypto.org/explorer/api',
        queryParams: 'module=account&action=tokenlist&address=',
      },
    ],
    blockGasLimit: 4000000,
  },
  [ChainId.HUOBI]: {
    symbol: 'HT',
    name: 'Huobi ECO Chain',
    icon: 'huobi',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'convalenthq',
        url: 'https://api.covalenthq.com/v1',
        queryParams: 'no-nft-fetch=true&key=ckey_a7ad9dc8bab3459ba4ed5522568',
      },
    ],
    blockGasLimit: 15000000,
  },
  [ChainId.CELO]: {
    symbol: 'CELO',
    name: 'celo',
    icon: 'celo',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'blockScout',
        url: 'https://explorer.celo.org/api',
        queryParams: 'module=account&action=tokenlist&address=',
      },
    ],
    blockGasLimit: 7000000,
  },
  [ChainId.HARMONY]: {
    symbol: 'ONE',
    name: 'Harmony Mainnet',
    icon: 'harmony',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'convalenthq',
        url: 'https://api.covalenthq.com/v1',
        queryParams: 'no-nft-fetch=true&key=ckey_a7ad9dc8bab3459ba4ed5522568',
      },
    ],
    blockGasLimit: 32000000,
  },
  [ChainId.IOTEX]: {
    symbol: 'IOTX',
    name: 'IoTeX',
    icon: 'iotex',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'convalenthq',
        url: 'https://api.covalenthq.com/v1',
        queryParams: 'no-nft-fetch=true&key=ckey_a7ad9dc8bab3459ba4ed5522568',
      },
    ],
    blockGasLimit: 20000000,
  },
  [ChainId.THUNDERCORE]: {
    symbol: 'TT',
    name: 'ThunderCore',
    icon: 'thunderCore',
    blockDuration: 3000,
    tokenApis: [],
    blockGasLimit: 20000000,
  },
  [ChainId.AURORA]: {
    symbol: 'ETH',
    name: 'Aurora',
    icon: 'aurora',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'convalenthq',
        url: 'https://api.covalenthq.com/v1',
        queryParams: 'no-nft-fetch=true&key=ckey_a7ad9dc8bab3459ba4ed5522568',
      },
    ],
    blockGasLimit: 6821975,
  },
  [ChainId.TELOS]: {
    symbol: 'TLOS',
    name: 'Telos EVM',
    icon: 'telos',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'convalenthq',
        url: 'https://api.covalenthq.com/v1',
        queryParams: 'no-nft-fetch=true&key=ckey_a7ad9dc8bab3459ba4ed5522568',
      },
    ],
    blockGasLimit: 2000000,
  },
  [ChainId.ZENITH]: {
    symbol: 'ZENITH',
    name: 'Zenith Mainnet',
    icon: 'zenith',
    blockDuration: 3000,
    tokenApis: [
      {
        type: 'blockScout',
        url: 'https://scan.zenithchain.co/api',
        queryParams: 'module=account&action=tokenlist&address=',
      },
    ],
    blockGasLimit: 7000000,
  },
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const NATIVE_CURRENCY_ADDRESS = '0x000000000000000000000000000000000000bEEF'
