# Front end project layout and skill summary (project summary experience)

## Where are you going

### Header search box

Design sketch:

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
:::Tip style analysis
Classic flex layout with both ends aligned and middle input adaptive
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

### Palace component

Design sketch:
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
:::Tip style analysis
First, let's spread the height of the whole icons box **Because it's two rows and four columns, it can be wide and high. Because it's two rows and four columns, it can be wide and high 2:1 to open the box**，And then the little icons are one-to-one (25%) each, and they open the box and use it**Float**,Each icon accounts for 25%, and the icons and words in it are occupied by absolute positioning
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

### Recommended sale
Design sketch:

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
:::Tip style analysis
- Title part
When touching the setting title, directly use line height to open the height, then set the background color, and add padding left appropriately
- Recommended list
A typical flex layout has a fixed width on the left and an adaptive width on the right. Then desc is also a flex vertical layout
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

### Current city, hot city block
Design sketch:

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

:::Tip style analysis
First, the button Container Sets padding, and then the wrapper sets the left float line and three buttons to set the width to 33.3%. BFC must be triggered here, or the buttons will be hidden because the wrapper has no height
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
::: Warning supplement
As the screen scrolls, there will be a fade in navigation
Implementation method: listen to rolling events, set opcity, write navigation style in advance, and control with v-show

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


## Takeaway project

### Merchant head layout

Design sketch:

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
::: Detailed analysis of warning style
The container is roughly divided into:
- Header - set a transparent background to relative positioning
    - Content wrapper (upper content area) - give a padding, and then eliminate the text blank
      - avatar
      - content- About top alignment(`display inline-block vertical-align top`)
        - title- brand(Set background) name(Align top set text)
        - desc 
        - support- Icon display background image desc same text top alignment
      - support-count Absolute positioning, set height, row height, center, background color
    - bulletin-wrapper-Notice bar, relative positioning, setting height, line height and padding, text overflow, omitting and adding background
      - title-Top alignment, span line level block, background
      - text- Align Top
      - icon- Absolute positioning set font size
    - background-Absolute positioning covers the whole content wrapper (auto unfolding), and sets Gaussian Blur effect(**filter**:blur(10px))
    - detail-Through v-show to control the display and hide, display the fade out effect, and the layout is classic**sticky-footerlayout**
      - name
      - star-wrapper
      - title(In flex layout, the lines on both sides are set with a border bottom, adaptive, and the middle text is set with padding centered)
      - supports-Center, 80% width
:::

1. Set up background map skills (adapt to different screens)

Use @ media (min device pixel ratio:) to choose whether to double screen or triple screen
```stylus
bg-img($url)
  background:url($url+'@2x.png')//适配2x像素点
@media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
  background:url($url+'@3x.ong')
```
How to write the effect of screen covered with box
```stylus
.background
  width 30px
  height 18px
  bg-img('brand')
  background-size 30px 18px
  background-repeat no-repeat
```
2. Set Gaussian Blur effect of background image
> filter:blur(apx)

3. sticky-footer布局(When the height of the container is not known, a block should always be fixed at the bottom of the container)

:::Implementation of tip
1. Flex layout implementation

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

2. Implementation of negative margin layout (commonly used)

First define three containers

```html
<div class="detail-wrapper">
<div class="detail-main"></div>
</div>
<div class="detail-close"></div>
```
  By setting the detail container min height: 100%, you need to**Clear floating**,After that, set the padding bottom of the content to open the height of the following footer. At this time, you only need to set the negative margin of the footer to move the box up to complete the layout and clear the float
  :::

Design sketch:

![QQ截图20200203192321.png](https://i.loli.net/2020/02/03/7FGz14YQABwkRyI.png)

3. Clear floating common writing methods, and define global style functions

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
<h3>Refer to full code</h3>

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

### Select common layout of commodity list

Design sketch:

![QQ截图20200203192304.png](https://i.loli.net/2020/02/03/XmItvy4fRVNMOLJ.png)

//todo: Study mpvue in the daytime and develop small programs; organize documents in the evening; review knowledge points in spare time; 12:00 at the latest
