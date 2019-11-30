---
title: tab组件开发
lang: ZH
---
# Tab组件
### 功能介绍
实现路由(推荐-歌手-排行-搜索)的切换 并且添加基本样式
<br>
代码很简单 所以直接贴
```vue
<!-- router-link 组成的tab栏 -->
<template>
  <div class="tab">
    <router-link tag="div"
                 class="tab-item"
                 to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div"
                 class="tab-item"
                 to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div"
                 class="tab-item"
                 to="/rank">
      <span class="tab-link">排行
      </span>
    </router-link>
    <router-link tag="div"
                 class="tab-item"
                 to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'tab',
  props: [''],
  data () {
    return {

    }
  },

  components: {},

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {},

  watch: {}

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
.tab
  display: flex
  height: 44px
  line-height: 44px
  font-size: $font-size-medium
  /* flex布局使得不管屏幕大小如何 四个tab都平均分布 */
  .tab-item
    flex: 1
    text-align: center
    .tab-link
      padding-bottom: 5px
      color: $color-text-l
    &.router-link-active
      .tab-link
        color: $color-theme
        border-bottom: 2px solid $color-theme
</style>

```
::: tip
点击路由时显示的样式  vue自动会给路由链接套上一个router-link-active的class，所以只需要给这个选择器下的span添加样式即可 还要实现一个下边框哦
:::
