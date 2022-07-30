<template>
    <div v-for='item in ms' :class='item.reverse ? "ms-reverse" : "ms"'>
        <img :class='[item.reverse ? "ms-pic-reverse" : "ms-pic", item.massdrop ? "ms-pic-drop" : ""]'
            :src='item.reverse && item.nft ? "/_nuxt/assets/src/pic/ms-nft.svg" : item.massdrop ? "/_nuxt/assets/src/pic/msdrop.svg" : "/_nuxt/assets/src/pic/ms.svg"' />
        <div>
            <p v-if="item.new === 'true'" class="ms-new"> New</p>
            <p class="white-text ms-title">Multisender <span class="gradient-text">{{ item.title }}</span></p>
            <p v-if="item.label === 'true'" class="ms-label"> APP for cheapest airdrops</p>
            <p class="blue-text ms-description">{{ item.description }} </p>
            <ul class="ms-list-container">
                <li class='ms-items white-text' v-for="child in item.children">
                    <img src='@/assets/src/icons/list-line.svg' />
                    {{ child.item }}
                </li>
            </ul>
            <Button v-if="item.btn === 'true'">Launch dApp</Button>
        </div>
    </div>
</template>

<script lang="ts">
import Button from "@/components/Button.vue";
export default {
    name: "Multisender",

    components: {
        Button,
    },
    data() {
        return {
            ms: [
                {
                    title: 'Classic',
                    description: 'Multisender classic APP helps to send tokens to multiple recipients easily in one go. Sender chooses a token, inputs a list of recipients, signs approval for actions with tokens, pays for all transaction fees and then Multisender Classic immediately sends tokens to each recipient.',
                    children: [
                        {
                            item: 'Sender pays for all transactions',
                        },
                        {
                            item: 'Recipients immediately receive tokens'
                        }
                    ],
                    pic: '/_nuxt/assets/src/pic/ms.svg',
                    btn: 'false'
                },
                {
                    title: 'NFT',
                    description: 'Multisender NFT APP is almost like Multisender classis but instead of usual tokens it works with NFTs.',
                    children: [
                        {
                            item: 'Sender pays for all transactions',
                        },
                        {
                            item: 'Recipients immediately receive NFTs'
                        }
                    ],
                    reverse: 'true',
                    pic: '/_nuxt/assets/src/pic/ms-nft.svg',
                    btn: 'true',
                    nft: 'true'
                },
                {
                    title: 'Massdrop',
                    description: 'Massdrop APP helps to send TOKENs to multiple addresses with very low costs for sender, because all transaction fees must be paid by recipients. Sender chooses a token, inputs a list of recipients, signs approval for actions with TOKENs and pays only for Massdrop initiation. Recipients have to pay for transaction fees to receive their tokens.',
                    children: [
                        {
                            item: 'Sender pays only for creating Airdrop',
                        },
                    ],
                    pic: '/_nuxt/assets/src/pic/msdrop.svg',
                    btn: 'false',
                    new: 'true',
                    label: 'true',
                    massdrop: 'true'
                },
            ]
        };
    },
}
</script>

<style lang="scss">
.ms {
    display: flex;
    margin-bottom: 100px;
    flex-direction: row;

    &-reverse {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 100px;
    }

    &-title {
        font-weight: 700;
        font-size: 48px;
        line-height: 59px;
        margin-bottom: 20px;
        opacity: 1;
        transition: opacity .3s;
        cursor: pointer;
        width: 300px;

        &:hover {
            opacity: 0.7;
            transition: opacity .3s;

        }
    }

    &-new {
        background: #00A4FF;
        border-radius: 8px;
        font-weight: 600;
        font-size: 15px;
        line-height: 28px;
        padding: 3.5px 12px;
        color: #fff;
        width: min-content;
        margin-bottom: 20px;
    }

    &-label {
        border-left: 3px solid #76A6EE;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #fff;
        background: linear-gradient(90deg, #320072 0%, #040A28 94.06%);
        padding: 15px 40px;
        margin: 20px 0;
    }

    &-description {
        font-weight: 400;
        font-size: 15px;
        line-height: 28px;
    }

    &-items {
        list-style-type: none;
        margin-bottom: 10px;
        display: flex;
        font-weight: 600;
        font-size: 15px;
        line-height: 28px;

        img {
            margin-right: 12px;
        }
    }

    &-list-container {
        margin: 20px 0 25px;
        padding-left: 0;

        .white-text {
            font-size: 15px;
        }
    }

    &-pic {
        margin-right: 120px;
        opacity: 1;
        transition: opacity .3s;
        cursor: pointer;

        &:nth-child(2) {
            margin-left: 150px;
            margin-right: 0;
        }

        &:hover {
            opacity: 0.7;
            transition: opacity .3s;
        }

        &-reverse {
            margin-right: 0;
            margin-left: 220px;
            opacity: 1;
            transition: opacity .3s;
            cursor: pointer;

            &:hover {
                opacity: 0.7;
                transition: opacity .3s;
            }
        }
    }

    .ms-pic-drop {
        margin-right: 233px;
    }
}
</style>