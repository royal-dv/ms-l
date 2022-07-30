import { ChainId } from './chains'

export const RPC_LIST: Record<ChainId, string> = {
  [ChainId.GOERLI]: 'https://goerli.infura.io/v3/9b8f0ddb3e684ece890f594bf1710c88',
  [ChainId.MAINNET]: 'https://mainnet.infura.io/v3/9b8f0ddb3e684ece890f594bf1710c88',
  [ChainId.XDAI]: 'https://xdai-rpc.ztake.org/http/7M23V5nGEAuGsTcmBZsDuMAv6KRbTNKZ/',
  [ChainId.BSC]: 'https://bsc-rpc.ztake.org/http/NHzjp9VUc46HPQajBCJLAzUhZDnmc25L/',
  [ChainId.ARBITRUM]: 'https://arb-mainnet.g.alchemy.com/v2/kuRwsqefQVyXRL2St4NEVE-hC7JImR4b',
  [ChainId.AVAX]: 'https://api.avax.network/ext/bc/C/rpc',
  [ChainId.FANTOM]: 'https://rpc.ftm.tools',
  [ChainId.MATIC]: 'https://polygon-mainnet.g.alchemy.com/v2/4FYwLgGp9OD_YSc_coYZuo9m7Y2E0caJ',
  [ChainId.MOON_RIVER]: 'https://rpc.api.moonriver.moonbeam.network',
  [ChainId.MOON_BEAM]: 'https://rpc.api.moonbeam.network',
  [ChainId.METIS]: 'https://andromeda.metis.io/?owner=1088',
  [ChainId.CRONOS]: 'https://evm.cronos.org',
  [ChainId.HUOBI]: 'https://http-mainnet.hecochain.com',
  [ChainId.CELO]: 'https://forno.celo.org',
  [ChainId.HARMONY]: 'https://api.harmony.one',
  [ChainId.IOTEX]: 'https://babel-api.mainnet.iotex.io',
  [ChainId.THUNDERCORE]: 'https://mainnet-rpc.thundercore.com',
  [ChainId.AURORA]: 'https://aurora-mainnet.infura.io/v3/5067eb1eff9d4f0e96c9761b116cd4bd',
  [ChainId.TELOS]: 'https://mainnet.telos.net/evm',
  [ChainId.ZENITH]: 'https://dataserver-1.zenithchain.co',
}
