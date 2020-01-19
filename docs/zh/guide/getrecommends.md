---
title: use jsonp
lang: ZH
---
# 运用jsonp
## 封装jsonp
运用ES6 返回**promise**对象 在回调中获取内容
<br>

**拼接url**
![](./images/jsonp.png)
## 设置公共配置
定义好公共的参数 和options和一个常量
![](./images/code1.png)
## 调用json函数
获取到**url** **data** **callback** 三个参数 
然后抓取数据
![](./images/code2.png)
## recommend组件使用
::: tip
使用api抓取前 定义好数组对象 方便ref操作
:::
```js
  created () {
    this._getcommend()
  },

  methods: {
    _getcommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.slider)
          this.recommends = res.data.slider
        }
      })
    }
  },
```
