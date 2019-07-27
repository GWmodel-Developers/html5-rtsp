<template>
    <div>
        <video ref="player" width="480"></video>
    </div>
</template>

<script>
import flvjs from "flv.js";
export default {
    props: {
        videoID: Number
    },
    data () {
        return {
            player: null
        }
    },
    mounted () {
        if (flvjs.isSupported()) {
            let video = this.$refs.player;
            if (video) {
                this.player = flvjs.createPlayer({
                    type: "flv",
                    isLive: true,
                    url: `ws://127.0.0.1:8888/rtsp/${this.videoID}/?url=rtsp://127.0.0.1:8554/changan.E01.sdp`
                });
                this.player.attachMediaElement(video);
                this.player.load();
                this.player.play();
            }
        }
    },
    beforeDestroy () {
        this.player.destory();
    }
}
</script>
