<template>
  <article>
    <button v-if='isConnected' @click='handleDisconnect' class="b-connect">
      <img src='@/assets/src/icons/wallet.svg' />
      <span>Disconnect wallet</span>
    </button>
    <button v-else @click='handleConnect' class="b-connect">
      <img src='@/assets/src/icons/wallet.svg' />
      <span>Connect wallet</span>
    </button>

    <!--    {{walletStore.walletBalance}}-->
  </article>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { wallets } from '@/constants/wallet'
import { useWalletStore } from '@/stores/wallet'

const walletStore = useWalletStore()
const { isConnected } = storeToRefs(walletStore)
console.log('isConnected', isConnected.value)

function handleConnect() {
  walletStore.onConnect(wallets.METAMASK)
}

function handleDisconnect() {
  walletStore.onDisconnect()
}
</script>

<style lang="scss">
.b-connect {
  font-weight: 600;
  font-size: 15px;
  line-height: 28px;
  color: #FFFFFF;
  display: flex;
  background: linear-gradient(180deg, #0B124E 0%, #0B124E 100%);
  border: 1px solid #0B1D5B;
  border-radius: 12px;
  padding: 11px 26px;
  margin: 0 auto 64px;

  img {
    padding-right: 17px;
  }
}
</style>
