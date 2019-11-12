---
title: Building swiper
lang: Zh
---
# Recommend页面
该页面由轮播 推荐歌单页面 歌单详情页面组成
## 轮播
- 使用vue-awesome-swiper第三方插件构成轮播图
轮播模板
相关插件地址 [vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper)
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
再使用组件前  最好全局注册
:::
## 效果图
![](./images/2019-11-13-00-03-47.png)
<br>
- 自己书写轮播组件
::: tip
待完成
:::
