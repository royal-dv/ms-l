<template>
    <section class="calc-footer">
        <p><span class="white-text-calc">Sender fee</span> <span class="white-text-big"> 0.33 ETH </span><span
                class="white-text-big">~ 663$</span>
        </p>
        <p class="blue-text-calc">with VIP 0.24 ETH</p>
        <p class="dark-blue-text-calc">Рассчитана на данный момент <a class="link-calc" href='#'>Подробнееs</a></p>
        <!-- <div class="tooltip">
            <img src="@/assets/src/icons/tooltip.svg" />
        </div> -->
    </section>
</template>

<style lang="scss">
.calc-footer {
    text-align: center;
    margin-top: 20px;
    position: relative;

    .white-text-calc {
        color: #fff;
        font-weight: 400;
        font-size: 15px !important;
        padding-bottom: 20px !important;
        line-height: 28px !important;
        margin-right: 5px;

    }

    .white-text-big {
        color: #fff;
        font-weight: 600;
        font-size: 32px;
        line-height: 39px;
    }

    .blue-text-calc {
        font-weight: 600;
        font-size: 15px;
        line-height: 18px;
        text-align: center;
        color: #76A6EE;
        margin: 20px 0;
    }

    .dark-blue-text-calc {
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        color: #263776;
    }

    // .tooltip {
    //     position: absolute;
    //     right: 15px;
    //     bottom: 10px;
    // }
}
</style>