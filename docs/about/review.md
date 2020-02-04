# 前端项目布局与技巧总结(项目总结经验)

## 去哪儿

### 头部搜索框

效果图:

![QQ截图20200203155301.png](https://i.loli.net/2020/02/03/rPWJo6mgHLsEVf3.png)

```html
<div class="header">
    <div class="header-left">
      <div class="iconfont backicon">
        &#xe624;
      </div>
    </div>
    <div class="header-input"><span class="iconfont">&#xe632;</span><span class="tui">输入城市景点或游玩主题</span></div>
    <router-link to="/city">
      <div class="header-right">{{this.currentcity}}<span class="iconfont selecticon">&#xe64a;</span></div>
    </router-link>

  </div>
```
:::tip 样式解析
经典的flex布局 两端对齐,中间input自适应
:::

```stylus
.header
  display:flex
  height:$header-height
  background:$bgColor
  justify-content:space-between
  .header-left
    width 0.54rem
    .back-icon
      text-align:center
      font-size:0.4rem
  .header-input
    flex:1
    padding-left:0.2rem
    height:0.64rem
    line-height:0.64rem
    margin 0.12rem 0 0.2rem 0
    background #fff
    border-radius 0.1rem
    color #ccc
    .text
      margin-left 0.1rem
  .header-right
    //固定最小宽度 不然会撑满个右边,图标会被挤得难看
    min-width:1.24rem
    text-align:center
    color:#fff
```

### 宫格组件

效果图:

![QQ截图20200203155329.png](https://i.loli.net/2020/02/03/SGB4o1bZPcCjK3m.png)

```html
  <div class="icons">
          <div class="icon1">
            <div class="img-div">
              <img src="http://img1.qunarzz.com/piao/fusion/1803/95/f3dd6c383aeb3b02.png"
                   alt="">
            </div>
            <p>景点门票</p>
          </div>
          <div class="icon1">
            <div class="img-div">
              <img src="http://img1.qunarzz.com/piao/fusion/1803/76/eb88861d78fb9902.png"
                   alt="">
            </div>

            <p>动植物园</p>
          </div>
          <div class="icon1">
            <div class="img-div">
              <img src="http://mp-piao-admincp.qunarzz.com/mp_piao_admin_mp_piao_admin/admin/20194/3ef092d0a89ffddb7f781cda30c8ae49.png"
                   alt="">
            </div>
            <p>国庆大促</p>
          </div>
          <div class="icon1">
            <div class="img-div">
              <img src="http://img1.qunarzz.com/piao/fusion/1803/f5/c4c9d9830404e602.png"
                   alt="">
            </div>
            <p>室内娱乐</p>
          </div>
          <div class="icon1">
            <div class="img-div">
              <img src="http://img1.qunarzz.com/piao/fusion/1804/5a/13ceb38dcf262f02.png"
                   alt="">
            </div>
            <p>一日游</p>
          </div>
          <div class="icon1">
            <div class="img-div">
              <img src="http://img1.qunarzz.com/piao/fusion/1803/3e/86314b2af03b7502.png"
                   alt="">
            </div>
            <p>黄浦江游</p>
          </div>
          <div class="icon1">
            <div class="img-div">
              <img src="http://img1.qunarzz.com/piao/fusion/1803/47/c2b659e048b11602.png"
                   alt="">
            </div>
            <p>上海野生</p>
          </div>
          <div class="icon1">
            <div class="img-div">
              <img src="http://img1.qunarzz.com/piao/fusion/1803/de/f26be47a6bf02a02.png"
                   alt="">
            </div>
            <p>上海迪士尼</p>
          </div>
        </div>
```
:::tip 样式分析
先把整个icons大盒子的高度撑开 **因为是两行四列，所以可以宽高2:1撑开盒子**，然后小icon同理每个一比一(25%)撑开盒子然后利用**浮动**,每个icon占25%，里面的图标和文字利用绝对定位占位
:::

```stylus
.icons
  height:0
  padding-bottom:50%
  overflow:hidden
  margin-top :0.2rem
  .icon
    position :relative
    float:left 
    overflow:hidden
    width:25%
    height:0
    padding-bottom:25%
    .img-div
      position absolute
      top 0
      left 0
      right 0
      bottom 0.44rem
      box-sizing border-box
      padding 0.1rem
      img
        height 100%
        display block
        margin 0 auto
    p
      position:absolute
      left 0
      right 0
      bottom 0
      line-height 0.44rem
      height 0.44rem
      text-align center
      color #333333
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
```

### 热销推荐

效果图：

![QQ截图20200203155348.png](https://i.loli.net/2020/02/03/I5QxtMOGFL2msgu.png)

```html
<div>
    <div class="recommend-tittle"> 热销推荐</div>
    <ul>
      <router-link :to="'/detail/'+item.id"
                   tag="li"
                   v-for="item of relist"
                   :key="item.id"
                   class="item border-bottom">
        <div class="item-img-div">
          <img class="item-img"
               :src="item.imgurl"
               alt="">
        </div>
        <div class="item-info">
          <p class="item-title">{{item.title}}</p>
          <p class="item-desc">{{item.desc}}</p>
          <button class="item-button">查看详情</button>
        </div>
      </router-link>
    </ul>
  </div>
```
:::tip 样式分析
- 标题部分
碰到设置标题直接用line-height撑开高度 然后设置背景色即可,适当添加padding-left
- 推荐列表
典型的flex布局 左边定死宽度 右边自适应,然后desc也是一个flex垂直布局
:::

```stylus
.title
  margin-top 0.2rem
  line-height 0.8rem
  background #eee
  padding-left 0.2rem
.item
  display flex
  height 1.9rem
  overflow hidden
  .item-img
    flex 0 0 1.7rem
    wdith 1.7rem
    height 1.7rem
    padding 0.1rem
  .item-info
    flex 1
    display flex
    padding 0.1rem
    flex-direction column
    .item-title
      line-heignt 0.54rerm
      font-size 0.32rem
    .item-desc
      line-height 0.4rem
      color #ccc
      overflow hidden
      text-overflow ellipsis
      margin-top 0.1rem
    .item-button
      line-height 0.34rem
      height 0.34rem
      marigin-top 0.2rem
      background #ff9300
      padding 0.06rem
      border-radius 0.06rem
      color #fff
```

### 当前城市,热门城市区块

效果图：

![QQ截图20200203155501.png](https://i.loli.net/2020/02/03/n7twlLXBK2cFpmk.png)

```html
  <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{this.$store.state.city}}</div>
          </div>
        </div>
      </div>

      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div v-for="item of hot"
               :key="item.id"
               @click="handleCityclick(item.name)"
               class="button-wrapper">
            <div class="button">{{item.name}}</div>
          </div>
```

:::tip 样式分析
首先button容器设置padding, 然后wrapper设置左浮动 一行三个按钮就设置宽度为33.3%,这里一定要触发BFC,不然会因为wrapper没有高度,按钮会被隐藏
:::

```css
.button-list {
  padding: 0.1rem 0.6rem 0.1rem 0.1rem;
  overflow: hidden;
  // 触发BFC
}

.button-wrapper {
  width: 33.33%;
  float: left;
}
.button {
  padding: 0.1rem 0;
  text-align: center;
  margin: 0.1rem;
  border: 0.02rem solid #ccc;
  border-radius: 0.05rem;
}

```
::: warning 补充
随着屏幕滚动,会有一个渐隐渐现的导航
实现方法:监听滚动事件,然后设置opcity,提前写好导航样式,用v-show控制

```js
activated(){
  window.addEventListen("scroll",this.handleScroll)
}
handdleScroll(){
  const top = document.documentElement.scrollTop
  if(top>60){
    let opcity = top/140
    opcity = opcity > 1 ? 1:opcity
    this.opcityStyle = {opcity}
    this.showabs = false
  }else{
    this.showabs = true
  }
}
```
:::


## 外卖项目

### 商家头部布局

效果图:

![QQ截图20200203192245.png](https://i.loli.net/2020/02/03/P4Es2nDtgM3Tzuo.png)

```html
 <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="s-description">{{
            seller.supports[0].description
          }}</span>
        </div>
      </div>
      <div @click="showDetail" v-if="seller.supports" class="support-count">
        <span class="count"> {{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div @click="showDetail" class="bulletin-wrapper">
      <span class="b-title"></span
      ><span class="b-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img width="100%" height="100%" :src="seller.avatar" alt="" />
    </div>
    <transition name="fade">
      <div v-show="detailshow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li
                class="support-item"
                v-for="(item, index) of seller.supports"
                :key="index"
              >
                <span
                  class="icon"
                  :class="classMap[seller.supports[index].type]"
                ></span>
                <span class="text">{{
                  seller.supports[index].description
                }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div @click="hideDetail" class="detail-close">
          <div class="icon-close"></div>
        </div>
      </div>
    </transition>
  </div>
```
::: warning 样式详细分析
容器大概分为:
- header- 设置一个透明背景,设置为相对定位
    - content-wrapper(上层内容区)-给一个padding,然后消除掉文字空白
      - avatar
      - content- 关于顶部对齐(`display inline-block vertical-align top`)
        - title- brand(设置背景图) name(顶部对齐 设置文本)
        - desc 
        - support- 图标显示背景图 desc 一样文本顶部对齐
      - support-count 绝对定位,设置高度,行高,居中,背景色
    - bulletin-wrapper-通知栏,相对定位,设置高度行高和padding,文本溢出省略再加背景 
      - title-顶部对齐,span就行级块状,背景图
      - text- 顶部对齐 
      - icon- 绝对定位 设置字体大小
    - background-绝对定位 铺满整个content-wrapper(自动撑开),设置高斯模糊效果(**filter**:blur(10px))
    - detail-通过v-show控制显示隐藏,显示渐隐渐现效果,布局为经典的**sticky-footer布局**
      - name
      - star-wrapper
      - title(flex布局,两边的line都给设置一个border-bottom,自适应,中间的text设置padding居中)
      - supports-居中,宽度占80%
:::

1. 设置背景图技巧(适配不同的屏幕)

通过@media(min-device-pixel-ratio:) 选择二倍屏还是三倍屏
```stylus
bg-img($url)
  background:url($url+'@2x.png')//适配2x像素点
@media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
  background:url($url+'@3x.ong')
```
屏幕铺满盒子效果写法
```stylus
.background
  width 30px
  height 18px
  bg-img('brand')
  background-size 30px 18px
  background-repeat no-repeat
```
2. 设置背景图高斯模糊效果
> filter:blur(apx)

3. sticky-footer布局(不知道容器高度时要将一个区块永远固定在容器的底部位置)

:::tip 实现方法
1. flex布局实现

```stylus
.wrpper
  display flex
  flex-flow column
  min-height 100%
  .content
    flex 1
  .footer
    flex 0
```

2. 负margin布局方式实现(常用)

首先定义好三个容器

```html
<div class="detail-wrapper">
<div class="detail-main"></div>
</div>
<div class="detail-close"></div>
```
通过设置detail容器min-height:100%，然后需要**清除浮动**,之后设置内容的padding-bottom为下面footer撑开高度,这时只需要设置footer的负margin向上移动盒子就能够完成布局,清除浮动
:::

效果图:

![QQ截图20200203192321.png](https://i.loli.net/2020/02/03/7FGz14YQABwkRyI.png)

3. 清除浮动常用写法,可定义全局样式函数

```stylus
.clearfix
  display:inline-block
  &:after
    display:block
    clear:both
    height:0
    inline-height:0
    visibility:hidden
```
<h3>参考完整代码</h3>

```stylus
.header
  color: #fff
  position: relative
  overflow: hidden
  // 设置样板透明度
  background: rgba(7, 17, 27, 0.5)
  .content-wrapper
    padding: 24px 12px 18px 24px
    font-size: 0px
    .avatar
      // vertical-align: top
      display: inline-block
      img
        border-radius: 2px
    .content
      vertical-align: top
      display: inline-block
      margin-left: 16px
      .title
        margin: 2px 0 8px 0
        .brand
          vertical-align: top
          // 顶部对齐
          display: inline-block
          // sapn标签没内容不占据空间
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          line-height: 18px
          font-weight: bold
      .description
        font-size: 12px
        line-height: 12px
        margin-bottom: 10px
      .support
        .icon
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 4px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .s-description
          vertical-align: top
          line-height: 12px
          font-size: 12px
    .support-count
      position: absolute
      right: 12px
      bottom: 42px
      padding: 0 8px
      height: 24px
      line-height: 24px
      border-radius: 14px
      background-color: rgba(0, 0, 0, 0.2)
      text-align: center
      .count
        vertical-align: top
        font-size: 10px
      .icon-keyboard_arrow_right
        margin-left: 2px
        font-size: 10px
        line-height: 24px
  .bulletin-wrapper
    // font-size: 0
    // 消除span之间的空白间隙
    position: relative
    height: 28px
    line-height: 28px
    padding: 0 22px 0 12px
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    background: rgba(7, 17, 27, 0.2)
    .b-title
      vertical-align: top
      display: inline-block
      width: 22px
      height: 12px
      bg-image('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
      margin-top: 8px
    .b-text
      vertical-align: top
      margin: 0 4px
      font-size: 10px
    .icon-keyboard_arrow_right
      position: absolute
      font-size: 10px
      top: 10px
      right: 12px
  .background
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
    // 设置高斯模糊
  .detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    background: rgba(7, 17, 27, 0.8)
    opacity: 1
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
    .detail-wrapper
      min-height: 100%
      width: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          line-height: 16px
          text-align: center
          font-size: 16px
          font-weight: 700
        .star-wrapper
          margin-top: 18px
          padding: 2px 0
          text-align: center
        .title
          display: flex
          width: 80%
          margin: 28px auto 24px auto
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          .text
            padding: 0 12px
            font-size: 14px
            font-weight: 700
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            padding: 0 12px
            margin-bottom: 12px
            font-size: 0
            &:last-child
              margin-bottom: 0
            .icon
              display: inline-block
              width: 16px
              height: 16px
              vertical-align: top
              margin-right: 6px
              background-size: 16px 16px
              background-repeat: no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2')
              &.invoice
                bg-image('invoice_2')
              &.special
                bg-image('special_2')
            .text
              font-size: 12px
              line-height: 16px
        .bulletin
          width: 80%
          margin: 0 auto
          .content
            padding: 0 12px
            line-height: 24px
            font-size: 12px
    .detail-close
      position: relative
      width: 32px
      height: 32px
      margin: -64px auto
      clear: both
      font-size: 32px
```

### 挑选商品列表常用布局

效果图:

![QQ截图20200203192304.png](https://i.loli.net/2020/02/03/XmItvy4fRVNMOLJ.png)

//todo: 白天学习mpvue和小程序开发 晚上整理文档 空闲时间复习知识点 最晚晚上十二点
