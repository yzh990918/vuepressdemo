---
title: 播放器组件开发
lang: ZH
---
## 定义播放器底层数据
开发前先思考 播放器可能需要这几个数据 
- playing 暂停或者播放
- fullScreen 控制播放器是否全屏显示
- playlist 播放列表
- sequenceList 顺序播放模式歌曲列表
- mode 播放模式
- currentIndex 当前播放歌曲的下标(可以通过此下标得到currentSong:state.playlist[state.currentIndex])

OK,我们开始书写vuex相关
:::tip 定义公共配置
config.js
```js
export const playMode ={
  sequence:0,
  loop:1,
  random:2
}
```
:::
<h3>state.js</h3>

```js
import {playMode} from 'config.js'
const state ={
  singer:{},
  playing:false,
  fullScreen:false,
  playlist:[],
  sequencelist:[],
  mode:playMode.sequence,
  currentIndex:-1
}
export default state
```
<h3>mutations-type 定义函数名</h3>

```js
export const SET_PLAYING='SET_PLAYING'
export const SET_FULLSCREEN='SET_FULLSCREEN'
export const SET_PLAYLIST='SET_PLAYLIST'
export const SET_SEQUENCE='SET_SEQUENCE'
export const SET_MODE='SET_MODE'
export const SET_CURRENTINDEX='SET_CURRENTINDEX'
```
<h3>mutation.js 修改数据</h3>

```js
const mutations ={
  [types.SET_PLAYING](state,flag) {
    state.playing=flag
  },
  [types.SET_FULLSCREEN](state,flag) {
    state.fullScreen=flag
  },
  [types.SET_PLAYLIST](state,list) {
    state.playlist=list
  },
  [types.SET_SEQUENCE](state,list) {
    state.sequence=list
  },
  [types.SET_MODE](state,mode) {
    state.mode=mode
  },
  [types.SETCURRENTINDEX](state,index) {
    state.currentIndex=index
  }
}
export default mutations
```

<h3>getters.js</h3>

```js
+export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequencelist = state => state.sequencelist

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}
```

### 定义完数据之后先把play组件的基本代码书写 
**基本dom结构**
```vue
<template>
  <div class="player" v-show="playlist.length">
    <transition name="normal-player">
<div class="normal-player" v-show="fullScreen">
  <!-- 背景图 -->
  <div class="background">
    <img width="100%" height="100%" :src="currentSong.image" alt="">
  </div>
  <!-- 顶部标题 -->
  <div class="top">
    <div class="back" @click="back" >
      <i class="icon-back" ></i>
    </div>
    <h1 class="title" v-html="currentSong.name">
    </h1>
    <h2 class="subtitle" v-html="currentSong.singer" @click="tosinger"></h2>
  </div>
  <!-- 中间部分cd唱片 歌曲歌词 -->
  <div class="middle">
    <div class="middle-l">
      <div class="cd-wrapper">
        <div class="cd" >
          <img class="image" :src="currentSong.image" alt="">
        </div>
        <div class="play-lyric-wrapper">
          <div class="playing-lyric">
          </div>
        </div>
      </div>
    </div>
    <div class="middle-r">
      <div class="lyric-wrapper">
      </div>
    </div>
  </div>
  <!-- 底部进度条 歌曲操作 -->
  <div class="bottom">
    <!-- 滑块条 -->
    <div class="dot-wrapper">
    </div>
    <!-- 进度条 -->
    <div class="progress-wrapper">
      <div class="progress-bar-wrapper"></div>
    </div>
    <!-- 操作区 -->
    <div class="operators">
      <div class="icon i-left">
        <i class="icon-sequence"></i>
      </div>
      <div class="icon i-left">
        <i class="icon-prev"></i>
      </div>
      <div class="icon i-center">
        <i class="icon-play"></i>
      </div>
      <div class="icon i-right">
        <i class="icon-next"></i>
      </div>
      <div class="icon i-right">
        <i class="icon icon-not-favorite"></i>
      </div>
    </div>
  </div>
</div>
 </transition>
 <transition name="min-player">
<div class="mini-player" @click="open" v-show="!fullScreen">
  <div class="image">
    <img class=""  width="40" height="40" :src="currentSong.image"  >
  </div>
  <div class="text">
    <h2 class="name" v-html="currentSong.name"></h2>
    <p class="singername" v-html="currentSong.singer"></p>
  </div>
  <div class="control">
    <i class="icon-mini icon-play-mini"></i>
  </div>
  <div class="control">
    <i class="icon-playlist"></i>
  </div>
</div>
 </transition>
<audio autoplay muted ref="audio" @canplay="getDuration" :src="songsUrl"></audio>
  </div>
</template>

```
> plaer分为全屏播放器和迷你播放器,全屏播放器里面有(模糊背景图 顶层(back图标 歌曲名 歌手名) 中间层(唱片图 歌词区 右划歌词区 进度条 dot区) 底层(操作区)) 迷你播放器(左(歌曲图) 中间(歌曲名 歌手名) 右边(歌曲暂停播放图标 进度 歌曲列表) )

:::warning
- 迷你播放器flex布局最好,横轴改为纵轴 垂直方向居中 然后中间desc flex:1 其他都分配好宽度最好  
- 全屏播放器建议cd和操作区的样式难些 多练习 
:::

```stylus
.player
  .normal-player
    position fixed
    left 0
    right 0
    bottom 0
    top 0
    z-index 150
    background $color-background
    .background
      //高斯模糊背景图
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      z-index -1
      opacity 0.6
      filter:blur(20px)
    .top
      position relative
      margin-bottom 25px
      .back
        position absolute
        left 6px
        top 0
        z-index 50
        .icon-back
          padding 9px
          display block
          font-size $font-size-large-x
          color $color-theme
          transform rotate(-90deg)
      .title
        width 70%
        margin 0 auto
        line-height 40px
        text-align center
        no-wrap()
        font-size #font-size-large
        color $color-text
      .subtitle
        line-height 20px
        text-align center
        font-size $font-size-medium
        color $color-text
    .middle
      position fixed
      wdith 100%
      top 80px
      bottom 170px
      white-space nowrap
      font-size 0
      .middle-l
        display inline-block
        vertical-align top
        position relative
        width 100%
        height 0
        padding 80%
        .cd-wrapepr
          position absolute
          left 10%
          top 0
          width 100%
          height 100%
          .cd
            width 100%
            height 100%
            box-sizing border-box
            border 10px solid rgba(255,255,255,0.1)
            border-radius 50%
            .image
              position absolute
              left 0
              top 0
              width 100%
              height 100%
              border-radius 50%
               .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0
```
在写两个交互动画
打开normal播放器或者mini播放器
```stylus
.normal-player-enter-active,.normal-player-leave-active
  translate all 0.4s
  .top,.bottom
  //贝赛尔曲线定义环动 
    transition all 0.4s cubic-bezier(0.86,0.18,0.82,1.32)
.normal-player-enter,.normal-player-leave-active
  opcity 0
  //定义top初始向上100px bottom初始向下100px 动画自下而上 自上而下 渐隐渐现
  .top
    transform translate3d(0,-100px,0)
  .bottom 
    transform translate3d(0,100px,0)

&.min-player-enter-active,&.min-player-leave-active
  transition all 0.4s
&.min-player-enter,&.min-player-leave-active
  opcity 0
```
### 逻辑部分书写

书写完player组件,由于他跟路由没啥关系,而且很多组件会用到,所以定义在app.vue中，莫忘记注册

我们需要控制player的显示与隐藏,不然会盖住singer-detail

```js
computed:{
  ...mapGetters([
    'fullScreen',
    'playlist',
    'currentSong'
  ])
}
 <div class="player" v-show="playlist.length > 0">
 <div class="normal-player" v-show="fullScreen">
 <div class="mini-player" v-show="!fullScreen">     
```
这样就不会默认显示了,接下来我们去写songlist的事件
```vue
<ul>
      <li @click="selectItem(song, index)" v-for="(song, index) in songs" :key="index" class="item">
          <div class="content">
              <h2 class="name">{{song.name}}</h2>
              <p class="desc">{{getDesc(song)}}</p>
          </div>
      </li>
    </ul>
  
  .....
  methods:{
    selectItem(item,index) {
      this.$emit('select',item,index)
    }
  }
```
父组件music-list接受事件 因为这里我们需要将点击的歌曲信息传入vuex并修改 发现需要修改多个mutation，所以定义action.js

```js
import * as types from './mutations-type'
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING, true)
}
```
定义好了批量操作 传入数据修改mutation
```js
@select="selectItem"
...
methods:{
  ...mapActions([
    'selectplay'
  ])
  selectItem(item,index) {
  this.selectPlay(
    {
      list:this.songs,
      index
    }
  )

  }
}
```

接下来取出currentSong 挂到dom上,这里不详细介绍。
我们在点击歌曲后需要将fullScreen置为true,但是不能直接去修改getters的数据,需要进行mutations修改

```js
...mapMutations(
{
  setfullScreen:'SET_FULLSCREEN'
})

methods:{
  back() {
    this.setfullScreen(false)
  }
  
  play() {
    this.setfullScreen(true)
  }
}
```
这样就可以图标控制隐藏显示 或者迷你播放器打开 添加点击事件即可 下一节将介绍播放器核心部分


### 播放器飞入左下角动画
:::tip
vue的js钩子可以帮助我们实现这个动画
- @enter=""
- @after-enter=""
- @leave=""
- @after-leave=""
:::

首先引入第三方创建动画库`create-keyframe-animation`
具体思路:
1. 计算两个圆心的坐标,根据坐标计算出水平竖直偏移量
2. 定义并使用动画
3. 清除动画

<h3>定义函数计算出图片之间偏移量和缩放</h3>

```js
_getPosAndScale () {
  // * 要做一个大图片从mini播放器飞到大图层cdWrapper的动画 使用到create-keyframe-animation第三方插键
  // ! 思路：1.计算出偏移横纵坐标 2.横轴偏移(屏幕宽度/2-min播放器左侧偏移) 3.纵轴偏移(屏幕高度-大图层paddingTop-min播放器圆心距底部位置-cdwrapper的高度/2) 4.书写动画
  const targetWidth = 40//图片宽度
  const paddingLeft = 40//mini圆心左翩移
  const paddingBottom = 30//底部距圆心距离
  const paddingTop = 80 //顶部距圆心距离
  const width = window.innerWidth * 0.8 //整个cd-wrapper的宽度
  const scale = targetWidth / width//原始缩放比例
   const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x,
        y,
        scale
      }

}
```
<h3>定义动画</h3>

```js
//import之后
//进入时
enter(el,done) {
  const {x,y,scale} =this._getPosAndScale()
  // 定义动画
  let animation = {
    // 底部飞到大图片 然后从60到100 scale先1.1然后回调
    0：{
      transform:`translate3d(${x}px,${y}px,scale(${scale}))`
    },
    60: {
      transform: `translate3d(0,0,0) scale(1.1)`

    },
    100: {
      transform :`translate3d(0,0,0) scale(1)`
  }
}
// 注册animation
animations.registerAnimation({
  name:'move',
  animation, //定义好的动画
  presets: {// 预设参数
  duration:400,
  easing:'linear'
  } 
}),
// 运行animation
animations.runAnimation(this.$refs.cdWrapper,'move',done)
}

// 进入后清除
afterEnter () {
  // 清除animation
  animations.unregisterAnimation('move') 
  this.$refs.cdWrapper.style.animation = ''
}
```
关闭窗口时 原理也是相似的

```js
leave (el,done) {
  const {x, y, scale} = this._getPosAndScale()
  this.$refs.cdWrapper.style['transform'] = `translate3d(${x}px,${y}px,0) scale(${scale})`
  this.$refs.cdWrapper.style.transition = 'all 0.4s'
  // 监听transitionend事件 之后执行afterLeave
  this.$refs.cdWrapper.addEventListener('transitionend', done)

  //清除transition transform
   afterLeave () {
      this.$refs.cdWrapper.style['transform'] = ''
      this.$refs.cdWrapper.style.transition = ''
    },
```
这样cd的打开关闭都会有一个效果不错的动画效果
