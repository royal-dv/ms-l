import { MaybeRef } from '@/types'
import { getWalletProvider } from '@/providers/wallet'

export function useWalletProvider(_key: MaybeRef<string>) {
  const key = computed(() => unref(_key))
  return computed(() => getWalletProvider(String(key.value)))
}
