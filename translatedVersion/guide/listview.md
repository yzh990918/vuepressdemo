---
title: 实现列表和索引表布局
lang: ZH
---
## list
- DOM structure: scroll > UL > Li > H2, UL > Li > img, name
```html
 <ul>
      <li v-for="(group,index) in data"
          :key="index"
          class="list-group">
        <h2 class="title">{{group.title}}</h2>
        <ul>
          <li v-for="(item,index) in group.items"
              :key="index"
              class="list-group-item">
            <img v-lazy="item.avatar"
                 class="avatar"
                 alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>

      </li>
    </ul>

```
- CSS Style: relative positioning of listview, defining the container as the current screen, and the corresponding list group item as a flex layout, with elements vertically centered and aligned
```stylus
.listview
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
  .list-group
    padding-bottom: 20px
    .title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .list-group-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium
```
## Index table
- First, the data in the index table needs to intercept the first string of group.title, so the array will be processed here
```js
// 计算属性中定义
 shortcutlist () {
      return this.data.map((group) => {
        // *map方法 得到一个经过处理后的数组 热门区 字母索引区 substr拿第一个字符
        return group.title.substr(0, 1)
      })
    }
```
:::tip
Array.map(callback)Method is to return a processed array,
substr(a):Take the element after the corresponding subscript
substr(a,b):Remove elements marked a-b
substring(a):Intercept the corresponding subscript element
substring(a,b):Intercept elements of A-B subscript
:::
- DOM structure

```html
<div class="list-shortcut">
      <ul>
        <li v-for="(item,index) of shortcutlist"
            :key="index"
            class="item"
            :data-index="index"
            @touchStart.stop.prevent="OnshortcutTouchstart"
            @touchStop.stop.prevent="OnshortcutTouchstop">{{item}}</li>
      </ul>

    </div>
```
- Corresponding style: 1. Vertical center 2. Absolute positioning right 3. Corresponding container style
```stylus
  .list-shortcut
    position: absolute
    z-index: 30
    right: 0
    top: 50%
    padding: 20px 0
    text-align: center
    border-radius: 10px
    transform: translateY(-50%)
    background: $color-background-d
    font-family: Helvetica
    .item
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
```
:::tip
Generally, to center a container vertically:
posiition:absolute
top:50%
margin-top:-height
But this is on the premise that we know the height of the container, and we use the transform translation method to process without knowing the height of the element
posiition:absolute
top:50%
transform:translateY(-50%)
:::

##Design sketch
![](./images/2019-11-25-23-50-55.png)








