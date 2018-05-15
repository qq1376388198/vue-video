<template>
  <div style="width: 100vw;height: 100vh;position: relative;">
    <div id="videoBox">
      <input id="playBtn" type="button" value="">
      <img id="poster" src="http://img2.imgtn.bdimg.com/it/u=916341635,3114421173&fm=200&gp=0.jpg" alt="">
      <!--<video id="videoBox" controls preload="auto" poster="images/tempPoster.jpg" x5-video-player-type="h5" x5-video-player-fullscreen="true">-->
      <video id="videoLive"
             preload="auto"
             x5-video-player-type="h5"
             x5-video-player-fullscreen="true"
             webkit-playsinline="true" x-webkit-airplay="true" playsinline="true">
        <!--<source src="http://221.208.196.19:8080/hls/stream1.m3u8" type="application/x-mpegURL">-->
        <source src="http://dy2.jsyunbf.com/20180219/TUEHpd7j/index.m3u8" type="application/x-mpegURL">
      </video>
      <div class="showLoading" v-show="vStatus !== 4">正在加载</div>
      <div class="cont">
        <span id="curTime"></span>
        <input type="range" id="cRange" @change="changeCur(this.value)" v-model="vRange">
        <span id="allTime"></span>
      </div>
      <div id="fullScr"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        vStatus: '',
        vRange: 0,
        curTime: '',
        allTime: ''
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
      // 滚动条
      var cRange = document.getElementById('cRange')
      // 播放的试卷
      var curTime = document.getElementById('curTime')
      // 播放的总时长
      var allTime = document.getElementById('allTime')
      // 全屏按钮
      var fullScr = document.getElementById('fullScr')
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
        console.log(this.readyState) // 这是视频的状态 0-4之间 4表示可以播放
        this.vStatus = this.readyState
        if (this.readyState === 4) {
          getvideoprogress()
          getvideotime()
        }
      }, false)
      // 监听暂停
      myPlayer.addEventListener('pause', function() {
        oPlayBtn.style.display = 'block'
      }, false)
      // 监听结束
      myPlayer.addEventListener('ended', function() {
      }, false)
      // 退出播放层的时候触发
      myPlayer.addEventListener('x5videoexitfullscreen', function() {
        myPlayer.style.objectFit = ''
        myPlayer.removeAttribute('x5-video-orientation')
      }, false)
      // 进入播放层的时候触发
      myPlayer.addEventListener('x5videoenterfullscreen', function() {
      }, false)
      // 监控播放时间的变化
      function getvideoprogress() {
        setTimeout(function() {
          var currentTime = myPlayer.currentTime.toFixed(0)
          if (currentTime === 1) {
            // 触发
            return false
          }
          curTime.innerText = formatSeconds(currentTime)
          cRange.value = currentTime
          this.vRange = currentTime
          // 滚动条左右的颜色
          cRange.style.backgroundSize = ((cRange.value / cRange.max * 100)) + '% 100%'
          getvideoprogress()
        }, 1000)
      }
      // 拖动进度条
      cRange.addEventListener('change', function() {
        myPlayer.currentTime = this.value
      })
      // 全屏
      fullScr.addEventListener('click', function() {
        // 铺满屏幕
        myPlayer.style.objectFit = 'fill'
        // 横屏
        myPlayer.setAttribute('x5-video-orientation', 'landscape')
      })
      // 获取总时长
      function getvideotime() {
        setTimeout(function() {
          var duration = myPlayer.duration.toFixed(0)
          if (duration > 1) {
            // 触发
            allTime.innerText = formatSeconds(duration)
            cRange.max = duration
          }
        }, 1000)
      }
      // 时间转换
      function formatSeconds(value) {
        var theTime = parseInt(value)// 秒
        var theTime1 = 0// 分
        var theTime2 = 0// 小时
        // alert(theTime);
        if (theTime > 60) {
          theTime1 = parseInt(theTime / 60)
          theTime = parseInt(theTime % 60)
          // alert(theTime1+"-"+theTime);
          if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60)
            theTime1 = parseInt(theTime1 % 60)
          }
        }
        var result = '' + parseInt(theTime)
        result = theTime1 > 0 ? parseInt(theTime1) + ':' + result : '00:' + result
        result = theTime2 > 0 ? parseInt(theTime2) + ':' + result : '00:' + result
        return result
      }
    },
    watch: {
      'curTime': {
        handler: function(newVal, oldVal) {
          alert(newVal, 2)
        }
      }
    },
    methods: {
      changeCur() {
      }
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
  }
  #fullScr{
    position: absolute;
    top: 200px;
    width: 100px;
    height: 100px;
    background: green;
  }
  .abc{
    position: absolute;
    top: 0;
    height: 100px;
    width: 100vw;
    background: orange;
  }
  .showLoading{
    width: 100%;
    height: 100px;
    background: red;
    font-size: 20px;
    position: absolute;
    top: 400px;
  }
  #cRange{
    width: 90vw;
    height: 5vw;
  }
  input[type=range] {
    -webkit-appearance: none;/*清除系统默认样式*/
    width: 100%;
    background: -webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd;/*设置左边颜色为#61bd12，右边颜色为#ddd*/
/*
    background-size: 75% 100%;!*设置左右宽度比例  这里需要用js来判断添加*!
*/
    height: 3px;/*横条的高度*/
  }
  /*拖动块的样式*/
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;/*清除系统默认样式*/
    height: 26px;/*拖动块高度*/
    width: 26px;/*拖动块宽度*/
    background: #fff;/*拖动块背景*/
    border-radius: 50%; /*外观设置为圆形*/
    border: solid 1px #ddd; /*设置边框*/
  }
</style>
