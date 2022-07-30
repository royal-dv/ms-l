<script setup>
import { useSlots, ref, provide } from 'vue'

const slots = useSlots()
const tabTitles = ref(slots.default().map(tab => tab.props.title))
const selectedTitle = ref(tabTitles.value[0])
provide('selectedTitle', selectedTitle)

</script>

<template>
    <div class="tabs">
        <ul class="tabs__header">
            <li v-for="title in tabTitles" :key="title" class="tabs__item"
                :class="{ selected: selectedTitle === title, }" @click="selectedTitle = title">
                {{ title }}
            </li>
        </ul>
        <slot />
    </div>
</template>

<style lang="scss">
.tabs {
    display: flex;
    flex-direction: row;
    border-radius: 30px;
    padding-top: 52px;
}

.tabs__header {
    list-style: none;
    padding-right: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    padding: 0;
}

.tabs__item {
    flex: 1;
    background: none;
    cursor: pointer;
    user-select: none;
    color: transparent;
    padding: 18px;
    padding-right: 0;
    padding-bottom: 17px;
}

.tabs__item.selected {
    background: #0B124E;
    border-radius: 30px 0 0 30px;
}

.tabs__content {
    background: #0B124E;
    min-height: 300px;
    display: grid;
    place-items: center;
    padding: 18px;
    border-radius: 0 30px 30px 0;
}

.tab-img {
    width: 208px;
    height: 106px;
}

.tab-img.selected {
    width: 227px;
    height: 122px;
}
</style>