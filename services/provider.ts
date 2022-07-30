import { providers } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'

const _providers = new Map()
function getProvider(rpcUrl): JsonRpcProvider {
  const existProvider = _providers.get(rpcUrl)
  if (existProvider) {
    return existProvider
  }
  const newProvider = new providers.JsonRpcProvider(rpcUrl)
  _providers.set(rpcUrl, newProvider)
  return newProvider
}

export { getProvider }
