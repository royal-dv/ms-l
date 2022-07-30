<template>
    <button :type='type || "button"' :class='empty ? "b-btn--empty b-btn" : "b-btn"' :disabled='disabled'>
        <slot />
    </button>
</template>

<script setup lang='ts'>

defineProps<{
    type?: 'button' | 'submit' | undefined;
    disabled?: boolean;
    empty?: boolean;
}>();
</script>

<style lang='scss'>
.b-btn {
    border-radius: 12px;
    padding: 11px 24px;
    box-sizing: border-box;
    border: 0;
    /*add to variables*/
    background-color: #00A4FF;
    color: #fff;
    /**/
    font-size: 16px;
    font-weight: 600;
    line-height: 23px;

    &--empty {
        background-color: transparent;
        padding: 0;
        border-radius: 0;
        font-size: 13px;
        color: #76a6ee;

        &:hover {
            background-color: transparent !important;
            color: #fff;
        }
    }

    &:hover {
        /*add to variables*/
        background-color: #0075FF;
        /**/
    }

    &:disabled {
        /*add to variables*/
        background-color: #172264;
        color: #76A6EE;
        /**/
    }
}
</style>