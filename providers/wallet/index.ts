import { SUPPORTED_WALLETS } from '@/constants/wallet'

import { ProviderOptions } from './types'
import { AbstractProvider, abstractProvider } from './walletProvider'

class Providers {
  private readonly providers: Map<string, AbstractProvider> = new Map()

  public getProvider(key: string, options: ProviderOptions): AbstractProvider {
    if (!this.providers.has(key)) {
      const provider = abstractProvider({ provider: options.provider })
      this.providers.set(key, provider)
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.providers.get(key)!
  }
}

const providers = new Providers()

export function getWalletProvider(key: string): AbstractProvider {
  const wallet = SUPPORTED_WALLETS[String(key).toUpperCase()]
  const provider = wallet.connector()
  return providers.getProvider(key, { provider })
}
