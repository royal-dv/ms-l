<template>
    <div class="container-network-all">
        <span class="network-big-text">
            Supported
        </span>
        <span class="network-text">
            <span class="white-text">Supported</span> <span class="blue-text">Networks</span>
        </span>
        <div class="network-button">
            <button class='filter-button' v-for="button in buttons" v-on:click="filterKey = button.value"
                :key="button.key" :class="{ active: filterKey == button.value }">
                {{ button.title }}
            </button>
        </div>
        <div class="network-container">
            <div class="network" v-for="network in filter" :key="network.id">
                <img :src="`/assets/src/networks/${network.src}`" />
                <p>{{ network.title }}</p>
            </div>
        </div>
        <div class="link-container">
            <p class="add-blockchain">
                *To ADD your Blockchain to Mutisender
            </p>
            <button @click="showModal = true">
                <span class="link-modal">Fill the form</span>
                <img src="@/assets/src/icons/link.svg" />
            </button>
            <div class="overlay" v-if="showModal" @click="showModal = false">
            </div>
        </div>
        <div class="modal" v-if="showModal">
            <button class="close-modal" @click="showModal = false">
                <img src="@/assets/src/icons/cirlce.svg" />
            </button>
            <div class="modal-container">
                <p class="white-text">
                    Request for adding a new blockchain
                </p>
                <input class='name' type="text" placeholder="Name" />
                <input type="text" placeholder="E-mail,  twitter..." />
                <input type="text" placeholder="Description..." />
            </div>
            <Button @click="[showModalSent = true, showModal = false]">Send</Button>
        </div>
        <div class="modal" v-if="showModalSent">
            <div class="modal-container">
                <p class="white-text">
                    You reguest was successfully sent
                </p>
                <p class="blue-text">We will check you data and contact you soon</p>
            </div>
            <Button @click="showModalSent = false">Close</Button>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    data() {
        return {
            showModal: false,
            showModalSent: false,
            filterKey: "all",
            buttons: [
                {
                    title: 'All',
                    value: 'all'
                },
                {
                    title: 'Token multisender',
                    value: 'token'
                },
                {
                    title: 'NFT multisender',
                    value: 'nft'
                },
                {
                    title: 'Massdrop multisender',
                    value: 'massdrop'
                }
            ],
            networks: [
                {
                    id: 1,
                    title: 'Ethereum',
                    src: "eth.svg",
                    value: 'token'
                },
                {
                    id: 2,
                    title: 'Gnosis chain',
                    src: "gnosis.svg",
                    value: 'token'
                },
                {
                    id: 3,
                    title: 'BNB smart chain',
                    src: "bnb.svg",
                    value: 'token'
                },
                {
                    id: 4,
                    title: 'Arbitrum one',
                    src: "arbitrum.svg",
                    value: 'token'
                },
                {
                    id: 5,
                    title: 'Avalanche chain',
                    src: "avalanche.svg",
                    value: 'token'
                },

                {
                    id: 6,
                    title: 'Fantom opera',
                    src: "fantom.svg",
                    value: 'massdrop'
                },
                {
                    id: 7,
                    title: 'Polygon chain',
                    src: "polygon.svg",
                    value: 'massdrop'
                },
                {
                    id: 8,
                    title: 'Moonriver',
                    src: "moonriver.svg",
                    value: 'massdrop'
                },
                {
                    id: 9,
                    title: 'Moonbeam',
                    src: "moonbeam.svg",
                    value: 'nft'
                },
                {
                    id: 10,
                    title: 'Metis',
                    src: "metis.svg",
                    value: 'nft'
                },

                {
                    id: 11,
                    title: 'Cronos',
                    src: "cronos.svg",
                    value: 'token'
                },
                {
                    id: 12,
                    title: 'Huobi ECO chain',
                    src: "huobi.svg",
                    value: 'token'
                },
                {
                    id: 13,
                    title: 'Celo',
                    src: "celo.svg",
                    value: 'token'
                },
                {
                    id: 14,
                    title: 'Harmony',
                    src: "harmony.svg",
                    value: 'token'
                },
                {
                    id: 15,
                    title: 'IoTeX',
                    src: "ioTeX.svg",
                    value: 'nft'
                },
            ]
        };
    },
    computed: {
        filter() {
            return this[this.filterKey];
        },
        all() {
            return this.networks;
        },
        token() {
            return this.networks.filter((network) =>
                network.value.includes("token")
            );
        },
        nft() {
            return this.networks.filter((network) =>
                network.value.includes("nft")
            );
        },
        massdrop() {
            return this.networks.filter((network) =>
                network.value.includes("massdrop")
            );
        },
    }
}
</script>

<style lang="scss">
.network {
    background: radial-gradient(circle, #060c34 0, #00082f 50%, #020a32 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0 0 20px 20px;
    padding: 10px 30px 24px;
    width: 194px;
    box-sizing: border-box;
    margin: 0 auto;
    border: 1px solid #253675;
    margin-bottom: 48px;
    border-top: 0;
    position: relative;
    transition: opacity .3s;
    z-index: 1;
    cursor: pointer;

    &:hover::before {
        opacity: 1;
    }

    &::before {
        background: linear-gradient(180deg, rgb(61 74 81 / 0%), rgb(1 116 175 / 60%));
        bottom: 0;
        content: "";
        left: 0;
        opacity: 0;
        position: absolute;
        right: 0;
        top: 0;
        transition: opacity .3s;
        z-index: -1;
        border-radius: 0 0 20px 20px;
    }

    p {
        font-weight: 400;
        font-size: 15px;
        line-height: 28px;
        text-align: center;
        color: #76A6EE;
    }
}

.network-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 1160px;
    margin: 0 auto;
    padding-top: 32px;
}

.network-big-text {
    text-transform: uppercase;
    color: #00A4FF;
    opacity: 0.03;
    text-align: center;
    position: absolute;
    font-size: 140px;
    font-weight: 800;
    line-height: 175px;
    top: -120px;
    z-index: -1;
    left: 0;
}

.container-network-all {
    text-align: center;
    position: relative;
    margin-top: -70px;
}

.network-text {
    .white-text {
        font-weight: 700;
        font-size: 28px;
        line-height: 35px;
    }

    .blue-text {
        font-weight: 700;
        font-size: 28px;
        line-height: 35px;
    }
}

.filter-button.active {
    background: #00A4FF;
    color: #fff;
    transition: all .3s;
}

.filter-button {
    background: transparent;
    border-radius: 6.96524px;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    color: #76A6EE;
    padding: 6px 9px;
    border: 0.580437px solid #263776;
    color: #76A6EE;
    transition: all .3s;
    margin-right: 4px;

    :last-child {
        margin-right: 0;
    }
}

.network-button {
    margin-top: 18px;
}

.link-container {
    button {
        background: transparent;
        opacity: 1;
        border: none;

        &:hover {
            opacity: 0.7;
        }

        .link-modal {
            color: #76A6EE;
            border-bottom: 1px solid #0B1D5B;
            margin-right: 5px;
        }
    }

    .add-blockchain {
        font-weight: 400;
        font-size: 15px;
        line-height: 28px;
        color: #2F5A9A;
        margin-bottom: 17px;
    }

}

.overlay {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
}

.modal {
    position: fixed;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 581px;
    z-index: 9999;
    margin: 0 auto;
    padding: 54px 50px 47px;
    background: linear-gradient(180deg, #0B124E 0%, #0B124E 100%);
    border-radius: 20px;
    box-sizing: border-box;
    border: 1px solid #01a4ff;

    img {
        position: absolute;
        right: -23px;
        top: -23px;
    }

    .close-modal {
        opacity: 1;
        transition: all .3s;
        border: none;
        outline: none;
        color: transparent;
        background: transparent;

        :hover {
            opacity: 0.98;
            transition: all .3s;
        }
    }

    .modal-container {
        display: flex;
        flex-direction: column;

        input {
            padding: 20px 27px;
            box-sizing: border-box;
            background: #0B1D5B;
            border-radius: 20px;
            font-weight: 400;
            font-size: 15px;
            line-height: 18px;
            color: #fff;
            border: 1px solid #263776;
            margin-bottom: 30px;

            ::placeholder {
                color: #263776;
            }

            :last-child {
                margin-bottom: 38px;
            }

        }

        .name {
            margin-top: 35px;
        }

        .white-text {
            font-weight: 700;
            font-size: 36px;
            line-height: 45px;
            text-align: center;
        }

        .blue-text {
            font-weight: 400;
            font-size: 15px;
            line-height: 28px;
            text-align: center;
            margin: 20px 0 40px;
        }
    }
}
</style>