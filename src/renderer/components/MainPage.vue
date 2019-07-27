<template>
    <div>
        <h1>RTMP Video</h1>
        <!-- <video id="my-video" class="video-js" controls autoplay preload="auto" width="640" height="320" tech="flash">
            <source src="rtmp://127.0.0.1/live/" type="rtmp/flv">
        </video> -->
        <!-- <embed src="/static/video-js.swf"> -->
        <div v-for="i in 3" :key="`video-${i}`" class="flex-row">
            <video-player :videoID="(i - 1)*3 + 1"></video-player>
            <video-player :videoID="(i - 1)*3 + 2"></video-player>
            <video-player :videoID="(i - 1)*3 + 3"></video-player>
        </div>
    </div>
</template>

<script>
import FlvPlayerVue from './FlvPlayer.vue';
export default {
    components: {
        "video-player": FlvPlayerVue
    },
    data () {
        return {
            
        }
    },
    mounted() {
        
    }
}
</script>

<style>
.flex-row {
    display: flex;
    flex-direction: row;
}

.flex-row > div {
    margin-right: 5px;
}
</style>
