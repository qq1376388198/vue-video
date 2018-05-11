<template>
  <div style="width: 100vw;height: 100vh;position: absolute;top: 0px">
    <div id="videoBox">
      <input id="playBtn" type="button" value="">
      <img id="poster" src="http://img2.imgtn.bdimg.com/it/u=916341635,3114421173&fm=200&gp=0.jpg" alt="">
      <!--<video id="videoBox" controls preload="auto" poster="images/tempPoster.jpg" x5-video-player-type="h5" x5-video-player-fullscreen="true">-->
      <video id="videoLive"
             aspectRatio="16:9"
             preload="auto"
             x5-video-player-type="h5"
             x5-video-player-fullscreen="true"
             webkit-playsinline="true" x-webkit-airplay="true" playsinline="true">
        <!--<source src="http://221.208.196.19:8080/hls/stream1.m3u8" type="application/x-mpegURL">-->
        <source src="http://dy2.jsyunbf.com/20180219/TUEHpd7j/index.m3u8" type="application/x-mpegURL">
      </video>
      <div class="cont">这是内容</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    created() {
    },
    mounted() {
      var iWindowWidth
      var iWindowHeight
      window.onresize = function() {
        autoWH()
        myPlayer.style.width = iWindowWidth + 'px'
        myPlayer.style.height = iWindowHeight + 'px'
      }
      // 获取videojs生成的video
      var myPlayer = document.getElementById('videoLive')
      // 播放按钮
      var oPlayBtn = document.getElementById('playBtn')
      // 遮罩图片
      var oPoster = document.getElementById('poster')
      window.addEventListener('touchmove', function(e) {
        e.preventDefault()
      }, false)
      function autoWH() {
        // 获取可视区宽度
        iWindowWidth = window.innerWidth
        // 获取可视区高度
        iWindowHeight = window.innerHeight
      }
      // autoWH()
      // 播放按钮呗点击
      oPlayBtn.onclick = function() {
        myPlayer.play()
        this.style.display = oPoster.style.display = 'none'
      }
      myPlayer.onclick = function() {
        console.log('点击了吗')
        if (oPlayBtn.style.display === 'none') {
          myPlayer.pause()
          oPlayBtn.style.display = 'block'
        } else {
          console.log('开始了')
          oPlayBtn.onclick()
        }
      }
      // 监听播放
      myPlayer.addEventListener('play', function() {
        alert(myPlayer.currentTime)
      }, false)
      // 监听暂停
      myPlayer.addEventListener('pause', function() {
        alert(myPlayer.currentTime)
        alert(this.duration)
      }, false)
      // 监听结束
      myPlayer.addEventListener('ended', function() {
      }, false)
    }
  }
</script>
<style>
  video {
    object-position: 0px 0px;
    width: 100vw;
  }

  #videoBox {
    position: absolute;
    left: 0;
  }

  #playBtn {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background: blue;
    border: none;
    z-index: 1000;
  }
  #poster {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 100;
  }
  .cont{
    position: absolute;
    top: 300px;
    width: 100%;
    height: 100%;
    background: yellow;
  }
  .abc{
    position: absolute;
    top: 0;
    height: 100px;
    width: 100vw;
    background: orange;
  }
</style>
