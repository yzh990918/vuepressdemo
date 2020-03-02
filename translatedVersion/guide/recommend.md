---
title: 开发Recommend组件(二)
lang: ZH
---
## Recommended song list page
### Basic structure development data acquisition
DOM structure
```html
 <div class="recommend-list"
             ref="recommendscroll">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in recommendsList"
                :key="index"
                class="item">
              <div class="icon">
                <img width="60"
                     height="60"
                     v-lazy="item.imgurl"
                     alt="">
              </div>
              <div class="text">
                <h2 class="name"
                    v-html="item.creator.name"></h2>
                <p class="desc"
                   v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
```
:::warning
The data obtained from the recommendlist is not captured by jsonp, but by modifying the devserve agent and using Axios to send ajax data
:::
The code is as follows:

First, modify webpac-dev-config.js
```js
// !模拟数据需要引入的依赖
var express = require('express')
var axios = require('axios')
var app = express()
var apiRoutes = express.Router()
app.use('/api', apiRoutes)

  before(app) {
            app.get('api/getRecommendlist', (req, res) => {
                var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
                axios.get(url, {
                    headers: {
                        referer: 'https://c.y.qq.com/',
                        host: 'c.y.qq.com'
                    },
                    params: req.query()

                }).then((response) => {
                  // response是获取到的qq音乐
                  的response
                    res.json(response.data)
                }).catch((e) => {
                    console.log(e)
                })
            })
        }
```
Return callback to get data
```js
export function getRecommendlist () {
  const url = '/api/getRecommendlist'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
```
**CSS Style**:Using flex layout
```stylus
 .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
```
### Scroll component development
:::tip
Because the better scroll component is too command-based to use, you can build your own wheels to develop the scroll component
:::
#### 1.Defining the properties of scroll
```js
 props: {
    probeType: {
      // 监听滚动事件类型
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
```
#### 2.Initialize scroll and proxy the built-in better scroll method
```js
 methods: {
    _initscroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BSroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
    },
    enable () {
      // 启用better-scroll
      this.scroll && this.scroll.enable()
    },
    disable () {
      // 启用better-scroll
      this.scroll && this.scroll.disable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }

  },
```
:::danger
The click event of scroll conflicts with the click event of fastclick. The solution is to add a needsclick class to the parent container of DOM
:::
#### When listening to the transmitted data, recalculate the height
```js
watch: {
    data () {
      // 监听到data变化 重新refresh计算高度
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }

```

### Data lazy loading
Using the Vue lazload plug-in
```js
// 传入默认图片参数
Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})
然后直接在img标签上将:src替换为v-lazy就OK了

```
:::warning
Solve the bug: wait for the data to render the DOM before recalculating the height and wait until it is fully loaded
:::
Sample code

Add load event to image
```js
    loadimage () {
      if (!this.checkLoaded) {
        // !图片加载完 重新计算 第一张图片加载就计算高度 后面不需要重新计算
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }

```
## Realization effect
![](./images/2019-11-17-12-41-51.png)

