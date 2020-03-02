# 前端基础
## css易错复习

### css选择器及权重分析

选择器:

![](https://image.yangxiansheng.top/img/QQ截图20200302165511.png?imagelist)

选择器权重计算:

![](https://image.yangxiansheng.top/img/QQ截图20200302165542.png?imagelist)

### text-align属性
  1. text-align:**justify** 两端对齐
  2. text-align属性只对块级元素起作用 行内级元素无效
  3. 这一居中显示可以用margin 0 auto 表示
### line-height属性
**行高指的是文本间基线的距离，其单位可以为px,百分比,em**
文字基线 顶线 划分
行高就是inline-box的高度,默认情况下行内元素是基于base-line对齐的
![QQ截图20200128111606.png](https://i.loli.net/2020/01/28/rxFLRVgoTkMiaYI.png)
![QQ截图20200128111201.png](https://i.loli.net/2020/01/28/8HXcyCMSEGqfh45.png)

> 图片3px问题:因为图片本身也是行内元素,也是基于基线对齐,基线距离底部会有一个间隙,所以会有留白,解决方案:`font-size:0` 或者 `vertical-align:bottom`

### vertical-align
垂直对齐方式 只作用于行内元素,块级元素设置无效

![QQ截图20200128112752.png](https://i.loli.net/2020/01/28/CcSkplZBb4UGjae.png)
:::tip
- `vertical-align:top`:垂直对齐于一行内最高的元素
- `vertical-algin:Text-top`:垂直对齐于文本顶部
- `vertical-align:middle`:对齐于文本中线
- `vertical-align:baseline`:对齐于文本基线(英文字母文本底部)
- `vertical-align:Text-bottom`:对齐于文本底部
- `vertical-align:bottom`:对齐于行内底部最低元素
:::

### word-spacing letter-spacing text-transform
> **white-space** no-wrap 不换行
> word-spacing 单词之间间隔
> letter-spacing 字母之间的间隔
> **text-transform**:capitalize(`首字母大写`)|uppercase(`字母大写`)|lowercase(`字母小写`)|none()

### text-decoration
::: warning 文本修饰
 - `underline`:下划线
 - `overline`:上划线
 - `line-through`:删除线
 - `blink`:闪烁效果
 - `none`
::: 
  

### 动态伪类
  **只有当用户交互时才显示,分为锚点伪类和用户行为伪类**

锚点伪类
> :link :visted

行为伪类
> :hover :active :focus

### CSS3新增UI元素伪类
:::tip
> **:disable**(input框的未选中的伪类) 
> **:enabled**(input框的可选中的伪类) 
> :checked(单选框或者复选框的选中伪类)
:::

### css3结构类
:::tip
- `:first-child`-第一个子元素类
- `:last-child`-最后一个子元素类
- `:nth-child(N)`-第N个子元素类

- `:nth-of-type(N)` 指定类型的第N各元素
- div:nth-of-type(2) 只匹配div的第二个元素

- `nav > a:not(last-of-type)` not选择器 表示除了最后一个a标签 其他的元素的样式
:::

### 伪元素
用于向某些选择器设置特殊样式
语法格式：Element::pseudo-element
只作用于块级元素
:::warning 伪类
- `::first-line` 块级第一行
- `::first-letter` 块级元素第一个字

- `::before`
- `::after`
这一类伪元素只能用content表示 而且都是行内元素,块级第一个元素,不是真实存在html  支持一切css样式
```css
div::before{
  content:'ABC'
}
```

- `::selection` 控制文本选中的背景色和前景色
同样也是作用于块级元素
:::


### border-radius拓展
:::tip
> border-top-left-radius 左上角弧度
> border-top-right-radius 右上角弧度
> border-bottom-right-radius 右下角弧度
> border-bottom-left-radius 左下角弧度
:::

(chrome 火狐 ie 欧朋)
:::tip 兼容性写法
border-radius 50%
-webkit-border-radius 50% 
-moz-border-radius 50%
-ms-border-radius 50%
-o-border-radius 50%
:::

**border实现三角形**

```css
.div{
  width:0;
  height:300px;
  border-bottom:30px solid red;
  border-left:30px transparent;
  border-right:30px transparent
}
```
### box-shadow
原理就是在原来的盒子下盖住一个盒子 然后控制颜色偏移 模糊
  - **属性**：
    - 水平偏移
    - 竖直偏移
    - 模糊
    - 扩展(在已有的偏移量上四条边同时增加对应值)
    - 颜色
    - 偏移种类
>举例：element的基础阴影:基础投影 **box-shadow: 0 2px 4px rgba(0, 0, 0, .12)**, **0 0 6px rgba(0, 0, 0, .04)**

![QQ截图20200128143526.png](https://i.loli.net/2020/01/28/c5gMvmeZKBkQiVl.png)


### 背景
:::tip
 - background-clip - 背景图像区域
      ```css
      <!-- 显示区域包括border区 -->
      background-clip:border-box
      <!-- 显示区域包括padding区域 -->
      background-clip:padding-box
      <!-- 显示区域只包括content区域 -->
      background-clip:content-box
      ```
      效果图:
      ![QQ截图20200128144746.png](https://i.loli.net/2020/01/28/TgizLN2Zwf5co3E.png)
  - background-origin -相对于背景偏移的初始区域
    ```css
    background-origin:border-box
    background-origin:padding-box
    background-origin:content-box

    background-image:url() no-repeat 10px 20px
    <!-- 这三个值的权重有小到大 分别对应的偏移量起点不同 背景图的位置不相同 -->
    ```
  - background-size
    ```css
    <!-- 只有一个值 第二个值默认就位auto 图片将会默认缩放 -->
    background-size:100%
    background-size:100% 100%
    <!-- 这种情况下 图片一定会按照长宽比填满容器 -->
    background-size:cover
    <!-- 这种情况下 图片将会一定完整展示 宽度100% 高度自适应 -->
    background-size:contain
    ```
  - background完整写法
    ```CSS
    <!-- background:color position size repeat origin clip attachement url -->
    
    background:#fff center 50% no-repeat content-box content-box fixed url()
    ```
:::
 
 ### 渐变
  **gradient分为线性渐变和径向渐变**
   
  **线性渐变-linear-gradient**
   - 默认的渐变方向**从上到下**
     ```css
     //从上到下有蓝色渐变到红色
    background:linear-gradient(bule,red)
    background:-webkit-linear-gradient(blue,red)
    background:-moz-linear-gradient(blue,red)
    background:-ms-linear-gradient(blue,red)
    background:-o-linear-gradient(blue,red)
    ```

  - 从左往右线性渐变写法
    ```css
    <!-- 从左往右 -->
    linear-gradient(to direction,color1,clor2...)
    -webkit-linear-gradient(begin direction,color1,color2...)
    -moz-linear-gradient(end direction,color1,color2...)
    -ms-linear-gradient(end direction,color1,color2...)

    标准写法:
    linear-gradient(to right,blue,red)
    -webkit-linear-gradient(left,blue,red)
    -moz-linear-gradient(right,blue,red)
    -ms-linear-gradient(right,blue,red)
      
    ```
  - 对角线渐变
    ```css
    <!-- 左上角到右下角渐变 -->
    linear-gradient(to right bottom,blue,right)
    <!-- chrome浏览器和其他浏览器相反 一个是定期开始位置 一个定义结束位置 -->
    -webkit-linear-gradient(left top,blue,right)
    -moz-linear-gradient(right bottom,blue,red)
    ```
  - 偏移角度渐变写法
   ![QQ截图20200128155404.png](https://i.loli.net/2020/01/28/Y1nskjZoqdlm3e5.png)

    ```css
    0 deg 从下往上
    90deg 从左往右
    180deg 从右往左
    background:linear-gradient(90deg,red 10%,orange 30%,blue 100%)
    //这种写法 百分数表示从这个数值的百分数开始想另一个颜色渐变
    10% - 30% red向orange渐变
    30% - 100% orange向blue渐变 
    ```
    :::danger
    **带有-web-kit的chrome浏览器的兼容 0deg是从左到右 然后增大角度它是轴逆时针方向,也就是走左下角**
    ```css
    -webkit-linear-gradient(0deg,red,blue)
    ```
    普通情况下  0deg是从下往上 也就是结束方向
    ```css
    linear-gradient(0deg,red,blue)
    ```
    :::

 ### text-shadow
- **属性值**:
  - 水平偏移
  - 竖直偏移
  - blur 模糊
  - color

### text-overflow
- **属性值**:
  - clip 溢出文本隐藏
  - ellipsis 显示省略号
  - string (只兼容火狐浏览器)
### 文字换行
- overflow-wrap(word-wrap) 是否保留单词
- word-break 针对多字节文字 设定保留的单位
- white-space 空白处是否断行 no-wrap

### @font-face
语法规则
```css
@font-face{
  font-family:<webfontname>
  src:<source>[<format>]
  [font-weigth:<weight>];
  [font-style:<style>]
}
```
实例:
```css
@font-face
{
font-family: myFirstFont;
src: url('Sansation_Light.ttf'),
     url('Sansation_Light.eot'); /* IE9 */
}
```
:::warning
 **Internet Explorer 9 只支持 `.eot` 类型的字体**, **Firefox, Chrome, Safari, 和 Opera 支持 `.ttf` 与`.otf` 两种类型字体**
:::

推荐引入字体通用模板
```stylus
@font-face
  font-family 'YourWebFontName'
  src url('YourWebFontName.eot'); /* IE9以上 */
  src url('YourWebFontName.eot?#iefix')format('embedded-opentype'),/*兼容IE6-IE8*/
  url('YourWebFontName.ttf')format('truetype'),/*Safari,Andriod ios*/
  url('YpurWebFontName.woff')format('wodff'),/*Mordern Browser*/
  url('YourWebFontName.svg#YourWebFontName')format('svg') /*除了ios*/
```
使用直接 font-family:YourWebFontName即可

// TODO:css动画 js基础过掉

### CSS3 2D转换
:::tip
- rotate() **平面2d旋转**
  通过角度参数对元素进行旋转 正角度为顺时针
  语法:transfrom:rotate(angle)

- translate() **平移-正方向 右 下**
> translateX()
> translateY()
> translate(X,Y)


- scale() 缩放 参数为缩放比例  **缩放时水平方向竖直方向的坐标原点在元素几何中心**
> scaleX()
> scaleY()
> scale(X,Y)

- skew() 扭曲与斜切
> skewX()  **参数正角度逆时针方向斜切**
> skewY()  x轴方向 正角度顺时针斜切

:::

### CSS3 3D转换
:::warning 
- rotate3d()
> rotateX() 对象在x轴上旋转 90deg时图片消失 正方向手掌向上弯曲
> rotateY() 在y轴旋转 向里旋转为正角度 正方向手掌想里弯曲
> rotateZ() z轴方向旋转 类似于二维方向旋转 

- translate3d()
> translate3d(X,Y,Z) 加速cpu渲染 z轴正方向指向我们

- scale3d()
:::


### Transfrom坐标系
**transfrom-origin**
  改变转换元素的位置
> 默认是元素几何中心点为基点 
> transfrom-origin: left top 围绕左上角旋转

**transfrom-style属性**
 定义指定嵌套元素是怎样在三维空间呈现
> transfrom-style: flat | preserve-3d
> perspective:number  当数值越来越大 transform的元素就会感觉越来越近

### CSS transition属性
过渡属性:
  - **transition-property**:指定过度的对象
> transition-property:none | all(默认值) | property(指定颜色 或者opacity 或者等等属性)
  - **transition-duration** :指定过渡的时间
  - **transition-timing-function** 动画类型
> linear 线性过度(匀速)
> ease 平滑过渡
> ease-in 由慢到快
> ease-out 由快到慢
> ease-in-out 慢到快到慢
> step-start 
  - **transition-delay** 指定过度的延迟时间 

:::tip 标准写法
```css
transition:<transition-propetry><transition-duration><transition-timing-function><transition-delay>
```
:::


### animation
:::tip
- animation-name 动画名称
- animation-duration 动画持续时间 默认为0 
- animmation-timing-function
  > linear 线性过渡
  > ease 平滑过渡
  > ease-in 慢到快
  > ease-out
  > ease-in-out
- animation-delay 定义动画的延迟时间
- animation-iteration-count 动画循环次数 
  > infinite 无限次数 
  > count count次数
- animation-direction 定义动画的方向
  > normal 正方向
  > reverse 反方向
  > alternate 动画现正常运行然后再反方向
  > alternate-reverse 相反

:::

:::tip 标准写法
```css
animation:name duration timing-function delay iteration-count direction fill-mode play-state
```
:::

### @keyframes 关键帧
语法:
```css
@keyframes animationname {
  keyframes-selector {
    css-styles
  }
}
```
**三个均为必写项**
- animationName
- keyframes-selector 动画持续时间百分比 0-100 from(0%) to(100%)
- css-styles 样式
:::warning 
最好添加`-webkit-animation`兼容
:::

## flex布局
**必备条件**
- flex container
- felx item
:::tip
- **flex-direction**:row(横向排列) column(纵向) row-erverse(横向颠倒) column-reverse(列颠倒)
> 如果容器的宽度和高度大于填充元素的宽高 那么reverse元素会出现**反向对齐**
- **justify-content** 横轴对齐  reverse方向会颠倒(左变成右)
  - flex-start
  - center
  - flex-end
  - space-between 平均分布(两端对齐)
  - space-around  等距离分布 (每个item两侧距离均相等)
  
![](https://i.loli.net/2020/01/31/N65lALb8uzx2cFE.png) 

- **align-items** 纵轴对齐  reverse方向会颠倒(下变成上)
  - flex-start
  - center
  - flex-end
  - stretch (在没有设置元素高度时,高度会撑满整个容器)
  - base-line (对齐元素文字的基线)

默认不会换行,宽度将会平均分布
- **flex-wrap**
  - no-wrap
  - wrap 换行元素会居中 会有间距 消除间距方法(减少容器高度)
:::

### bootstrap入门








## js 重点复习

### arguments
arguments对象只是跟数组类似,但是它并不是数组,它管理函数中的参数

```js
function fun1(){
console.log(arguments.length)
console.log(arguments[0],arguments[1])
}
fun1(11,12)
```
### push
**array.push(a)** 把值添加到末尾

### unshift
**array.unshift(a)** 向数组首部添加元素

### pop
**array.pop()** 删除最后一个值

### shift
**array.shift()** 删除第一个值

### join
**array.join(separator)** 将数组转换为一个字符串 返回结果是字符串
这个和**split(separator)**相反 split将字符串转换为数组

separator-分隔符
### reverse
**_arr.reverse()_** 颠倒数组

### sort
**arr.sort(compare(a,b)=> return a-b)** 对数组进行升序排序 打印出数组排序结果  默认是对字符串排列不是对Number排序

### concat
**array.concat(Array1,Array2)** array连接两个数组

### slice 数组
**array.slice(start,end)** **前闭后开** 返回范围元素
- start 必需 如果为负数,从数组尾部开始算起相当于(数组长度+start开始)
- end 可选 结束处下标
- 无参数 将数组拷贝一个副本

### splice
参数起始位置必须告诉 然后就是个数(0 不动 1删除一个)
插入比较特殊(插入需要告诉的index是插入元素的index+1，count为0,val为插入元素的值)
:::tip
- 删除
array.splice(index,count)  参数为删除元素索引开始,删除个数

```js
let array=['a','b','c']
array.splice(1,1)
// ['a','c']
```
- 插入
array.splice(index,0,val)

```js
let array=['a','b','c']
// 向b后面插入x，y 插入index等于元素index+1
array.splice(2,0,'x','y')
//['a','b','x','y','c']
``` 
- 替换
array.splice(index,count,val)

```js
// 将 b c 替换成x y
array.splice(1,2,'x','y')
```
// 先删除 在替换
:::

### indexOf
**array.indexOf(val)** 返回val的下标
实例：

```js
 for (let i in this.cities) {
    // 实现搜索功能 ：循环这个数组的前提下  遍历循环'A''B'...里面的数据 再对keyword搜索下标为止 然后向空数组添加元素
    this.cities[i].forEach((value) => {
      if (value.spell.indexOf(this.keyword) > -1 ||
        value.name.indexOf(this.keyword) > -1) {
        result.push(value)
      }
    })
  }
```

### lastIndexOf
**array.lastIndexOf(val)** 从数组末尾查找下标 

### charAt
**stringObject.charAt(index)** 返回字符串index位置的字符

### substring
**array.substring(start,end)** 语法和slice()一样
:::warning
最后一个参数省略，截取到末尾
slice() 里面的参数为负数的话,截取从(字符串长度+负数)索引开始取值
substring() 里面的参数为负数的话,参数自动转化为0
:::

```js
let str="hello world"
str.slice(-1)
//ld
str.substring(-4)
// 转为零 hello world
str.substring(2,-5)
// 自动转为(0,2) he
```

### toUpperCase toLowerCase
把字符串转换为大写 小写

### Math
- min(num1,num2...)
- max(num1,num2...)
- ceil(num) 向上取整(原数189.9 返回190)
- floor(num) 向下取整(原数189.9 返回189)
- abs(num) 取绝对值
- random() 返回0到1的随机数 
**求n到m之间的随机整数: Math.floor(Math.random()*(m-n+1)+n)**

### date
new Date() 返回日期时间对象

:::tip
- date对象.getFullYear() 返回4位数的年份
- date对象.getMonth() 返回日期月份 返回值0-11
- date对象.getDate() 返回当前月份中的天数
- date对象.getDay() 返回星期 0-6
- date对象.getHours() 返回小时
- date对象.getMinutes() 分
- date对象.getSeconds 秒
:::


### js事件
<h3>事件定义</h3>

- dom上绑定事件,函数实现
- 直接获取dom.事件=函数
- dom.addEventListener('事件名',function())

<h3>移除事件</h3>

**element.removeEventListener('s事件',functiion)**

:::warning
**匿名函数(function(){})无法解除**
:::

IE浏览器不支持捕获事件 所以添加事件有点不一样

:::tip
添加事件监听
> element.attachEvent(event,function)
移除事件
>element.detachEvent(event,function)
:::


### 事件冒泡
> child添加事件，会向dom结构上层冒泡添加事件，parent body html会被添加事件

### event对象
::: danger 重要
function(event)
属性：
- event.type 事件类型
- event.taget 事件源的dom  IE浏览器:srcElement
- event.preventDefault 阻止默认行为(a标签的默认行为是跳转 a标签跳转就是默认行为)  IE浏览器:returnValue 
- event.stopPropagation() 阻止事件冒泡 IE浏览器:cancelBubble
- event.clientY  pageY  screenY

**clientY:浏览器顶部底边到鼠标的位置**
**pageY:浏览器顶部底边到鼠标的位置**
**screenY: 屏幕最顶边到鼠标位置**
:::

:::tip
**client page screen offset区别**
- client是相对于浏览器顶部底边 也就是可视区域的顶部开始计算

![QQ截图20200130113851.png](https://i.loli.net/2020/01/30/STqodEtYpjZk2Iy.png)
- page 跟client一样 代表触摸点在视口区域的 x y坐标
- screen 这个相对于整个屏幕而言

![QQ截图20200130114127.png](https://i.loli.net/2020/01/30/es5T7O4XMn6jJAp.png)
- offset 相对于事件源本身的触碰点位置 

![QQ截图20200130114301.png](https://i.loli.net/2020/01/30/MvFRCHIDuWzUPo9.png)
:::

### 常用事件类型

常用事件类型| 具体 
---------|-------------------
 onclick | 点击 | 
 onfocus | 获得焦点 | 
 onblur | 失去焦点 |
 onmouseover | 鼠标移到元素 |
 onmouseout | 鼠标移除某元素 |
 onmousedown | 鼠标按钮被按下 |
onmousemove | 鼠标按键被移动 |
onmouseup | 鼠标按键被松开 |

<h3>移动端常用事件</h3>

:::tip
- touchstart 手指触碰屏幕触发
- touchmove 手指在屏幕上滑动触发
- touchend 手指移开触发

touch事件的函数
```js
function(e){

}
- e.touches 记录触摸屏幕的触摸点信息数组
- e.changedTouches 只保存手指移动引起事件的信息
- e.tagetTouches 只保存函放在元素上的触摸信息
```
:::

// todo:js面向对象 正则表达式复习 案例实现 json ajax 登陆注册实现 小程序入门 mpvue实现书城 纯正商务 uniapp新鲜事板块 过程中烦躁就做在东理开发



