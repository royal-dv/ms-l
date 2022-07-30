<script>
export default {
    data() {
        return {
            active_tab: 0,
            tabs: [
                {
                    img: 'video1',
                    link: 'video1-link'
                },
                {
                    img: 'video2',
                    link: 'video2-link'
                },
                {
                    img: 'video3',
                    link: 'video3-link'
                },
            ]
        }
    },
    methods: {
        changeTab(tabIndexValue) {
            this.active_tab = tabIndexValue;
        }
    }
}

</script>

<template>
    <div class="tabs">
        <ul class="tabs__header">
            <li v-for="(tab, index) in tabs" :key='index' class="tabs__item" @click="changeTab(index)"
                :class="active_tab === index ? 'selected' : ''">
                <span :class="[tab.link, active_tab === index ? 'selected' : '']"></span>
                <span :class="[tab.img, active_tab === index ? 'selected' : '']"></span>
            </li>
        </ul>

        <div class="tabs__content" v-if="active_tab === 0">
            <div class="inner-tab">
                <img src="@/assets/src/pic/checked-video.png" />
                <div class="inner-tab-text">
                    <div>
                        <p class="white-text">Multisender Classic
                        </p>
                        <p class='blue-text'>
                            How to use Multisender Classis. Easy and short video-tutorial.
                        </p>
                    </div>
                    <div class="inner-link-video">
                        <img src='@/assets/src/pic/video.svg' />
                        <a href='#' class="watch-video"><span>wat</span>ch the video</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="tabs__content" v-if="active_tab === 1">
            <div class="inner-tab">
                <img src="@/assets/src/pic/checked-video.png" />
                <div class="inner-tab-text">
                    <div>
                        <p class="white-text">Multisender Classic
                        </p>
                        <p class='blue-text'>
                            How to use Multisender Classis. Easy and short video-tutorial.
                        </p>
                    </div>
                    <div class="inner-link-video">
                        <img src='@/assets/src/pic/video.svg' />
                        <a href='#' class="watch-video"><span>wat</span>ch the video</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="tabs__content" v-if="active_tab === 2">
            <div class="inner-tab">
                <img src="@/assets/src/pic/checked-video.png" />
                <div class="inner-tab-text">
                    <div>
                        <p class="white-text">Multisender Classic
                        </p>
                        <p class='blue-text'>
                            How to use Multisender Classis. Easy and short video-tutorial.
                        </p>
                    </div>
                    <div class="inner-link-video">
                        <img src='@/assets/src/pic/video.svg' />
                        <a href='#' class="watch-video"><span>wat</span>ch the video</a>
                    </div>
                </div>
            </div>
        </div>
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
    padding-left: 26px;
    display: flex;
    align-items: center;
    position: relative;
}

.tabs__item.selected {
    background: #0B124E;
    border-radius: 30px 0 0 30px;
    width: 227.72px;
    height: 115.54px;
}

.tabs__content {
    background: #0B124E;
    min-height: 300px;
    display: grid;
    place-items: center;
    padding: 18px;
    padding-left: 34px;
    border-radius: 0 30px 30px 0;
    max-width: 737px;
}

.tab-img {
    width: 208px;
    height: 106px;
}

.tab-img.selected {
    width: 227px;
    height: 122px;
}

.inner-tab {
    display: flex;
    max-width: inherit;
    border-radius: 30px;

    &-text {
        padding: 25px 25px 37px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        background: linear-gradient(180deg, rgba(12, 19, 78, 0.85) 0%, rgba(11, 18, 78, 0.51) 55.79%, rgba(11, 18, 78, 0) 106.72%);
        position: relative;
        right: 364px; /*366*/
        width: 316px;

        .white-text {
            font-weight: 600;
            font-size: 32px;
            line-height: 39px;
            padding-right: 90px;
        }

        .blue-text {
            padding-top: 16px;
            font-weight: 400;
            line-height: 28px;
        }
    }
}

.inner-link-video {
    display: flex;
    align-items: center;
    position: relative;
}

.watch-video {
    text-transform: uppercase;
    color: #fff;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    position: absolute;
    left: 17px;

    span {
        color: #263776;
    }
}

.video1::after {
    content: url('@/assets/src/pic/tab-video1.png');
    width: 208px;
    height: 106px;
    display: inline-block;
    transition: all .3s;
}

.video1-link.selected::after,
.video2-link.selected::after,
.video3-link.selected::after {
    content: url('@/assets/src/icons/link-active.svg');
    width: 39px;
    height: 39px;
    display: inline-block;
    transition: all .3s;
}

.video1-link::after,
.video2-link::after,
.video3-link::after {
    content: url('@/assets/src/icons/link-not-active.svg');
    width: 39px;
    height: 39px;
    display: inline-block;
    transition: all .3s;
}

.video1-link.selected,
.video2-link.selected,
.video3-link.selected {
    position: absolute;
    left: -34px;
    top: 53px;
    z-index: 9999;
}

.video1-link,
.video2-link,
.video3-link {
    position: absolute;
    left: 17px;
    top: 61px;
    z-index: 9999;
}

.video1:hover::after {
    transform: scale(1.09);
    transition: all .3s;
}

.video2::after {
    content: url('@/assets/src/pic/tab-video2.png');
    width: 208px;
    height: 106px;
    display: inline-block;
    transition: all .3s;
}

.video2:hover::after {
    transform: scale(1.09);
    transition: all .3s;
}

.video3::after {
    content: url('@/assets/src/pic/tab-video3.png');
    width: 208px;
    height: 106px;
    display: inline-block;
    transition: all .3s;
}

.video3:hover::after {
    transform: scale(1.09);
    transition: all .3s;
}

.selected~.tabs__content {
    border-radius: 0 30px 30px 30px;
}
</style>