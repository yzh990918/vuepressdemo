#  Develop recommended components (1)
This page is composed of the page of recommended songs and the page of detailed songs
## Wheel planting
- Using the third-party plug-in of Vue awesome swiper to construct the carousel chart
Wheel template
Related plug-in address [vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)
```js
<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slide-wrapper">
        <swiper :options="swiperOption"
                ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(item,index) of recommends"
                        :key="index">
            <a :href="item.linkUrl">
              <img width="100%"
                   :src="item.picUrl"
                   alt="">
            </a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"
               slot="pagination"></div>
        </swiper>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>
.....
data () {
    return {
      recommends: [],
      swiperOption: {
        // 使用轮播控制dots 轮回轮播 三秒自动跳转
        pagination: '.swiper-pagination',
        loop: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
      }

    }
```
::: warning
It's best to register globally before reusing components
:::
## Design sketch
![](./images/2019-11-13-00-03-47.png)
<br>

## Custom carousel component(slider)
**File directory**
<br/>
![](./images/2019-11-14-23-10-07.png)


> 书写自定义组件前安装好better-scroll插件 项目依赖
### Step 1. Write the basic DOM structure and style
```html
<template>
  <div class="slider"
       ref="slider">
    <div class="slider-group"
         ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span v-for="(item,index) of dots"
            :key="index"
            :class="{active:currentpageindex===index}"
            class="dots-item">
      </span>
    </div>
  </div>
</template>
```
```stylus
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
.slider
  min-height: 1px
  .slider-group
    position: relative
    overflow: hidden
    white-space: nowrap
    .slide-item
      // * 轮播图slidergroup的样式
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
  .dots
    position: absolute
    top: 130.075px
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    height: 8px
    .dots-item
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l
      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll
</style>

```
### Step 2. Define the properties of the slider component
```js
 props: {
    loop: {
      // *循环轮播
      type: Boolean,
      default: true
    },
    autoPlay: {
      // *自动轮播
      type: Boolean,
      default: true
    },
    interval: {
      // *轮播间隔
      type: Number,
      default: 3000
    }

```
### Step 3. Calculate the width of the slider and then set the width of the slidegroup according to this
```js
 _setSliderwidth (isResize) {
      this.children = this.$refs.sliderGroup.children
      // better-scroll 会多复制两份
      let width = 0
      // 拿到slide宽度
      let sliderwidth = this.$refs.slider.clientWidth
      // 计算slidegroup的宽度
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        // 添加dom样式
        addClass(child, 'slide-item')
        // child的宽度
        child.style.width = sliderwidth + 'px'
        // 总宽度
        width += sliderwidth
      }
      if (this.loop && !isResize) {
        // 循环切换 width加两倍sliderwidth
        width += 2 * sliderwidth
      }
      // 设置slider-group宽度
      this.$refs.sliderGroup.style.width = width + 'px'
    }
```
:::tip
Among them, when adding styles for children of each slider, the calling module is used

, determine whether the class exists through regular expression, and then add the class to dom.
:::
The module code dom.js is
```js
export function hasClass (el, className) {
  // todo:/(^|\\s)+(className)+(\\s|$)/
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  // 判断是否有class
  return reg.test(el.className)
}

export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  // 空白间隔开
  let newClass = el.className.split(' ')
  newClass.push(className)
  // 连接成新class
  el.className = newClass.join(' ')
}

```
### Step 4. Initialize the slider

```js
 _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        // !惯性 循环 轮播间隔 可以点击
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 300
      })
```
### Step 5. Add the dots controller below

```js
 data () {
    return {
      dots: [],
      currentpageindex: 0

    }
  },

  _initdots () {
      this.dots = new Array(this.children.length)
    }
```
### Step 6. Calculate the pattern of implementing dots with the subscript of the rotation
**Listen for the scrollend event of the slider and get the subscript**
```js
 // 获取当前下标 滚动派发scrollEnd事件 
      this.slider.on('scrollEnd', () => {
        // pageX 当前pageindex
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          // 默认第一个元素会添加拷贝 所以要减掉一
          pageIndex -= 1
        }
        this.currentpageindex = pageIndex
        if (this.autoPlay) {
          //! 轮播前必须清除 不然跳到第二章图片会stop 然后因为settimeout只执行一次 所以再执行一遍_play()
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
```
**Set active style to DOM after getting subscript**

```html
 <div class="dots">
      <span v-for="(item,index) of dots"
            :key="index"
            :class="{active:currentpageindex===index}"
            class="dots-item">
      </span>
    </div>
```
### Step 7. Add auto rotation
**Implementation of gotopage interface with better scroll**
```js
_play () {
      let pageIndex = this.currentpageindex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        // x下标 y下标 每个轮播切换动画300ms 设置时间间隔
        this.slider.goToPage(pageIndex, 0, 300)
      }, this.interval)
    }
```
:::warning
Note: at this time, when the rotation chart is rotated to the second chart, it will not continue to rotate automatically. This is because sler's autoplay has set the setTimeout function, so you must clear the timer during initialization, and then recalculate it again. You also need to monitor the window changes and recalculate the width, and pass a parameter to control recalculation
:::
```js
  if (this.autoPlay) {
          //! 轮播前必须清除 不然跳到第二章图片会stop 然后因为settimeout只执行一次 所以再执行一遍_play()
          clearTimeout(this.timer)
          this._play()
        }

....
 mounted () {
    setTimeout(() => {
      this._setSliderwidth()
      this._initdots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    // 监听到窗口发生改变就重新计算宽度
    window.addEventListener('resize', () => {
      if (!this.slider) {

      }
      this._setSliderwidth(true)
      this.slider.refresh()
    })
  },
```
:::danger
Request recommendations is an asynchronous request, which has a delay in loading resources. Therefore, before slot rendering to the parent component, recommendations may be an empty array, which will lead to style addition loss效
:::
**Resolvent**:Binding V-IF control on the parent dom of the slider component
```html
   <div v-if="recommends.length"
           class="slider-wrapper">
        <slider>
          <div v-for="(item,index) in recommends"
               :key="index">
            <a :href="item.linkUrl">
              <img :src="item.picUrl"
                   alt="">
            </a>
          </div>
        </slider>
      </div>
```
**To sum up, the slide component is finished, and it's nice to write the plug-in component by yourself, which is very conducive to the improvement of wheel building ability**
