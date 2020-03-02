---
title: Change NeteaseCloudmusicApi
lang: ZH
---
# Big update
## :exclamation:update APi 
> Because the data of QQ music in MOOC course is captured by jsonp, it is often unstable. After consideration, it is decided to change all data sources to Netease cloud API. For details, please refer to[Netease cloud API document](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)

First, you need to modify the JS data in all APIs, and then modify the component code written before

## :computer:Specific modification code
:::tip
First, modify the config.js file to change the global parameters, define a Netease cloud API domain name, a successful status code, and play the main parameters
:::
config.js
```js
export const HOST = 'http://120.79.162.149:3000'
export const ERR_OK = 200
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2
}

```
- <h2>Recommended pages</h2>
:::tip 
There are two parts of the recommended page that need to be modified
1. `api`Directory recommend.js 
2. recommend.vue
:::

First recommended.js uses Axios to grab data
```js
import { HOST } from '../common/js/newapi'
import axios from 'axios'

export function getBanner () {
  const url = HOST + '/banner'
  return axios.get(url)
}
export function getRecommendlist () {
  const url = HOST + '/personalized?limit=200'
  return axios.get(url)
}

```
recommend.vue
:::warning
1. Item element in DOM structure
2. Change grab data function
:::
**DOM structure**
```vue
<slider>
<div v-for="(item,index) in banner"
      :key="index">
  <a :href="item.url">
    <!-- 添加needsclcik 阻止冲突 -->
    <img class="needsclick"
          width="100%"
          @load="loadimage"
          :src="item.picUrl"
          alt="">
  </a>
</div>
</slider>
```
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
                     v-lazy="item.picUrl"
                     alt="">
              </div>
              <div class="text">
                <h2 class="name"
                    v-html="item.name"></h2>
                <p class="desc"
                   v-html="item.copywriter"></p>
              </div>
            </li>
          </ul>
        </div>

```
**Data acquisition**
```js

  methods: {
    _getcommend () {
      getBanner().then((res) => {
        this.banner = res.data.banners
        // console.log(res.data.banners)
      })
      setTimeout(() => {
        getRecommendlist().then((res) => {
          this.recommendsList = res.data.result
          console.log(this.recommendsList)
        }

        )
      }, 1500)
    },

```
- <h2>Singer page</h2>
:::Tip analysis
First of all, analyze the data of popular singers in Netease API, as shown in the figure below. These are the data that we want to encapsulate into the data arranged by Title A-Z. here we just need to refine the initial of name into each 'map [key]' array
:::
![QQ screenshots20191228223312.png](https://i.loli.net/2019/12/28/oUstZ5WJF9RALiT.png)

First, we need to modify the JS file to get the data
```js
import axios from 'axios'
import {HOST} from '../common/js/newapi'
export function getSingers () {
  const url = HOST + '/top/artists?limit=300'
  return axios.get(url)
}
export function getSingerDetail (singerId) {
  const url = HOST + `/artists?id=${singerId}`
  return axios.get(url)
}
export function getMusic (musicId) {
  const url = HOST + `/music/url?id=${musicId}`
  return axios.get(url)
}

```
After the modification, get the data at singer.vue for data encapsulation
>What we need to do is extract the initial of the singer's name and turn it into a capital ABCD or something. Here, we can return an array with an initial attribute in it with the help of Pinyin, a third-party key
```js
const pinyin=require('pinyin')
getSinger().then(res=>{
  let s=res.data.artists
  // map方法就可以完成操作  返回一个处理完的数组
  s.map((item)=>{
    let py=pinyin(item.name[0],{
      style:pinyin.STYLE_FIRST_LETTER
    })
    item.initial=py[0][0].toUpperCase()
  })
})
```
Then the data we get will have the attribute of initial, which will be processed as before. First, define a map object that has a region of 'hot region', and the other part is the regular title, sort the region by A-Z, map [key] region, and add a single object to it
```js
 _normallizeSinger (list) {
      let map = {
        hot: {
          title: '热门',
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < 10) {
          map.hot.items.push(
            new Singer({
              // todo 热门区歌手对象
              id: item.id,
              name: item.name,
              avatar: item.img1v1Url,
              aliaName: item.alias.join(' / ')
            })
          )
        }
        // * 歌手区list 
        
         //常规区域 ：首先item.initial当成title 向items添加Singer对象
        const key = item.initial
        if (!map[key]) {
          map[key] = {
            // todo map[key]：A.B.C...区块 如果没有key就生成一个list对象 往每个map[key]里面push Singer对象
            title: key,
            items: []
          }
        }
        map[key].items.push(
          new Singer({
            // todo 热门区歌手对象
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
            aliaName: item.alias[0]
          })
        )
      })
      // !获取有序列表 通过封装的对象遍历后是无序的
      let hot = []
      let singers = []
      for (let key in map) {
        let value = map[key]
        if (value.title.match(/[a-zA-Z]/)) {
          singers.push(value)
        } else if (value.title === '热门') {
          hot.push(value)
        }
      }
      singers.sort((a, b) => {
        //! charCodeAt 将下标转化为UniCode编码 然后比较二者之间大小进行排序
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(singers)
    }
```
After processing the data, modify the DOM structure of listview

<h2>Effect picture</h2>

![QQ screenshots20191228225309.png](https://i.loli.net/2019/12/28/MQYpCtNjyAvaPb3.png)

