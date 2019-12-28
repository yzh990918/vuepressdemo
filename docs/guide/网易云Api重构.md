---
title: Change NeteaseCloudmusicApi
lang: ZH
---
# 大更新
## :exclamation:更新APi
> 由于慕课课程里的qq音乐的数据是通过jsonp抓取的数据，经常不稳定，在经过考虑后决定全部数据来源换成网易云Api 详情请参考[网易云Api文档](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)

首先需要将所有的api里面的js数据进行修改，然后修改之前写好的组件代码

## :computer:具体修改代码
:::tip
首先修改config.js文件 更改全局的参数,定义一个网易云api的域名,还有一个成功的状态码,还有就是播放主要的参数
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
- <h2>推荐页面</h2>
:::tip 
推荐页面需要修改的地方有两块
1. `api`目录下的recommend.js 
2. recommend.vue
:::

首先recommend.js 利用axios抓取数据
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
1. dom结构里面的item元素
2. 更改抓取数据函数 
:::
**dom结构**
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
**数据获取**
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
- <h2>歌手页面</h2>
:::tip 分析
首先分析网易api热门歌手数据如下图,这些是数据将它封装成我们想要的title为A-Z排列的数据,我们这里只需要将name的首字母进行提炼 变成每个`map[key]`数组就行
:::
![QQ截图20191228223312.png](https://i.loli.net/2019/12/28/oUstZ5WJF9RALiT.png)

首先我们需要修改一下获取数据的js文件
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
修改完之后在singer.vue拿到数据 进行数据封装
>我们需要做的事情就是把歌手名的首字母提炼出来变成大写ABCD什么的 这里我们要借助pinyin这个第三方插键就可以返回一个里面有一个initial属性为首字母的数组
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
然后我们得到的数据中就会有initial这个属性，就像之前一样处理,先定义一个map对象 里面有一个区域是`hot区域`，另一部分就是常规的title按A-Z排序区域`map[key]区` 分别向里面添加Singer对象
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
处理完数据后修改listview的dom结构即可

<h2>效果图片</h2>

![QQ截图20191228225309.png](https://i.loli.net/2019/12/28/MQYpCtNjyAvaPb3.png)

