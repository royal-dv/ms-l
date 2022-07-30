<template>
    <ul class='nav-list'>
        <li class='nav-list-item' v-for='item in menuItems'>
            <NuxtLink class='nuxt-link' :to='item.url' v-if='!item.children'>
                {{ item.name }}
            </NuxtLink>
            <div class='nav-inner-container' v-else v-on:mouseover='mouseover' v-on:mouseleave='mouseleave'>
                {{ item.name }}
                <i class="dropdown-icon"></i>
                <ul class="nav-dropdown" :class="{ isOpen }">
                    <li v-for="child in item.children">
                        <NuxtLink class='nuxt-link' :to="child.url">
                            {{ child.name }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </li>
        <li class='nav-line'>
        </li>
        <li class='nav-list-item'>
            <div class="lang-container">
                <Button empty @click="isShowModal = !isShowModal">
                    En
                </Button>
            </div>

        </li>
    </ul>
</template>

<script lang="ts">
export default {
    name: "Menu",
    data() {
        return {
            menuItems: [
                {
                    url: "#",
                    name: "Products",
                    children: [
                        {
                            url: "#",
                            name: "Multisender Classic"
                        },
                        {
                            url: "#",
                            name: "Multisender NFT"
                        },
                        {
                            url: "#",
                            name: "Multisender Massdrop"
                        },
                    ]
                },
                {
                    url: "#",
                    name: "Instruction"
                },
                {
                    url: "#",
                    name: "Statistics",
                },
                {
                    url: "#",
                    name: "Calculator"
                }
            ],
            isOpen: false,
            isShowModal: false,
            /*test*/
            locales: [
                {
                    lang: "ru",
                    name: "RU",
                },
            ]
        };
    },
    created() {
        window.addEventListener('click', (e) => {
            if (!this.$el.contains(e.target)) {
                this.isShowModal = false
            }
        })
    },
    methods: {
        mouseover() {
            this.isOpen = true;
        },
        mouseleave() {
            this.isOpen = false;
        },
    },
}

</script>

<style lang='scss'>
.nav-list {
    list-style: none;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0 0 0 auto;

    &-item {
        padding: 0 20px;
        display: flex;
        align-items: center;

        &:first-child {
            padding: 0 20px 0 0;
        }

        &:last-child {
            padding-right: 0;
        }
    }
}

.nav-inner-container {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 40px;
}

.nav-dropdown {
    background-color: #273877;
    border-radius: 10px;
    box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 2%);
    padding: 15px;
    position: absolute;
    top: 40px;
    left: -10px;
    width: 153px;
    opacity: 0;
    visibility: hidden;
    transition: all .3s;
}

.nav-dropdown li {
    margin: 0 0 14px;
    list-style-type: none;

    &:last-child {
        margin: 0;
    }
}

.isOpen {
    opacity: 1;
    visibility: visible;
    transition: all .3s;
}

.nuxt-link,
.nav-list li div {
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    color: #76a6ee;
    text-decoration: none;
    transition: color .3s;

    &:hover {
        color: #fff;
        transition: all .3s;

        .dropdown-icon {
            background: #fff;
            transition: all .3s;
        }
    }
}

.nav-line {
    border-left: 1.5px solid #2F5A9A;
    height: 9.2px;
    display: inline-flex;
    padding: 0 20px 0 0 !important;
    margin-left: 20px !important;
}

.dropdown-icon {
    mask: url('@/assets/src/icons/dropdown.svg');
    background: #2F5A9A;
    width: 10px;
    height: 6px;
    margin-left: 6px;
    transition: all .3s;
}

</style>