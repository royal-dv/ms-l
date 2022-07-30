<template>
    <div class="count-container">
        <div v-for='count in totalCounts' class="total-counts">
            <img src="@/assets/src/icons/arrow-down.svg" />
            <span class="count">{{ count.count }}</span>
            <span class="count-text">{{ count.text }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Count",
    data() {
        return {
            totalCounts: [
                {
                    count: "$21M+",
                    text: "Total volume",
                },
                {
                    count: "900K+",
                    text: "Daily volume"
                },
                {
                    count: "21K+",
                    text: "Total transactions",
                },
                {
                    count: "110+",
                    text: "Weekly transactions"
                }
            ],
        };
    },
}
</script>
<style lang="scss">
.total-counts {
    background: linear-gradient(90deg,#070e38 1.46%,rgba(23,34,100,0) 100.97%);
    border-radius: 0px 5px 5px 0px;
    transition: all .3s;
    cursor: pointer;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    border-left: 3px solid #76A6EE;
    padding: 0 46px 5px;
    justify-content: inherit;
    align-items: center;

    img {
        width: 22px;
        height: 13px;
    }

    &:hover::before {
        opacity: 1;
    }

    &::before {
        position: absolute;
        content: "";
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(270deg, rgba(0, 164, 255, 0), rgb(7 79 119 / 60%));
        z-index: -1;
        transition: opacity .3s;
        opacity: 0;
    }
}

.count-container {
    display: flex;
    justify-content: space-between;
    padding: 260px 0 150px;
}

.count {
    font-weight: 700;
    font-size: 48px;
    line-height: 59px;
    color: #FFFFFF;
    margin: 16px 0;
}

.count-text {
    font-weight: 400;
    font-size: 15px;
    line-height: 28px;
    color: #76A6EE;
}
</style>