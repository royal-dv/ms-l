import { storeToRefs } from 'pinia'
import { getAddress } from 'ethers/lib/utils'

import { useWalletStore } from '@/stores/wallet'

import { numbers } from '@/constants/numbers'


import { useWalletProvider } from '@/composables/providers/useWalletProvider'

export function useWalletListeners() {
  const walletStore = useWalletStore()
  const { providerName } = storeToRefs(walletStore)

  function onListenChain(chainId: string) {
    walletStore.onChainChange(chainId)
    walletStore.onUpdateBalance()
  }

  function onListenAccount(accounts: string[]) {
    const checksumAddress = getAddress(accounts[numbers.ARR_START_INDEX])
    walletStore.onAccountChange(checksumAddress)
  }

  watch(
    providerName,
    (freshProviderName, oldProviderName) => {
      if (oldProviderName) {
        const oldProvider = useWalletProvider(oldProviderName)

        oldProvider.value.off({ method: 'chainChanged', callback: onListenChain })
        oldProvider.value.off({ method: 'accountsChanged', callback: onListenAccount })
      }

      if (freshProviderName) {
        const freshProvider = useWalletProvider(freshProviderName)

        freshProvider.value.on({ method: 'chainChanged', callback: onListenChain })
        freshProvider.value.on({ method: 'accountsChanged', callback: onListenAccount })
      }
    },
    { immediate: true },
  )
}
