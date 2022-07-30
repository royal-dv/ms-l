<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
</script>

<template>
    <div class="container-carousel">
        <p class="recept-text">Recept</p>
        <p class="white-text">
            Recent <span class="gradient-text">transactions</span>
        </p>
        <Carousel :autoplay='3000' :wrap-around="true" :items-to-show="2.7">
            <Slide v-for="slide in 10" :key="slide.id">
                <div class="carousel__item">
                    <div class="item-transaction">
                        <div class="info-block">
                            <div class="blue-text">
                                N of recipients
                            </div>
                            <div class='align'>
                                <span class="count-trans">0124456</span><span><img
                                        src='@/assets/src/icons/recipients.svg' /></span>
                            </div>
                        </div>
                        <div class="info-block">
                            <div class="blue-text">
                                Blockchain
                            </div>
                            <div class="bsc">
                                BSC
                            </div>
                        </div>
                        <div class="info-block">
                            <div class="blue-text">
                                Token
                            </div>
                            <div class="align">
                                <div class="count-trans">Binance</div>
                                <img src='@/assets/src/icons/binance.svg' />
                            </div>
                        </div>
                        <div class="info-block">
                            <div class="blue-text">
                                Amount
                            </div>
                            <div class="align">
                                <div class="count-trans">+0,0124456</div>
                                <div class="blue-text">BNC</div>
                            </div>
                        </div>
                    </div>
                    <div class="btn-transaction">
                        <button class="transaction">
                            <span>
                                See transaction in explorer
                            </span>
                            <img src="@/assets/src/icons/link.svg" />
                        </button>
                    </div>

                </div>

            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>

</template>

<style lang="scss">
.carousel__item {
    min-height: 319px;
    width: 409px;
    background: radial-gradient(circle, rgb(16 30 120) 0%, rgb(5 20 100) 50%, rgb(0 10 66) 100%);
    font-size: 20px;
    border-radius: 8px;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    padding: 0;
    border-radius: 25px;
    cursor: pointer;

    .blue-text {
        font-weight: 400;
        font-size: 18px;
        line-height: 33px;
    }

}

.carousel__slide {
    cursor: pointer;
}

.transaction {
    border: none;
    outline: none;
    padding: 1.5px;
    color: #76a6ee;
    font-weight: 400;
    font-size: 18px;
    line-height: 33px;
    border-radius: 12px;
    width: 100%;
    background: #0B1D5B;
}

.carousel__slide--active>.carousel__item .transaction:hover {
    opacity: 0.6;
}


.item-transaction {
    border-bottom: 1px solid #0B124E;
    padding: 28px 39px 0;
}

.btn-transaction {
    padding: 0 39px 28px;
}

.container-carousel {
    .white-text {
        padding-bottom: 70px;
        font-weight: 700;
        font-size: 48px;
        line-height: 59px;

    }
}

.info-block {
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    align-items: center;

    .count-trans {
        padding-right: 8px;
        color: #fff;
    }

    .bsc {
        color: #fff;
    }
}

.recept-text {
    text-transform: uppercase;
    color: #00A4FF;
    opacity: 0.03;
    text-align: center;
    z-index: -1;
    font-weight: 800;
    font-size: 140px;
    line-height: 175px;
    position: relative;
    top: 80px;
}

.align {
    display: flex;
    align-items: center;
}

.carousel__slide {
    padding: 10px;
}

.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}

.carousel__next {
    right: 47%;
    top: 110%;
    opacity: 0.2;
    border: 1px solid #FFFFFF;

    &:hover {
        fill: #fff;
        opacity: 0.7;
    }
}

.carousel__prev {
    left: 47%;
    top: 110%;
    opacity: 0.2;
    border: 1px solid #FFFFFF;
    &:hover {
        opacity: 0.7;
    }
}

.carousel__slide>.carousel__item {
    transform: scale(0.8);
    opacity: 0.5;
    transition: 0.5s;
}

.carousel__slide--visible>.carousel__item {
    opacity: 1;
    transform: rotateY(0);
}

.carousel__slide--next>.carousel__item {
    transform: scale(0.7) translate(-10px);

}

.carousel__slide--prev>.carousel__item {
    transform: scale(0.7) translate(10px);
}

.carousel__slide--active>.carousel__item {
    transform: scale(1);
    background: linear-gradient(360deg, #0c1247, #07356b 50%, #083e83);
    transition: all .3s;
}
</style>
