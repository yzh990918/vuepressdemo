# Axios request data summary
## Get request
1. Get local mock data with Axios request in Vue
:::tip
Before using Axios to get the local mock data, devserver should first process the JSON request <br>
In**vue-cli3**you only need to configure it in vue.config.js (express has been integrated) [for details of vue-cli3 interface configuration, please refer to](https://github.com/251205668/restaurant/blob/master/vue.config.js)
:::
The following local data are all requests for goods.json
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
- [no parameters] next, you can use axis get to retrieve data
```js
axios.get('api/goods').then((res)=>{
console.log(res.data)
}).catch((error)=>{
  console.log(error)
})
```
- [with parameters] 
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
2. Axis get mode request online interface in Vue
:::warning
In general, online data requests are cross domain, which is usually set by setting**proxyTable**in index.js
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
Then request the interface data
## POST request
As long as cross domain problems are solved, it will be easy to handle
```js
export function getdata(){
  let param=new URLSearchParams()
  param.append('paramA','A')
  param.append('ParamB','B')
  return axios.post('/api',param)
}
```

