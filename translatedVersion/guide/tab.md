---
title: Tab component development
lang: ZH
---
# Tab component development
### Function introduction
Implement routing (recommendation singer ranking search) switch and add basic style
<br>
The code is very simple, so post it directly
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
The style Vue displayed when clicking the route automatically sets a route link active class to the route link, so you only need to add a style to the span under this selector to realize a lower border
:::
