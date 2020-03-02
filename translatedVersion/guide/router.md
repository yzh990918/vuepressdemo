---
title: 动态路由
lang: en-US
---

# Dynamic routing assignment

## Basic Usage
We often need to map all the routes that a pattern matches to the same component. For example, we have a `User`Component, for all users with different IDS, you need to use this component to render. Well, we can `vue-router` Dynamic segment is used in the routing path of to achieve this effect:

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

In this way, different routing pages can be accessed through different IDs

## Nested allocation

In general, nested allocation is achieved by setting parameters of sub routes of routes
:::Tip recommendation
This is usually used for dynamic routing
:::

1. Set the sub route parameters of the route. Generally, path and component are set

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

2.Use this route when setup is complete

```js
<template>
  <listview></listview>
  <router-view></router-view>
</template>
```

3. Realize the jump of route
   > Suppose the value passed is the ID of the item

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

To sum up, the route can jump to the corresponding page, and the parameters can be adjusted. If you want to learn more, please refer to[vue-router](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)
