import { BigNumber, utils } from 'ethers'
import { acceptHMRUpdate, defineStore } from 'pinia'

import { numbers } from '@/constants/numbers'
import { wallets } from '@/constants/wallet'
import { ChainId, CHAINS } from '@/constants/chains'

import { fromWei } from '@/utils/decimals'
import { fetchTokens } from '@/services/tokens'

import { useWalletProvider } from '@/composables/providers'

type Balance = {
  full: BigNumber
  formatted: string
  isFetching: boolean
}

export const useWalletStore = defineStore(
  'wallet',
  () => {

    const isConnected = ref(false)
    const providerName = ref(wallets.METAMASK)
    const walletAddress = ref<string>()

    const isMismatchNetwork = ref(false)
    const chainId = ref<ChainId>(ChainId.MAINNET)
    const chainConfig = ref(CHAINS[chainId.value])
    const tokens = ref([])

    const walletBalance = ref<Balance>({
      full: numbers.BG_ZERO,
      formatted: '0',
      isFetching: false,
    })

    const provider = useWalletProvider(providerName.value)

    function onCheckMismatchNetwork(chainId: ChainId) {
      isMismatchNetwork.value = !CHAINS[chainId]
    }

    function onChainChange(_chainId: string) {
      try {
        chainId.value = BigNumber.from(_chainId).toNumber()
        chainConfig.value = CHAINS[chainId.value]
        onCheckMismatchNetwork(chainId.value)
      } catch (err) {
        console.log('Error while change chain: ', (err as Error).message)
      }
    }

    function onAccountChange(account: string) {
      // https://github.com/MetaMask/metamask-extension/issues/10125
      if (account) {
        if (!isConnected) {
          return
        }
        walletAddress.value = account
        updateTokens()
        onUpdateBalance()
      } else {
        onClearState()
      }
    }

    async function onUpdateBalance() {
      try {
        walletBalance.value.isFetching = true
        if (!walletAddress.value) {
          return
        }
        const balance = await provider.value.getBalance({ address: walletAddress.value })
        walletBalance.value.full = BigNumber.from(balance)
        walletBalance.value.formatted = fromWei(balance)
      } catch (err) {
        console.log('updateBalance error', (err as Error).message)
      } finally {
        walletBalance.value.isFetching = false
      }
    }

    async function updateTokens() {
      tokens.value = await fetchTokens({
        chainId: chainId.value,
        ethAccount: walletAddress.value,
        ethBalance: walletBalance.value.full,
      })
    }


    async function onConnect(_providerName = wallets.METAMASK) {
      providerName.value = _providerName

      walletAddress.value = await provider.value.setupProvider()


      await onUpdateBalance()
      const _chainId = await provider.value.checkNetworkVersion()
      onChainChange(String(_chainId))

      isConnected.value = true
      updateTokens()
      return walletAddress.value
    }

    function onDisconnect() {
      providerName.value = wallets.METAMASK
      walletAddress.value = ''
      onChainChange(String(ChainId.MAINNET))

      walletBalance.value = {
        full: numbers.BG_ZERO,
        formatted: '0',
        isFetching: false,
      }

      isConnected.value = false
    }

    function onClearState() {
      onDisconnect()
    }

    async function switchChain(chainId: ChainId) {
      try {
        await provider.value.sendRequest({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: utils.hexValue(chainId) }],
        })
        onUpdateBalance()
        updateTokens()
      } catch (error) {
        console.error(error.message)
        throw error
      }
    }

    return {
      tokens,
      chainId,
      chainConfig,
      isConnected,
      providerName,
      walletAddress,
      walletBalance,
      isMismatchNetwork,

      switchChain,
      onChainChange,
      onUpdateBalance,
      onAccountChange,
      onCheckMismatchNetwork,

      onConnect,
      onDisconnect,
      onClearState,
    }
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWalletStore, import.meta.hot))
}
