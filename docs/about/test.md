# 纯正商务应用小程序笔录(原生)

## 全局配置
::: tip
- pages 页面展示配置
```json
"pages/index/index"
```
- window
  - navigationBarBackgroundColor 导航栏背景颜色
  - navigationBarTextStyle 导航栏标题颜色(支持`black`/`white`)
  - navigationBarTitleText 导航栏标题
  - navigationStyle 导航栏样式 (`default`/`custom`) 就算是custom也不能消除右上角胶囊按钮
  - backgroundColor 上拉或者下拉出现得空白区域颜色 背景色
  - enablePullDownRefresh: 开启下拉刷新
:::
## 页面配置
在page页面下的json文件里面配置navigation会覆盖掉全局app.json下的配置
```json
{
  "navigationBarBackgroundColor": "#ffffff",
  "navigationBarTextStyle": "black",
  "navigationBarTitleText": "微信接口功能演示",
  "backgroundColor": "#eeeeee",
  "backgroundTextStyle": "light"
}
```

## 注册
注册小程序 每个小程序都要在app.js中调用App方法注册实例

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
注册页面 每个页面都要在对应的js文件里面进行注册,指定页面的初始数
据,生命周期回调,方法等

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

## 路由
::: tip
- 初始化 
触发 - 小程序初始化页面
路由前页面- 空
路由后页面- 在onLoad() onShow()里面触发

- 打开新页面
调用API `wx.navigateTo`
或者
使用组件`<navigator open-type="navigateTo"/>`
路由前页面- onHide
路由后页面- 在onLoad() onShow()里面触发

- 页面重定向
调用API `wx.redirectTo`
或者 
使用组件`<navigator open-type="redirectTo"/>`
路由前页面- onUnload
路由后页面- 在onLoad() onShow()里面触发

- 页面返回
调用API `wx.navigateBack`
或者
使用组件`<navigator open-type="navigateBack"/>`
路由前页面- onUnload
路由后页面- 在onShow()里面触发

- Tab切换
调用API `wx.switchTab`
组件 `<navigator open-type="switchTab"/>`

- 重启
调用API `wx.reLaunch`
组件 `<navigate open-type="reLaunch"/>`
:::

实例代码
```wxml
<!-- sample.wxml -->
<view class="btn-area">
  <navigator url="/page/navigate/navigate?title=navigate" hover-class="navigator-hover">跳转到新页面</navigator>
  <navigator url="../../redirect/redirect/redirect?title=redirect" open-type="redirect" hover-class="other-navigator-hover">在当前页打开</navigator>
  <navigator url="/page/index/index" open-type="switchTab" hover-class="other-navigator-hover">切换 Tab</navigator>
  <navigator target="miniProgram" open-type="navigate" app-id="" path="" extra-data="" version="release">打开绑定的小程序</navigator>
</view>
```

## 模块化
支持ES6模块化引入,类似于vue

