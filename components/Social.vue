<template>
    <div class="social">
        <a href="#">
            <img src='@/assets/src/social/twitter.svg' />
        </a>
        <a href="#">
            <img src='@/assets/src/social/github.svg' />
        </a>
        <a href="#">
            <img src='@/assets/src/social/telegram.svg' />
        </a>
    </div>
</template>

<style lang="scss">
.social {
    display: flex;
    align-items: center;

    a {
        padding-right: 21px;
        opacity: 1;
        transition: all .3s;

        &:hover {
            opacity: 0.7;
            transition: all .3s;
        }

        &:last-child {
            padding-right: 0;
        }
    }
}
</style>