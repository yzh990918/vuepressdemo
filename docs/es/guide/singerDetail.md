# 开发歌手详情页面
## :crystal_ball:封装数据
:::tip 分析
我们拿到的数据里面如下图,歌手详情页面的hotsongs是我们想要的数据 `name`是歌曲名 `al`专辑相关  `ar`歌曲演唱的歌手 还有就是歌手名 mvid等等
:::
![QQ截图20191228225755.png](https://i.loli.net/2019/12/28/YfydjNwxLZvcFgi.png)

> 以后遇到这种需要封装数据到一个对象 就应该用工厂模式去实例一个类 然后遍历数据添加对象到初始化数组里即可

创建song类
```js
export default class Song{
  constructor({
    id,
    singer,
    name,
    album,
    image,
    mv
  }){
    this.id=id
    this.singer=singer
    this.name=name
    this.album=album
    this.image=image
    this.mv=mv
  }
}
```
工厂模式创建实例函数
```js
export function createSong(music){
return new Song({
  // 根据api修改参数
      id:music.id,
      singer:filterSinger(music.ar),
      name:music.name,
      album:music.al.name,//专辑名
      image: music.al.picUrl,
      mv:music.mv
})
}
```
:::warning 注意
这里的歌手不止一个,这种情况就定义函数返回一个分隔开歌手数据的数组
```js
function filterSinger(singer){
  let ret=[]
  ret=singer.map((item)=>{
  return item.name
  })
  return ret.join('/')
}
```
:::

事先做好的事情都准备好了，开始处理数据

```js
_normalizeSong(list){
  let ret=[]
  list.forEach((item)=>{
    ret.push(createSong(item))
  })
  return ret
}
```
~~## :mega:总结~~
~~这样就完成了所有的封装数据任务,后续要完成的事情就是利用数据完成singerDetail组件,加油！~~

## :boom:详情页开发
### :minidisc:singerdetail
:::warning
首先解决上一次开发遗留下的问题:处理song数据然后向list数组中添加工厂对象forEach会报错,原因是请求数据是异步加载 页面刚没渲染item就没有值 就会报错
:::
**解决办法：**
```js
// 定义一个监控data变量
data(){
  return {
    listdetail:[],
    node:null
    
  }
}
methods:{
  getSingerdetail(this.singer.id).then((res)=>{
    this.node=res.data.hotsongs
  })
},
watch:{
  node(val){
    this.listdetail=this._normalize(val)
  }
}


```
`watch`监听到数据把数据置于代理变量中 然后传给子组件 就可以解决异步加载的问题

数据解决完毕后,开发dom
```vue
<template>
  <transition name="change">
    <div class="singer-detail">
    <!-- musiclist音乐列表组件 -->
       <musiclist :songs="listdetail" :title="title" :bgImage="bgimage"></musiclist>
    </div>
  </transition>
</template>

```
这样点击链接跳转到子路由的太干了，设置一个进场动画
```stylus
.change-enter-active,.change-leave-active
  transition: all 0.3s
.change-enter,.change-leave-to
  //向由往左划 入场相反
  transform:translate3d(100%,0,0)
```
由此联想到设置加载中的时候也用到了translateY 设置居中显示
总结一下页面居中技巧
:::tip
1. 已知元素的宽高,设置元素决定定位居中显示

```css
position:absolute;
top:50%;
left:50%;
margin-left:-50%width
margin-top:-50%height
```
2. 未知宽高,设置元素居中

```css
position:absolute;
top:50%
left:50%
transform:translate3d(-50%,-50%,0)
```
3. 利用flex布局进行垂直居中

```css
display:flex
//横轴
justify-content:center
纵轴
aligin-items:center
```
:::

### :dvd:mmusiclist
`musiclist`包括`back`图标 `bg-image`背景图 `filter`蒙层 `play-wrapper`随机播放按钮 `songlist`歌曲列表组件 `loading`加载组件
dom结构
```vue
<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgimage" ref="image">
      <div class="filter"></div>
      <div class="play-wrapper" ref="playwrapper"  v-show="songs.length">
        <div class="play-button">
          <i class="icon-play"></i>
          <span class="text">随机播放热门歌曲</span>
        </div>
        </div>
    </div>
    <div class="layer" ref="layer"></div>
    <scroll :probeType="probetype" :listenScroll="true" @scroll="scroll" :data="songs" class="list" ref="list">
      <div class="songlist-wrapper">
        <songlist :songs="songs"></songlist>
      </div>
    </scroll>
    <div v-show="!songs.length"
           class="loading-container">
        <loading></loading>
      </div>
  </div>
</template>
```

<h3>样式书写</h3>

```stylus
.music-list
  position:fixed
  top:0
  right:0
  left:0
  bottom:0
  z-index:100
  background-color:$color-background
  .back
    position:absolute
    top 0
    left 6px
    z-index 50
    .icon-back
      display block
      font-size $font-size-large-x
      padding 10px
      color $color-theme
  .title
    position:absolute
    top 0
    left 10%
    width 80%
    line-height 40px
    font-size $font-size-large
    color $color-text
    text-align center
    z-index 40
    no-wrap()
  .bg-image
    position relative
    width 100%
    height 0
    padding-top 70%
    transform-origin top
    background-size cover
    .play-wrapper
      position absolute
      bottom 20px
      z-index 50
      width 100%
      .play-button
        box-sizing border-box
        width 9.685rem
        padding 7px 0
        margin 0 auto
        text-align center
        border 1px solid $color-theme
        color $color 
        .icon-play
          display inline-block
          vertical-align middle
          margin-right 6px
          font-size $font-size-medium-x
        .text 
          display inline-block
          vertical-aligin middle
          font-size $font-size-small
    .filter
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background rgba(7,17,27,0.4)
  .layer
    //除了bg-image的屏幕内容 用于计算高度
    position relative
    height 100%
    background $color-background
  .list
    position fixed
    top 0
    bottom 0
    width 100%
    background $color-background
    .songlist-wrapper
      padding 20px 30px
  .loading-container
    position absolute
    width 100%
    top 60%
    transform translateY(-50%)
  
```

样式书写完成后,开始书写逻辑部分
- bgimage用computed获取

```js
computed:{
  bgimage() {
    return `background-image:url(${this.bgimage})`
  }
}
```
- soglist开发

直接贴代码,比较简单
```vue
<template>
  <div class="songlist">
    <ul>
      <li v-for="(item,index) in songs"
          :key="index"
          class="item">
        <div class="content">
          <h2 class="name">
            {{item.name}}
          </h2>
          <p class="desc">{{getdesc(item)}}</p>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'songlist',
  props: {
    songs: {
      type: Array
      // default: []
    }
  },
  data () {
    return {}
  },

  components: {},

  computed: {
    desc () {
      return this.songs.singer + this.songs.album
    }
  },

  beforeMount () {},

  mounted () {
    console.log(this.songs)
  },

  methods: {
    getdesc (song) {
      return `${song.singer}-${song.album}`
    }
  },

  watch: {}
}
</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
@import '~@/common/stylus/mixin.styl'
.songlist
  .item
    font-size: $font-size-medium
    box-sizing: border-box
    align-items: center
    display: flex
    height: 64px
    .content
      line-height: 20px
      overflow: hidden
      .name
        no-wrap()
        color: $color-text
      .desc
        no-wrap()
        margin-top: 4px
        color: $color-text-d
</style>

```
- 滚动songlist设置
1. 向scroll组件传值(listenScroll:true,probeType:3 监听scroll事件,data数据)
```js
data() {
  return {
    proveType:3,
    scrollY:0
  }
},
created(){
  this.listenScroll=true
}
```
2. 设置songlist滚动到一定位置不动 且文字盖过图片 上面留一个bg-image一小部分
:::tip 实现想法
先发现图片会消失不见 dom方法获取到bg-image的高度 然后给songlist设置高度
通过监听到`scroll`事件 获取到实时的位置 然后监听`scrollY`的值 固定最大偏移量 然后监听过程中拿到偏移量 设置`layer`的向上偏移 layer的作用(这时需要一个位于歌单列表下方的图层（`bg-layer`），当歌单列表向上滑动的时候filter也跟着向上滑动，**盖住下方的图像**)  然后 如果到达到顶部(`val<translateY`)时 设置图像区域的高度为40px
其他情况就和之前相似 这个过程中bg-image的index都是0 如果是顶部位置 就是10
:::
这个讲起来有点复杂 接下来一步一步来
  - 监听scroll
  
  ```js
  scroll(pos){
    this.scrollY=pos.y
  }
  ```
  - 设置图片的高度撑开
  
  ```js
  mounted() {
    this.imageHeight=this.$refs.image.clientHeight
    //获取组件的dom 后面$el
    this.$refs.list.$el.style.top=`${this.imageHeight}px`
  }
  ```
  - layer偏移一定量 固定不动
  
  ```js
  this.minTranslateY= -this.imageHeight +TITLE_HEIGHT
  watch() {
    scrollY(val){
      let zIndex=0
      let translateY=Math.max(this.minTranslateY,val)
      this.$refs.layer.style['transform']=`translate3d(0,${translateY}px,0)`
      this.$refss.layer.style['webkitTransform']=`translate3d(0,${translate3Y}px,0)`

      if(val < translateY){
        <!-- 顶部 -->
        z-index = 10
        this.$refs.image.style.paddingTop = 0
        this.$refs.image.style.height = '40px'
        this.$refs.playwrapper.style.display='none'
      }else {
        this.$refs.image.style.paddingTop = '7-%'
        this.$refs.image.style.height = 0
        this.$refs.playwrapper.style.display=''
      }
      this.$refs.image.index = zIndex
      
    }
  }
  ```
  - 实现向下拉图片 图片放大效果
  ```js
  let scale=1.0
  const present=Math.abs(val / this.imageHeight) //这样就可以是图片层的高度变为1+放大的高度
  if(val > 0){
    scale=1 + present
    z-Index = 10
  }

  ····
  this.$refs.image.style[`transform`]=`scale(${scale})`
  ```
综上 歌手详情页就开发完成 使用到了scroll组件 根据高度盖住图层 知道了index的重要性 后面开发开发中最难的组件-播放起组件 加油！！
  