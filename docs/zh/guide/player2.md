---
title: 播放器组件核心部分
lang: ZH
---

## 💙播放器部分

歌曲的播放功能,主要是利用 html5 的 audio 标签实现

```vue
<audio
  autoplay
  muted
  ref="audio"
  @canplay="getDuration"
  @error="error"
  :src="songsUrl"
  @timeupdate="UpdateTime"
></audio>
```

### 💜获取歌曲 url

:::tip
由于这个 webapp 使用到的 api 是网易云的 api，所以这里我们需要调用获取歌曲的 url
:::

```js
export function getMusic(musicId) {
  const url = HOST + `/music/url?id=${musicId}`
  return axios.get(url)
}
```

**play 组件里面调用 api**

```js
 currentSong (newSong, oldSong) {
  //  如果两首歌曲的id都一样 就不刷新currentSong
      if (newSong.id === oldSong.id) {
        return
      }
      getMusic(this.currentSong.id).then((res) => {
        this.songsUrl = res.data.data[0].url
      })
      // 如果有歌词在播放 这个Lyric对象停止播放
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      this._getLyric(this.currentSong.id)
    },
```

### 💚播放器逻辑部分

**之后当歌曲 ready 的时候，才能点下一首歌，设置一个标志位控制加载成功**

```js
data () {
  return {
    songReady: false
  }
}
```

**添加一个@canPlay 函数 当其 songReady 为 true 才能**

```js
   getDuration () {
      // 获取到歌曲
      this.duration = this.$refs.audio.duration
      this.songsTime = this.$refs.audio.duration
      // 可以播放 songReady置为true
      this.songReady = true
    }
```

**写好了 songReady 之后,回到 next 和 prev 函数控制歌曲的上一首下一首 点击播放歌曲 togglePlaying()**

```js
next () {
  if(!this.songReady) {
    return
  }
  let index = this.currentIndex + 1
  if(index === this.playlist.length) {
    // 当切到最后一首歌
    index = 0
  }
  this.setCurrentIndex(index)
  // 切换到写一首歌时保证播放状态
  if(!this.playing) {
    this.togglePlaying()
    this.songReady = false //重置
  }
....
prev () {
  if(!this.songReady) {
    return
  }
  let index = this.currentIndex - 1
  if(index === -1) {
    // 第一首歌 index切换到最后一首歌的index
    index = this.playlist.length
  }
  this.currentIndex(index)
  if(!this.playing) {
    this.togglePlaying()
    this.songReady = false
  }
}
....
toggleplaying () {
   if (!this.songReady) {
        return
      }
      this.setPlaying(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
}
}

```

**当按钮不能点击时 就是歌曲没有 songReady 的时候给按钮一个 disable 属性**

```js
disableCls () {
  return this.songReady ? '':'disable'
}
```

**播放器进度条 dom**

```vue
<!-- 进度条 -->
<div class="progress-wrapper">
      <span class="time time-l">{{format(currentTime)}}</span>
      <div class="progress-bar-wrapper">
        <progressbar :currentTime="currentTime" :songsTime="songsTime" :precent="precent" @percentChangeEnd="onProgressBarChange"></progressbar>
      </div>
      <span class="time time-r">{{format(songsTime)}}</span>
    </div>
```

**歌曲在播放时会派发 timeupdate 事件**

```js
updateTime (e) {
  this.currentTime = e.target.currentTime
}
```

**但是这个时间是小数点的 需要进行格式化**

```js
format (inteval) {
  inteval = inteval | 0
  let minute = inteval /60 | 0
  let second = this._pad(inteval % 60)
  return `${minute}:${second}`
}

// 当秒的字符串长度小于于2 就在前面补0
_pad(num,n=2) {
  let len = num.toString().length
  while(len < 2) {
    num = '0' + num
    len++
  }
  return num
}

```

调用格式化时间 然后挂在 dom 上

<h3>进度条组件</h3>
在play组件上的样式

> flex布局,垂直居中,水平也居中,上下有两个padding 左右span文字对齐方式不同

```stylus
.progress-wrapper
  display flex
  align-items center
  width 80%
  margin 0 auto
  padding 10px 0
  .time
    color:$color-text
    font-size $font-size-small
    flex 0 0 30px
    line-height 1.875rem
    width 1.875rem
    &.time-l
      text-align left
    &.time-r
      text-align right
  .progress-bar-wrapper
    flex 1
```

progress-bar 组件

dom 结构：

```vue
<template>
  <div class="progress-bar" ref="progressbar" @click="progressClick">
    <!-- 总进度条 -->
    <div class="bar-inner">
      <!-- 进度条左侧 -->
      <div class="progress" ref="progress"></div>
      <!-- 进度条按钮 -->
      <div class="progress-btn-wrapper">
        <div
          class="progress-btn"
          ref="progressbtn"
          @touchstart.prevent="progressTouchStart"
          @touchmove.prevent="progressTouchMove"
          @touchend.prevent="progressTouchEnd"
        ></div>
      </div>
    </div>
  </div>
</template>
```

**进度条样式**

```stylus
.progress-bar
  height 30px
  .bar-inner
    position relative
    top 13px
    height 4px
    background rgba(0,0,0,0.3)
    .progress
      position absolute
      height 100%
      background $color-theme
    .progress-btn-wrapper
      position absolute
      left -8px
      top -13px
      width 30px
      height 30px
      .progress-btn
        position relative
        top 7px
        left 7px
        box-sizing border-box
        wdith 16px
        height 16px
        border 3px solid $color-text
        border-radius 50%
        background $color-theme
```

**对应的效果图**

![QQ截图20200118213149.png](https://i.loli.net/2020/01/18/yAONqK5FQR9wYL3.png)

**挂到 play.vue 上**

```vue
<div class="progress-bar-wrapper">
        <progressbar :currentTime="currentTime" :songsTime="songsTime" :precent="precent" @percentChangeEnd="onProgressBarChange"></progressbar>
      </div>
```

precent 对 progress-bar 组件进度条有用

```js
computed :{
  precent () {
    return this.currentTime / this.songTime
  }
 }
```

使进度条睡着歌曲进度而改变

```js
watch:{
  currentTime (val) {
    if(val > 0) {
      // 总进度条长度
      const progressTotalWidth =this.$refs.progressbar.clientWidth -16
      // 左侧progress偏移
      cost precentx = val /this.somngTime
      const progressWidth = progressTotalWidth * precentx
      this.$refs.progress.style.width = `${progressWidth}px`
      this.$refs.progressbtn.style[transform] = `translate3d(${progressWidth}px,0,0)`
    }
  }
}
```

:::warning 进度条拖拽
实现方法:

- 定义好偏移函数
- 使用 js 的三个钩子(`touchstart` `touchmove` `touchend`) 对进度条实现偏移
- 向外派发事件 将当前 precent 转发到 play 组件
  :::

<h3>定义偏移方法</h3>

```js
_offset (offsetWidth) {
  this.$refs.progress.style.width = `${offsetWidth}px`
  this.$refs.progressbtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
}
```

```js
created() {
  this.touch = {}
}
// 记录第一次触屏位置 和初始进度条偏移
progressTouchStart (e) {
this.touch.initiated = true
this.touch.startX = e.touches[0].pageX
this.touch.left = this.$refs.progress.clientWidth
},
// 记录拖动偏移量,现在偏移量等于初始偏移量+拖动偏移 但是不能呢个超过进度条的总宽度
progressTouchMove(e) {
 if (!this.touch.initiated) {
        return
      }
      const moveWidth = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressbar.clientWidth - 16, Math.max(0, this.touch.left + moveWidth))
      this._triggerPrecent()
      this._offset(offsetWidth)
},
// 初始化为false 将拖动信息转发出去
progressTouchEnd (e) {
this.touch.initiated = false
const barWidth = this.$refs.progressbar.clientWidth-16
const precent = this.$refs.progress.clientWidth / barWidth
this.$emit('percentChangeEnd',precent)
},

 _triggerPrecent () {
      // 派发当前precent
      const progressTotalWidth = this.$refs.progressbar.clientWidth - 16
      const precent = this.$refs.progress.clientWidth / progressTotalWidth
      this.$emit('precentChange', precent)
    }
```

**play 组件上监听转发事件 **

```js
onProgressBarChange (precent) {
  // 控制播放时间
  this.$refs.audio.currentTime = this.songTime * precent
  if(!this.playing) {
    // 如果拖动进度条暂停了 就继续播放
    this.togglePlaying()
  }
  if(this.currentLyric) {
    // 寻找歌词
    this.currentLyric.seek(this.$refs.audio.currentTime * 1000)
  }
}
```

实现效果图

![GIF.gif](https://i.loli.net/2020/01/19/a1WbrhY7UJPOQsV.gif)

添加完了拖动事件，接下来添加点击变换进度条事件.
:::tip
原理也是一样，也是计算 `progressgress` 偏移和 `progressbtn` 偏移，然后派发 precent 出去
:::

```js
 // 点击进度条事件
    progressClick (e) {
      //  ! e.pageX 获取到的位置有bug
      const rect = this.$refs.progressbar.getBoundingClientRect()
      // rect.left 元素距离左边的距离
      // e.pageX 点击距离左边的距离
      const offsetWidth = e.pageX - rect.left
      // console.log(rect, e.pageX)
      this._offset(offsetWidth)
      const barWidth = this.$refs.progressbar.clientWidth - 16
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChangeEnd', percent)
    },
```

:::danger bug
此处如果直接使用 `e.pageX` 记录元素距左边的位置会有 bug,我们这里使用 `getBoundClientRect()`相对视口位置 bar 相对浏览器的左侧视口位置 偏移量就等于 `e.pageX-rect`
:::
这样我们就完成了进度条的点击和拖拽进度效果

接着我们要给 `min-player` 也制作一个圆形播放进度条效果
同样我们创建 `progress-circle` 基础组件

```vue
<template>
  <div class="progresscircle">
    <!-- wdith height 是svg圈的大小 stroke-dasharray是描边总周长 dashOffset描边偏移量  -->
    <svg
      :width="radius"
      :height="radius"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="progress-background"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
      />
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'progresscircle',
  props: {
    radius: {
      type: Number,
      default: 100
    },
    precent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dashArray: 314
    }
  },

  components: {},

  computed: {
    dashOffset() {
      return (1 - this.precent) * this.dashArray
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
}
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
 .progresscircle
    position: relative
    circle
      stroke-width: 6px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-theme-d
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>
```

<h3>组件接受两个参数</h3>

- radius radius 用来控制 svg 图的宽高 我们这里 radius 传入 32
- precent svg 图下 progress-bar 有两个参数
  - **stroke-dasharray**描边周长 这里应该是 314(2*3.14*50)
  - **stroke-dashoffset** 外层有颜色描边的长度 这里我们用(1-precent)\*dasharray 来表示当前进度

### 💛播放器模式切换

一开始播放模式我们是写死的 icon,接下来就不用写死了

```vue
<div class="icon i-left" @click="changeMode">
        <i :class="iconMode" ></i>
      </div>
.... iconMode () { return this.mode === playMode.sequence ? 'icon-sequence' :
this.mode === playMode.loop ? 'icon-loop' : 'icon-random' }
```

更换模式的实现，模式以共有三种所以我们设置模式 3 个里面循环

```js
changeMode () {
  const mode = (this.mode + 1)%3
  this.setMode(mode)
  let list =null
  if(this..mode === playMode.random) {
    list = shuffle(this.sequencelist)
     this.resetCurrentIndex(list)
        this.setsplaylist(list)
  }else {
        list = this.sequencelist
        this.resetCurrentIndex(list)
        this.setsplaylist(list)
      }
}

.....
洗牌函数(遍历数组用array[i]去和随机的min到max下标的数祖元素去交换 这样数组就会很乱)

function getRandomInt(min,max){
  // 保证取到min-max的随机数
  return Math.floor(Math.random()*(max - min + 1) + min)
}
function shuffle(arr){
  let _arr = arr.slice()
  for(let i= 0; i<_arr.length;i++){
    let j= getRandomInt(0,i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

```

:::warning 注意
这里用到的定义的两个方法

```js
resetCurrentIndex(list){
// 找到当前歌曲id相同的list元素索引 这样歌曲就不会再切换了模式之后 list改变 currentSong改变 当前歌曲被切换了
let index1 = list.finIndex((item)=>{
  return itlem.id === this.currentSong.id
})
this.setCurrentindex(index1)
}

// 然后我们在监听currentSong时这样去写
currentSong(newSomng,oldSong){
  if(newSong.id === oldSong.id){
    return
  }
}
```

:::

<h3>接下来就是播放器的一些问题解决</h3>

1. 歌曲播放到末尾 自动切换下一首

```js
// 监听ended事件
 End () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    }
```

2. 循环播放模式设置

```JS
loop() {
  setTimeout(()=>{
    this.$refs.audio.currentTime = 0
    this.$refs.audio.play()
  },1000)
  if(this.currentLyric) {
    this.currentLyric,seek(0)
  }
}
```

3. 实现封面随机播放

```js
// 添加点击事件
random() {
  this.randomPlay({
    list:this.songs
  })
}


// 这里需要设置actions
export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE, list)
  let randomlist = shuffle(list)
  commit(types.SET_CURRENTINDEX, 0)
  commit(types.SET_PLAYLIST, randomlist)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING, true)
}

```

### ❤️播放器歌词部分

获取歌词部分

```js
import axios from 'axios'
export function getLyric(id) {
  const url = `http://neteasemusic.yangxiansheng.top/lyric?id=${id}`
  return axios.get(url)
}
```

methods 里面定义好获取歌词方法

```js
 _getLyric (id) {
      getLyric(id).then((res) => {
        // 调用第三方库 将currentLyric转化为一个time-text对象
        this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric)
        if (this.playing) {
          this.currentLyric.play()
        }
      })
    },
```

> 这里使用到了第三方库`Lyric-parser` 这个插件的作用就是讲 currentLyric 转化为一个 time-text 对象 便于使用

在 watch 里面监听 currentSong 调用

```js
currentSong(newSong,oldSong) {
  if(newSong.id === oldSong.id) {
    return
  }
  getMusic(this.currentSong.id).then((res)=>{
    this.songurl= res.data.data[0].url
  })
  if(this.currentSong.id) {
    this.currentLyric.stop()
  }
  this._getLyric(this.currentSong.id)
}
```

这样就可以实现歌词的自动跳转

![GIF.gif](https://i.loli.net/2020/01/19/nskZdBEUqrLKuyC.gif)

我们要实现歌词到了第五行后面自动向下滚动

```js
handleLyric({lineNum,txt}) {
  // 当前行
  this.currentLineNum = lineNum
  if(lineNum > 5){
    let LineEl = this.$refs.lyricLine[lineNum-5]
    this.$refs.lyricList.scrollToElement(LineEl,500)
  }else{
    this.$refs.lyricList.scrollTo(0,0,1000)
  }
  // 记录歌词
  this.currentLyrictxt = txt
}
```

实现歌词左右滑动 切换(同样使用到了 touch 事件)

```vue
<Scroll
  class="middle-r"
  ref="lyricList"
  :data="currentLyric && currentLyric.lines"
>
<div class="lyric-wrapper">
  <div v-if="currentLyric">
    <p ref="lyricLine"
        class="text"
        :class="{'current':currentLineNum === index}"
        v-for="(line,index) in currentLyric.lines" :key="index">{{line.txt}}</p>
  </div>
</div>
</Scroll>
```
滑动处理
```js
  //  todo:左右滑动效果展示歌词
    midleTouchStart (e) {
      // 设置标志位已经初始化
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.startY = e.touches[0].pageY
    },
    midleTouchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      // 拿到差值
      const deltaX = e.touches[0].pageX - this.touch.startX
      const deltaY = e.touches[0].pageY - this.touch.startY
      // 歌词纵向滚动 当纵向偏移大于左右偏移的时候 我们不应该左右移动
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      // 拿到滚动过程中middle-r距离左右两侧的屏幕的差值
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      // lyricList是一个Vue(scroll)组件，是无法直接造作它的dom的，用$el来代替它的dom
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style[transitionDuration] = 0
      // 透明度的渐变
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.middleL.style[transitionDuration] = 0
    },
    middleTouchEnd () {
      // 用来决定停在哪个位置
      let offsetWidth
      let opacity
      if (this.currentShow === 'cd') {
        // 从右向左滑，只需要滑10%就行
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth // 最终停止的位置
          opacity = 0
          this.currentShow = 'lyric' // 改变dot的css样式
        } else {
          offsetWidth = 0 // 否则就回到原来的位置
          opacity = 1
        }
      } else { // 从右向左滑，看的是0.9
        if (this.touch.percent < 0.9) {
          offsetWidth = 0
          this.currentShow = 'cd'
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
```
dot区域
```vue
    <div class="dot-wrapper">
    <span class="dot" :class="{'active':currentShow === 'cd'}"></span>
    <span class="dot" :class="{'active':currentShow === 'lyric'}"></span>
    </div>
```

:::tip
后面发现一个问题 就是iphone无法播放出声音，这是因为iphone设备或者微信浏览器对用户流量进行监控 不允许用户在浏览器上对audio进行播放 对此我采用了监听`touchstart`事件对audio标签进行播放

```js
 firstPlay () {
      this.$refs.audio.play()
    },
```
### mixin方式解决滚动bug
我们发现实现后的滚动条的组件 滚动到底部几乎不能被看到,这是因为背mini播放器阻挡住了，所以我们需要给这些组件的scroll重新refresh，然后给组件设置mini播放器高的bottom

<h3>定义mixin</h3>
通过mixin的方式引入代码到组件是一个很方便的方法，这些代码会被复用，然后merge到组件的原来的钩子上

```js
import {mapGetters} from 'vuex'
export const playlistMixin ={
  computed:{
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  // keep-alive的方法
  activated () {
    this.handlePlaylistMixin(this.playlist)
  },
  watch:{
    playlist(newval){
      this.handlePlaylist(newval)
    }
  },
  methods:{
    handlePlaylist() {
      thorw new Error(' methods must be define')
    }
  }
}
```
:::
## 🌟总结
综上,播放器组件全部写完，里面包含了player组件 progress-bar组件 progress-circle组件，使用到了vuex实现状态管理，学习到了样式处理 播放状态管理 以及模式切换涉及到的知识等等,接下来就是开发榜单组件，加油~~~

附上效果图

![GIF.gif](https://i.loli.net/2020/01/19/TpaQiOYkyRcSsVr.gif)
