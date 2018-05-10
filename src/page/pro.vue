<template>
  <div class="liveView">
    <video-player class="vjs-custom-skin" id="epvideo" ref="videoPlayer"
                  :options="playerOptions"
                  @play="onPlayerPlay($event)"
                  @pause="onPlayerPause($event)"
                  @ended="onPlayerEnded($event)"
                  @loadeddata="onPlayerLoadeddata($event)"
                  @waiting="onPlayerWaiting($event)"
                  @playing="onPlayerPlaying($event)"
                  @timeupdate="onPlayerTimeupdate($event)"
                  @canplay="onPlayerCanplay($event)"
                  @canplaythrough="onPlayerCanplaythrough($event)"
                  @ready="playerReadied"
                  @statechanged="playerStateChanged($event)"
                  @click.native="toggleStatus()">
    </video-player>

  </div>
</template>
<script>
  export default {
    name: 'live',
    data() {
      return {
        initialized: false,
        currentTech: '',
        play: '',
        pause: '',
        streams: {
          rtmp: '',
          hls: ''
        },
        playerOptions: {
          preload: true,
          overNative: true,
          autoplay: false,
          controls: false,
          // techOrder: ['flash', 'html5'],
          sourceOrder: true,
          flash: {
            hls: { withCredentials: false },
            swf: '/vue-videojs-demo/static/media/video-js.swf'
          },
          aspectRatio: '16:9',
          html5: { hls: { withCredentials: false } },
          sources: [
            {
              withCredentials: false,
              type: 'application/x-mpegURL',
              src:
                'http://dy2.jsyunbf.com/20180219/TUEHpd7j/index.m3u8'
            }
          ],
          poster: 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=7b28610d292dd42a4b0409f9625230d0/314e251f95cad1c80b84c843733e6709c93d5192.jpg'
          /*,
          controlBar: {
            timeDivider: false
          }, // 时间分割线
          durationDisplay: false, // 总时间
          progressControl: false, // 进度条
          customControlSpacer: false, // 未知
          fullscreenToggle: false // 全屏
          */
        }
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      },
      currentStream() {
        return this.currentTech === 'Flash' ? 'RTMP' : 'HLS'
      }
    },
    created() {
    },
    methods: {
      onPlayerReadied() {
        if (!this.initialized) {
          this.initialized = true
          this.currentTech = this.player.techName_
        }
      },
      // record current time
      onTimeupdate(e) {
        // console.log('currentTime', e.cache_.currentTime)
      },
      enterStream() {
        this.playerOptions.sources[1].src = this.streams.hls
        this.playerOptions.sources[0].src = this.streams.rtmp
        this.playerOptions.autoplay = true
      },
      changeTech() {
        if (this.currentTech === 'Html5') {
          this.playerOptions.techOrder = ['html5']
        } else if (this.currentTech === 'Flash') {
          this.playerOptions.techOrder = ['flash']
        }
        this.playerOptions.autoplay = true
      },
      onPlayerPlay(player) {
        console.log(player)
      },
      onPlayerPause(player) {
        console.log(player)
      },
      // 状态
      playerStateChanged(playerCurrentState) {
        console.log(playerCurrentState)
        if (playerCurrentState.play === true) {
          this.play = true
          this.pause = !this.play
        }
        if (playerCurrentState.pause === true) {
          this.play = false
          this.pause = !this.play
        }
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // player is ready
      playerReadied(player) {
        // seek to 10s
        console.log('example player 1 readied', player)
        player.currentTime(10) // 视频可以前进10s 有点像跳过广告的功能
        // console.log('example 01: the player is readied', player)
      },
      toggleStatus() {
        console.log('切换')
        console.log(this.player)
        if (this.play) {
          this.player.pause()
        } else {
          this.player.play()
        }
      }
    }
  }
</script>
<style>
  .liveView {
    position: relative;
  }

  .selectWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    line-height: 30px;
    margin: 20px;
    vertical-align: baseline;
  }

  .inputWrapper {
    width: 500px;
    margin: 0 auto;
  }
  .buttonWrapper {
    text-align: center;
  }
</style>
