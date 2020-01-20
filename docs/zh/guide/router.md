---
title: 动态路由
lang: en-US
---

# 动态路由分配

## 基本用法

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 `User` 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 `vue-router` 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：

```js
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

这样就可以通过不同的 id 访问不同的路由页面

## 嵌套分配

一般情况下,通过设置路由的子路由的参数来达到嵌套分配的效果
:::tip 推荐
通常动态路由采用这种方式
:::

1. 设置路由的子路由参数,一般情况下都是设置 path(参数),component(跳转的页面)

```js
export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test,
      children: [
        {
          path: ':param',
          component: testTo
        }
      ]
    }
  ]
})
```

2. 设置完成之后，使用该路由

```js
<template>
  <listview></listview>
  <router-view></router-view>
</template>
```

3. 实现路由的跳转
   > 假设传的值是 item 的 id

```js
子组件
<dom @click="selectItem(item)"></dom>
export default{
  methods:{
    selectItem(item){
      this.$emit('select',item)
    }
  }

}
....
父组件
<componentName @select="handleselect"></componentName>
methods:{
  select(item){
    this.$router.push({
      path:`/test/${item.id}`
    })
  }

}
```

综上就可以实现路由跳转到对应的页面,参数可以调,如果学习更多，请参考[vue-router](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)
