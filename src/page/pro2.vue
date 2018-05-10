<template>
  <div @contextmenu.prevent>
    <video id="my-video" webkit-playsinline="true"
           playsinline="true"
           x-webkit-airplay="allow"
           x5-video-player-type="h5"
           x5-video-player-fullscreen="true"
           x5-video-orientation="portraint"
           style="object-fit:fill"
           class="video-js vjs-default-skin" controls preload="auto">
      <source src="http://dy2.jsyunbf.com/20180219/TUEHpd7j/index.m3u8" type="application/x-mpegURL">
    </video>
  </div>
</template>
<script>
  import videojs from 'video.js'
  export default {
    created() {},
    mounted() {
      videojs('my-video', {
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true
      }, function() {
        this.play()
      })
    },
    methods: {
      showMenu() {
        console.log('右击')
        return false
      }
    }
  }
</script>
