<template>
  <section :class="$style.calculator__header">
    <button v-for="(project, index) in projects" :key="project.name" @click="handleProjectChange(index)">
      {{ project.title }}
    </button>
  </section>
  <article :class="$style.calculator">

    <WalletConnection />
    <section :class="$style.calculator__content">
      <!-- placeholder="Enter token contract address" -->
      <div class="simple-typeahead-container">
        <p class="calc-text">Choose TOKENs</p>
        <SimpleTypeahead id="typeahead_id" ref="tokenInput" :items="availableTokens" :minInputLength="0"
          @selectItem="handleItemSelect" @onInput="handleContractInput" />
      </div>
      <p class="calc-text">Enter the number of recipients</p>
      <input class='calc-input' v-model="recipientsAmount" :max="10000" type="text" />
      <!-- placeholder="Enter recipients amount"  -->
    </section>

    <section :class="$style.calculator__action">
      <Button @click="handleEstimate">Calculate</Button>
    </section>
    <CalcFooter />

    <!-- <section class="d-none">
      Params:
      <div>Selected project: {{ project.title }} (name - {{ project.name }}, contract - {{ project.contractAddress }})
      </div>
      <div>Token Contract address - {{ tokenContract }}</div>
      <div>Recipients amount - {{ recipientsAmount }}</div>
      <div>Connected wallet - {{ walletAddress }}</div>
      <div>Wallet balance - {{ walletBalance.formatted }} {{ chainConfig.symbol }}</div>
      <div>Chain id - {{ chainId }}</div>
    </section>
    <section class="d-none">
      <div>Step - {{ step }}</div>
      <div>Status - {{ status }}</div>
    </section>
    <section class="d-none">
      <div>Approximate batches count:{{ approximation.batchCount }}</div>
      <div>Approximate addresses in batch: {{ approximation.txInBLock }}</div>
      <div>Approximate gasLimit: {{ Number(approximation.gasUsed._hex) }}</div>
      <div>gas price: {{ Number(approximation.gasPrice) }}</div>
      <div>Approximate cost: {{ Number(approximation.totalCost) }}</div>
    </section> -->
  </article>
</template>

<script setup lang="ts">
import { BigNumber } from 'ethers'

import { storeToRefs } from 'pinia'
import SimpleTypeahead from 'vue3-simple-typeahead'
import { GasPriceOracle } from 'gas-price-oracle'

import { useWalletStore } from '@/stores/wallet'
import { getServiceFee } from '@/services/tokenMultisend'

import { fromWei } from '@/utils/decimals'
import { RPC_LIST } from '@/constants/rpc'
import { numbers } from '@/constants/numbers'
import { contracts } from '@/constants/contracts'
import { ChainId, NATIVE_CURRENCY_ADDRESS } from '@/constants/chains'

import { emulateMassdrop } from '@/services/emulateMassdrop'
import { emulateMultisend } from '@/services/emulateMultisend'

const walletStore = useWalletStore()
const { tokens, walletAddress, chainConfig, chainId, walletBalance } = storeToRefs(walletStore)

const oracle = new GasPriceOracle({ chainId: chainId.value, defaultRpc: RPC_LIST[chainId.value] })

const projects = [
  {
    name: 'tokenMultisender',
    title: 'Multisender classic',
    contractAddress: contracts.MULTISENDER[chainId.value],
    estimateAction: handleEstimateClassic,
  },
  {
    name: 'massdropMultisender',
    title: 'Multisender NFT',
  },
  {
    name: 'massdropMultisender',
    title: 'Massdrop',
    contractAddress: contracts.MASSDROP[chainId.value],
    estimateAction: handleEstimateMassdrop,
  },
]

const tokenInput = ref(null)

const step = ref('')
const status = ref('')
const project = ref(projects[0])
const recipientsAmount = ref(1000)
const tokenContract = ref('')

const approximation = ref({
  batchCount: 0,
  gasForOne: numbers.BG_ZERO,
  gasUsed: numbers.BG_ZERO,
  totalTxs: 0,
  txInBLock: 0,
  gasPrice: '',
  totalCost: '',
})

const availableTokens = computed(() => {
  const _tokens = tokens.value.map((el) => el.label)

  if (project.value.contractAddress === contracts.MASSDROP[chainId.value]) {
    return _tokens.filter((el) => !el.includes('Native currency'))
  }

  return _tokens
})

const handleProjectChange = (index) => {
  project.value = projects[index]
  handleContractInput('')
  tokenInput.value.input = ''
}

const handleItemSelect = (selectedToken) => {
  const [, , selectedTokenAddress] = selectedToken.split('-')

  tokenContract.value = selectedTokenAddress.includes('Native currency') ? NATIVE_CURRENCY_ADDRESS : selectedTokenAddress.trim()
}

const handleContractInput = (a: string) => {
  tokenContract.value = a
}

const changeStatus = (payload) => {
  status.value = payload.status
  if (payload.step || payload.step === '') {
    step.value = payload.step
  }
}

async function handleEstimateClassic() {
  const params = {
    chainId: chainId.value,
    tokenAddress: tokenContract.value,
    ownerAddress: walletAddress.value,
    recipientsAmount: recipientsAmount.value,
  }
  const data = await emulateMultisend(params, changeStatus)
  changeStatus({ step: 'Calculating cost', status: 'Fetch gasPrice' })

  const txParams = await oracle.getTxGasParams({})

  // ToDo types
  // @ts-ignore
  const gasPrice = txParams.gasPrice || txParams.maxFeePerGas

  console.log({ txParams, params, gasPrice })

  changeStatus({ status: 'Fetch service fee' })
  const totalServiceFee = await getServiceFee(data.batchCount, chainId.value, walletAddress.value)
  console.log({ totalServiceFee })

  const gasCost = BigNumber.from(String(gasPrice)).mul(data.gasUsed)
  console.log({ gasCost })

  const totalCost = gasCost.add(totalServiceFee)
  console.log({ data, totalServiceFee, gasPrice })

  changeStatus({ step: 'Finished', status: '' })

  // ToDo types
  // @ts-ignore
  approximation.value = {
    ...data,
    totalCost: fromWei(totalCost),
    gasPrice: fromWei(gasPrice, 'gwei'),
  }
}

async function handleEstimateMassdrop() {
  const params = {
    chainId: chainId.value,
    tokenAddress: tokenContract.value,
    ownerAddress: walletAddress.value,
    recipientsAmount: recipientsAmount.value,
  }
  const data = await emulateMassdrop(params, changeStatus)
  changeStatus({ step: 'Calculating cost', status: 'Fetch gasPrice' })

  const txParams = await oracle.getTxGasParams({})

  // ToDo types
  // @ts-ignore
  const gasPrice = txParams.gasPrice || txParams.maxFeePerGas

  console.log({ txParams, params, gasPrice })

  changeStatus({ status: 'Fetch service fee' })

  const gasCost = BigNumber.from(String(gasPrice)).mul(data.gasUsed)
  console.log({ gasCost })

  const totalCost = gasCost.add(data.fee)
  console.log({ data, fee: data.fee, gasPrice })

  changeStatus({ step: 'Finished', status: '' })

  // ToDo types
  // @ts-ignore
  approximation.value = {
    ...data,
    totalCost: fromWei(totalCost),
    gasPrice: fromWei(gasPrice, 'gwei'),
  }
}

function handleEstimate() {
  project.value.estimateAction()
}
</script>

<style lang="scss" module>
.calculator {
  border-radius: 20px;
  border: 1px solid #00a3fd;
  display: flex;
  flex-direction: column;
  padding: 39px 2rem 34px;
  background: #0b124e;
  ;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    button {
      border: 1px solid #00a3fd;
      border-radius: 20px;
      padding: 21px;
      background: #0B124E;
      font-weight: 700;
      font-size: 15px;
      line-height: 19px;
      color: #FFFFFF;
      width: 217px;
      opacity: 1;
      transition: all .3s;

      :hover {
        opacity: 0.7;
        transition: all .3s;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    input {
      background: #0B1D5B;
      border-radius: 20px;
      border: 1px solid #445389;
      padding: 11px 20px;
      color: #fff;
      width: -webkit-fill-available;
      font-weight: 600;
      font-size: 15px;
      line-height: 28px;
      margin-bottom: 32px;
    }

    p {
      font-weight: 400;
      font-size: 15px;
      line-height: 28px;
      color: #FFFFFF;
      margin-bottom: 10px;
    }
  }

  &__action {
    display: flex;
    justify-content: center;
  }
}
</style>
