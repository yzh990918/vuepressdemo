# Pure business app transcript (native)

## Global configuration
::: tip
- pages Page display configuration
```json
"pages/index/index"
```
- window
  - navigationBarBackgroundColor Navigation bar background color
  - navigationBarTextStyle Navigation bar Title Color(支持`black`/`white`)
  - navigationBarTitleText Navigation bar title
  - navigationStyle Navigation bar style (`default`/`custom`) Even custom can't eliminate the capsule button in the upper right corner
  - backgroundColor Pull up or pull down the blank area color background color
  - enablePullDownRefresh: Enable pull-down refresh
:::
## Page configuration
Configuring navigation in the JSON file on the page will overwrite the configuration under global app.json
```json
{
  "navigationBarBackgroundColor": "#ffffff",
  "navigationBarTextStyle": "black",
  "navigationBarTitleText": "微信接口功能演示",
  "backgroundColor": "#eeeeee",
  "backgroundTextStyle": "light"
}
```

## register
Register small programs, each small program calls the App method registration instance in app.js.
```js
// app.js
App({
  onLaunch (options) {
    // Do something initial when launch.
  },
  onShow (options) {
    // Do something when show.
  },
  onHide () {
    // Do something when hide.
  },
  onError (msg) {
    console.log(msg)
  },
  globalData: 'I am global data'
})
```
Each page of the registration page should be registered in the corresponding JS file, specifying the initial number of pages
According to, life cycle callback, method, etc

```js
//index.js
Page({
  data: {
    text: "This is page data."
  },
  onLoad: function(options) {
    // 页面创建时执行
  },
  onShow: function() {
    // 页面出现在前台时执行
  },
  onReady: function() {
    // 页面首次渲染完毕时执行
  },
  onHide: function() {
    // 页面从前台变为后台时执行
  },
  onUnload: function() {
    // 页面销毁时执行
  },
  onPullDownRefresh: function() {
    // 触发下拉刷新时执行
  },
  onReachBottom: function() {
    // 页面触底时执行
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onPageScroll: function() {
    // 页面滚动时执行
  },
  onResize: function() {
    // 页面尺寸变化时执行
  },
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  // 事件响应函数
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
    })
  },
  // 自由数据
  customData: {
    hi: 'MINA'
  }
})
```

## Route
::: tip
- Initialization
trigger - Applet initialization page
Pre route page-empty
Post route page- Triggered in onload() onshow()

- Open a new page
Call API `wx.navigateTo`
perhaps
Use components`<navigator open-type="navigateTo"/>`
Pre route page- onHide
Post route page- Triggered in onload() onshow()

- Page redirection
Call API `wx.redirectTo`
perhaps
Use components`<navigator open-type="redirectTo"/>`
Pre route page- onUnload
Post route page - triggered in onload() onshow()

- Page return
   `wx.navigateBack`
perhaps
Use components`<navigator open-type="navigateBack"/>`
Pre route page- onUnload
Post route page- Trigger in onshow()

- Tab switching
Call API `wx.switchTab`
assembly `<navigator open-type="switchTab"/>`

- Example code
Call API `wx.reLaunch`
assembly`<navigate open-type="reLaunch"/>`
:::

Example code
```html
<!-- sample.wxml -->
<view class="btn-area">
  <navigator url="/page/navigate/navigate?title=navigate" hover-class="navigator-hover">跳转到新页面</navigator>
  <navigator url="../../redirect/redirect/redirect?title=redirect" open-type="redirect" hover-class="other-navigator-hover">在当前页打开</navigator>
  <navigator url="/page/index/index" open-type="switchTab" hover-class="other-navigator-hover">切换 Tab</navigator>
  <navigator target="miniProgram" open-type="navigate" app-id="" path="" extra-data="" version="release">打开绑定的小程序</navigator>
</view>
```

## Modularization
Support ES6 modular introduction, similar to Vue

## Little knowledge points
:::warning
- Click event: bind: tap
- Prevent event bubbling: Catch: tap
- Redirecting wx.redirectto will not return to the button again because the onload unloading hook is loaded before routing
- Import custom component mode
In the JSON file of the page

```json
{
  "usingComponents":{
    "定义的组件名"："路径"
  }
}
```
- Global app.wxss only font color can be inherited by components, but page can inherit all selectors
- display:inline-flex Eliminate the block width of the container to become adaptive, and can support flex. The disadvantage is jitter
- Properties property data
The propetes property supports defining data types, default values, and listening functions
```js
properties:{
    like:{
        type:
        value:
        observer:function(){
            //监听数据变化的回调 
        }   
    }
}
//拿到properties的数据
this.properties.like
//拿到data数据
this.data.like

//改变了数据就要
this.setData({
like:like
})
```
:::

## Visit API
Know wx.request send request

:::tip
wx.request({
})

Several parameters:
- url
- data Requested parameters
- method Type of request
- header Requested header information
- success:(res)=>{} Successful callback function requested
- fail:(res)=>{} Callback of network exception
:::

Common method: encapsulate http.js under util

http.js

```js
const baseurl=""
const appkey=:""
// 请求错误码信息定义
const tips ={
  1:'默认错误',
  1005:'content',
  ...
}
export class HTTP={
  wx.request(params){
    vat that = this
    var url = baseurl + params.url
    if(!params.method){
      params.method='GET'
    }
    wx.request({
      url:url,
      method:params.method,
      data:params.data,
      header:{
        'content-type':'application/json',
        'appkey':appkey
      },
      success:(res)=>{
        let status = res.statusCode.toString()
        if(status.startsWith('2')){
          params.success(res.data)
        }else{
          let err_or =res.data.err_code
          this._showerror_(err_or)
        }
      },
      fail:(res)=>{
        wx.showToast({
          title:'当前网络不可用',
          content:'请检查网络',
          confirmText:'确定',
          showCancle:false
        })
      }
    })
  },
  _showerror_(err_code){
    if(!err_code){
      err_or = 1
    }
    wx.showToast({
      title:tips[err_code],
      icon:'none',
      duration:2000
    })
  }
}
```
封装完全局请求之后,在页面js文件里面引入并调用
```js
import {HTTP} from '../../util/http.js'
var http = new HTTP()

onLoad(){
  http.request({
    url:'/classic/latest',
    success:(res)=>{
      console.log(res)
    }
  })
}
```


