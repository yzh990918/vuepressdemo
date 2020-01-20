# axios请求数据总结
## Get请求
1. 在vue中用axios请求获取本地mock数据
:::tip
使用axios获取本地mock数据前,先进行devServer处理json请求<br>
在**vue-cli3**只需要在vue.config.js里面配置即可(已经集成了express) [vue-cli3接口配置具体可参考](https://github.com/251205668/restaurant/blob/master/vue.config.js)
:::
以下本地数据都是请求goods.json
```js
// 在webpack.config.dev.js中加入依赖
const express = require('express')
const app = express()
var appData = require('../mock/goods.json')//加载本地数据文件
var apiRoutes = express.Router()
const goods=appData.goods
const seller=appData.seller
const commends=appData.commends
app.use('/api', apiRoutes)
module.export:{
  devServer:{
    before(app){
      app.get('/api/goods',(req,res)=>{
        res.json({
          errno:no,
          data:goods
        })
      }),
      ....
    }
  }
}

```
- [无参数] 接下来就可以用axios get方式调取数据
```js
axios.get('api/goods').then((res)=>{
console.log(res.data)
}).catch((error)=>{
  console.log(error)
})
```
- [有参数] 
```js
axios.get('api/goods',param:{
paramA:A,
paramB:B
}).then((res)=>{
  console.log(res.data)
}).catch((error)=>{
  console.log(error)
})
```
2. vue中axios Get方式请求在线接口
:::warning
通常情况下,请求在线数据都会跨域,一般通过设置index.js里面的**proxyTable**来设置跨域
:::
index.js
```js
proxyTable: {
  '/api': {
    target: '线上api',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''  
    }
  }
}
```
然后请求接口数据即可
## POST请求
只要解决了跨域问题,就很好办
```js
export function getdata(){
  let param=new URLSearchParams()
  param.append('paramA','A')
  param.append('ParamB','B')
  return axios.post('/api',param)
}
```

