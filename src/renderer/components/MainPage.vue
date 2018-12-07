<template>
    <div>
        <h1>RTMP Video</h1>
        <!-- <video id="my-video" class="video-js" controls autoplay preload="auto" width="640" height="320" tech="flash">
            <source src="rtmp://127.0.0.1/live/" type="rtmp/flv">
        </video> -->
        <!-- <embed src="/static/video-js.swf"> -->
        <video-player :options="playerOptions" :playsinline="true" @statechanged="playerStateChanged($event)"></video-player>
    </div>
</template>

<script>
import VideoPlayer from "./player.vue"
export default {
    components: {
        "video-player": VideoPlayer
    },
    data () {
        return {
            playerOptions: {
                sources: [{
                    type: "rtmp/flv",
                    src: "rtmp://live.hkstv.hk.lxdns.com/live/hks2"
                }],
                techOrder: ['flash'],
                autoplay: true,
                controls: true,
                flash: {
                    swf: "static/video-js.swf"
                },
                height: "320"
            }
        }
    },
    methods: {
        playerStateChanged (state) {
            console.log(state)
        }
    },
    mounted() {
        
    }
}
</script>
