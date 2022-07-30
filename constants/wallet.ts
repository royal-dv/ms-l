import { WalletInfo } from '@/types'

enum wallets {
  METAMASK = 'METAMASK',
}

const SUPPORTED_WALLETS: Record<string, WalletInfo> = {
  [wallets.METAMASK]: {
    connector: () => window.ethereum,
    name: 'MetaMask',
    iconName: 'metamask',
    description: 'Easy-to-use browser extension.',
  },
}



export { SUPPORTED_WALLETS, wallets }
