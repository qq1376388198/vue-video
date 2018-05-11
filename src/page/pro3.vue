<template>
  <div style="width: 100%;height: 100vh;background: red">
    <div id="btn"></div>
    <video type="application/vnd.apple.mpegurl"
           controls
           id="media"
           webkit-playsinline="true"
           playsinline="true"
           x-webkit-airplay="allow"
           x5-video-player-type="h5"
           x5-video-player-fullscreen="true"
           x5-video-orientation="landscape"
           style="object-fit:fill"
           class="video-js vjs-default-skin fullVideo" preload="auto"
           src="http://dy2.jsyunbf.com/20180219/TUEHpd7j/index.m3u8?token=ssswef13333vlodi99">
    </video>
  </div>
</template>
<style>
  #btn{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: blue;
  }
</style>
<script>
  import wx from 'weixin-js-sdk'
  export default {
    mounted() {
      wx.config({
        // 配置信息, 即使不正确也能使用 wx.ready
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
      })
      wx.ready(function() {
        alert(document.getElementById('media'))
        document.getElementById('media').play() // video标签id=media
      })
      document.addEventListener('WeixinJSBridgeReady', function() {
        document.getElementById('media').play()
      }, false)
      document.getElementById('btn').onclick = function() {
        document.getElementById('media').play()
        alert('走你')
      }
    },
    methods: {
      showOut() {
        alert('哈哈哈')
      }
    }
  }
</script>
