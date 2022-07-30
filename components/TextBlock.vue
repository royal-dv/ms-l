<template>
    <div class="tb-container">
        <p class="big-text">
            Send tokens to multiple <span class="gradient-text">addresses</span>
        </p>
        <p class="blue-text">Use one of Multisander's APPs to send tokens or NFTs to multiple recipients in just one go.
        </p>
        <div class="text-border">
            <p>Fast</p>
            <p>Easy</p>
            <p>Safe</p>
        </div>
    </div>

</template>

<style lang="scss">
.tb-container {
    padding-right: 340px;

    .big-text {
        margin: 0 0 36px;
        font-weight: 800;
        font-size: 64px;
        line-height: 78px;
        text-transform: uppercase;
    }

    .blue-text {
        font-weight: 600;
        font-size: 15px;
        line-height: 28px;
        text-align: justify;
        margin-bottom: 60px;
    }

    .text-border {
        text-transform: uppercase;
        color: #0e1550;
        font-weight: 600;
        font-size: 48px;
        line-height: 28px;
        display: flex;
        margin-top: 33px;

        p {
            margin-right: 60px;
            -webkit-text-stroke: 1px #fff;
            transition: all .3s;
            cursor: pointer;

            &:hover {
                -webkit-text-stroke: 1px #76A6EE;
                transition: all .3s;
                cursor: pointer;
            }
        }
    }

}
</style>