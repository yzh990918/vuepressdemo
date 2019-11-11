---
title: 完成m-Header
lang: ZH
---
# Header组件
## 基本效果
![](./images/2019-11-11-21-12-54.png)
## 代码结构
结构代码
```js
<template>
  <div class="m-header">
    <div class="icon"></div>
    <div class="text">Magic music</div>
    <router-link tag="div"
                 class="user"
                 to="#">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>
```
样式代码
```css
.m-header
  position: relative
  height: 44px
  text-align: center
  color: $color-theme
  font-size: 0
  .icon
    display: inline-block
    vertical-align: top
    margin-top: 6px
    margin-right: 9px
    width: 30px
    height: 32px
    bg-image('logo')
    background-size: 30px 32px
  .text
    display: inline-block
    vertical-align: top
    line-height: 44px
    font-size: $font-size-large
  .user
    position: absolute
    right: 0
    top: 0
    .icon-mine
      display: block
      padding: 12px
      font-size: 20px
      color: $color-theme
```


