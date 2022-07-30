<template>
    <div class="nav-description">
        <TextBlock />
        <Count />
        <Multisender />
        <Support />
        <div class="calculator-container">
            <div class="calc">
                <span class="calc-big-text">
                    Calculator
                </span>
                <span class="blue-text">
                    Calculator
                </span>
                <Calculator />
            </div>
        </div>
        <Recent />
        <VideoBlock />
        <Partner />
    </div>
</template>

<script lang="ts">
import TextBlock from "@/components/TextBlock.vue";
import Count from "@/components/Count.vue";
import Multisender from "@/components/Multisender.vue";
import VideoBlock from "@/components/VideoBlock.vue";
export default {
    name: "Content",
    components: {
        TextBlock,
        Count,
        Multisender,
        VideoBlock
    },
}
</script>

<script setup lang='ts'>
import { useWalletStore } from '@/stores/wallet'

import { useWalletListeners } from '@/composables/application'

const walletStore = useWalletStore()
onMounted(() => {
    try {
        walletStore.onConnect()
        useWalletListeners()
    } catch (err) {
        console.error(err.message)
    }
})
</script>

<style lang="scss">
.calculator-container {
    max-width: 670px;
    margin: 0 auto;
    position: relative;

    .calc {
        display: flex;
        flex-direction: column;
        position: relative;

        .blue-text {
            font-weight: 700;
            font-size: 48px;
            line-height: 59px;
            align-self: center;
            margin-bottom: 67px;
            background: linear-gradient(90deg, #FFFFFF 0%, #1C77FF 94.06%);
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
        }

        .calc-big-text {
            color: #00a4ff;
            font-size: 140px;
            font-weight: 800;
            line-height: 175px;
            opacity: .03;
            position: relative;
            text-align: center;
            text-transform: uppercase;
            top: 80px;
            z-index: -1;
            right: 23%;
        }


    }


}
</style>