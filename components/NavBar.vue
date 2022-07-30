<template>
    <nav class='nav-layout'>
        <Logo />
        <Menu />
    </nav>
</template>

<script lang="ts">
import Logo from "@/components/Logo.vue";
import Menu from "@/components/Menu.vue";
export default {
    name: "NavBar",
    components: {
        Logo,
        Menu
    }
}
</script>

<style lang='scss'>
.nav-layout {
    display: flex;
    align-items: center;
    flex-grow: 1;
    max-width: 1200px;
}
</style>