---
title: 开发歌手详情页面
lang: ZH
---
## :Crystal ball: encapsulating data
:::Tip analysis
The data we get is shown in the figure below. The hotsongs on the singer details page is the data we want. The "name" is the song name, the "Al" album, the "ar" song singer, the singer name, the Mvid, etc
:::
![QQ screenshots20191228225755.png](https://i.loli.net/2019/12/28/YfydjNwxLZvcFgi.png)

> In the future, if you need to encapsulate data into an object, you should use factory mode to instance a class and then traverse the data to add the object to the initialization array

Create song class
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
Factory mode create instance function
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
:::Warning attention
There are more than one singer here. In this case, the function is defined to return an array separating the singer data
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

Everything you've done in advance is ready. Start processing the data

```js
_normalizeSong(list){
  let ret=[]
  list.forEach((item)=>{
    ret.push(createSong(item))
  })
  return ret
}
```
~~## :mega:summary~~
~~In this way, all the encapsulation data tasks are completed. The next thing to be done is to use the data to complete the singer detail component. Come on!~~

## :Boom: detail page development
### :minidisc:singerdetail
:::warning
First, solve the problem left by the last development: Processing song data and then adding the factory object foreach to the list array will report an error, because the request data is that the asynchronous loading page will report an error as soon as the item is not rendered and there is no value
:::
**Terms of settlement：**
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
`watch`The problem of asynchronous loading can be solved by listening to the data and putting it in the proxy variable and then passing it to the sub components

After the data is solved, develop DOM
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
It's too dry to click the link to jump to the sub route. Set an entry animation
```stylus
.change-enter-active,.change-leave-active
  transition: all 0.3s
.change-enter,.change-leave-to
  //向由往左划 入场相反
  transform:translate3d(100%,0,0)
```
Therefore, the translatey setting is also used to display in the middle when the settings are loaded

Summarize the page centering techniques
:::tip
1. The width and height of the element are known, and the setting element determines the positioning and center display

```css
position:absolute;
top:50%;
left:50%;
margin-left:-50%width
margin-top:-50%height
```
2. Unknown width and height, setting element centered

```css
position:absolute;
top:50%
left:50%
transform:translate3d(-50%,-50%,0)
```
3. Vertical center with flex layout

```css
display:flex
//横轴
justify-content:center
纵轴
aligin-items:center
```
:::

### :dvd:mmusiclist
`musiclist`Include`back`icon`bg-image`background `filter`Mongolia`play-wrapper`Random play button`songlist`Song list component `loading`Loading components
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

<h3>Style writing</h3>

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

After style writing, start writing logical part
- Bgimage obtained by computed

```js
computed:{
  bgimage() {
    return `background-image:url(${this.bgimage})`
  }
}
```
- Soglist development

Paste code directly, it's relatively simple
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
- Scroll songlist settings
1. Pass value to scroll component (listenscroll: true, probetype: 3 listens for scroll event, data data)
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
2. Set songlist to scroll to a certain position and leave a small part of BG image above the picture
:::Tip implementation idea
First, we find that the image will disappear. Then, DOM method gets the height of BG image and sets the height of songlist
By listening to`scroll`Event gets the real-time location and listens`scrollY`Set the maximum offset value of and get the offset setting during monitoring`layer`You need a layer below the list of songs（`bg-layer`），When the list of songs slides up, the filter also slides up，**Cover the image below**)  And then if you get to the top(`val<translateY`)Set the height of image area to 40px

In other cases, it is similar to the previous process. In this process, the index of BG image is 0. If it is at the top, it is 10
:::
It's a little complicated. Next step by step
  - 监听scroll
  
  ```js
  scroll(pos){
    this.scrollY=pos.y
  }
  ```
  - Set the height of the picture to spread
  
  ```js
  mounted() {
    this.imageHeight=this.$refs.image.clientHeight
    //获取组件的dom 后面$el
    this.$refs.list.$el.style.top=`${this.imageHeight}px`
  }
  ```
  - Layer offset fixed by a certain amount
  
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
  - Realize the zooming effect of drop-down pictures
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
To sum up, the singer details page is developed and used. The scroll component knows the importance of index according to the height of the overlay layer. Then the most difficult component in the development is to play the component and refuel!!
  