<template>
    <div class="referal">
        <div class="bg-text">
            <span>
                partner
            </span>
            <span>
                program
            </span>
        </div>
        <div class="partner-container">
            <p class="partner"><span class="white-text">Become a <span class='gradient-text'>partner</span></span> </p>
            <p class='blue-text'>Tell about multisender and get reward</p>
            <Button>
                Get referral link
            </Button>
        </div>

    </div>
</template>

<script lang="ts">
import Button from "@/components/Button.vue";
export default {
    name: "Partner",
    components: {
        Button,
    },
}
</script>
<style lang="scss">
.referal {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 0 70px;
    position: relative;

    .white-text {
        font-weight: 700;
        font-size: 48px;
        line-height: 59px;
    }

    .blue-text {
        padding: 32px 0;
        text-align: center;

    }

    .partner {
        font-weight: 700;
        font-size: 48px;
        line-height: 59px;
    }

    .partner-container {
        padding-top: 125px;
        text-align: center;
    }

    .bg-text {
        z-index: -1;
        text-transform: uppercase;
        color: #00A4FF;
        opacity: 0.03;
        text-align: center;
        position: absolute;


        span:first-child {

            font-weight: 800;
            font-size: 190px;
            line-height: 238px;
        }

        span:last-child {
            font-weight: 600;
            font-size: 120px;
            line-height: 147px;
        }
    }
}
</style>