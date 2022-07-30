<template>
    <div class="video-block">
        <span class="ms-text">
            MULTISENDER
        </span>
        <span class="white-text">
            How to
            <span class='gradient-text'>use</span>
        </span>
        <span class="white-text">
            Multisender
            <span class='gradient-text'>APPs</span>
        </span>
        <span class="blue-text">
            More specifically in the video
        </span>
        <TabsWrapperVideo>
        </TabsWrapperVideo>
    </div>

</template>

<script lang="ts">
import TabsWrapperVideo from "@/components/TabsWrapperVideo.vue";
import Tab from "@/components/Tab.vue";
export default {
    name: "VideoBlock",
    components: {
        TabsWrapperVideo,
    }
}
</script>
<style lang="scss">
.video-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0 50px;

    .white-text {
        font-weight: 700;
        font-size: 48px;
        line-height: 59px;
    }

    .blue-text {
        font-weight: 600;
        font-size: 15px;
        line-height: 28px;
        margin-bottom: 0;
        padding-top: 20px;
    }

    .ms-text {
        text-transform: uppercase;
        color: #00A4FF;
        opacity: 0.03;
        text-align: center;
        z-index: -1;
        font-weight: 800;
        font-size: 128px;
        line-height: 160px;
        position: relative;
        top: 60px;
    }
}
</style>