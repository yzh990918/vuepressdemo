---
title: loading组件开发
lang: ZH
---
## 加载条
很简单,直接贴代码
```vue
<template>
  <div class="loading">
    <img width="24"
         height="24"
         src="./loading.gif"
         alt="">
    <p class="desc">正在载入中...</p>
  </div>
</template>

<script>

export default {
  name: '',
  data () {
    return {

    }
  },


}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
.loading
  width: 100%
  text-align: center
  .desc
    line-height: 20px
    font-size: $font-size-small
    color: $color-text-l
</style>

......
 <div class="loading-wrapper"
           v-show="!recommendsList.length">
        <loading></loading>
      </div>

  .loading-wrapper
    // ! 加载loading 居中显示
    position: absolute
    width: 100%
    top: 50%
```

