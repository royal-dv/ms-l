<template>
    <NuxtLink to='/'>
        <img class='logo' src='@/assets/src/icons/logo.svg' alt='Logo' />
    </NuxtLink>
</template>

<style lang='scss'>
.logo {
    width: auto;
    height: 31px;
    opacity: 1;
    transition: opacity .3s;
    margin-right: auto;

    &:hover {
        opacity: 0.7;
        transition: opacity .3s;
    }
}
</style>

