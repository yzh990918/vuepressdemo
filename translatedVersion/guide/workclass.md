# Front end Foundation
## CSS error prone review

### Text align attribute
  1. text-align:**justify** Alignment at both ends
  2. text-alignAttribute only works on block level elements invalid inline elements
  3. This center display can be represented by margin 0 Auto
### Line height property
**Line height refers to the distance between text baselines, which can be in PX, percentage, EM**
Text baseline top line division
![QQ截图20200128111606.png](https://i.loli.net/2020/01/28/rxFLRVgoTkMiaYI.png)
![QQ截图20200128111201.png](https://i.loli.net/2020/01/28/8HXcyCMSEGqfh45.png)

### vertical-align
Vertical alignment only works on inline elements, block level element settings are invalid

![QQ截图20200128112752.png](https://i.loli.net/2020/01/28/CcSkplZBb4UGjae.png)
:::tip
- `vertical-align:top`:Align vertically to the highest element in a row
- `vertical-algin:Text-top`:Align vertically to top of text
- `vertical-align:middle`:Align to text center line
- `vertical-align:baseline`:Align to text baseline (bottom of alphabetic text)
- `vertical-align:Text-bottom`:Align to bottom of text
- `vertical-align:bottom`:Align to bottom lowest element in row
:::

### word-spacing letter-spacing text-transform
> **white-space** No wrap does not wrap
> word-spacing Space between words
> letter-spacing Space between letters
> **text-transform**:capitalize(`title case`)|uppercase(`Alphabetic capitalization`)|lowercase(`Letter lowercase`)|none()

### text-decoration
::: warning Textual modification
 - `underline`:Underline
 - `overline`:Top line
 - `line-through`:Delete line
 - `blink`:Scintillation effect
 - `none`
::: 
  

### Dynamic pseudo class
  **Only when the user interacts, it can be displayed. It can be divided into anchor pseudo class and user behavior pseudo class**

Anchor pseudo class
> :link :visted

Behavior pseudo class
> :hover :active :focus

### New UI element pseudo class in CSS3
:::tip
> **:disable**(Unchecked pseudo class of input box) 
> **:enabled**(Pseudo class in optional of input box) 
> :checked(Radio box or check box selected pseudo class)
:::

### CSS3 structure class
:::tip
- `:first-child`-First child element class
- `:last-child`-Last child element class
- `:nth-child(N)`-N-th subelement class

- `:nth-of-type(N)` Element n of the specified type
- div:nth-of-type(2) Match only the second element of the div

- `nav > a:not(last-of-type)` The not selector represents the style of elements other than the last a tag
:::

### Pseudo element
Used to set a special style to some selectors
Syntax format: element:: pseudo element
Block level elements only
:::warning Pseudo class
- `::first-line` Block level first line
- `::first-letter` Block level element first word

- `::before`
- `::after`
This kind of pseudo elements can only be expressed by content and are all in-line elements. The first element at block level is not the real HTML that supports all CSS styles
```css
div::before{
  content:'ABC'
}
```

- `::selection` Controls the background and foreground colors for text selection
It also acts on block level elements
:::


### Border radius expansion
:::tip
> border-top-left-radius Top left radian
> border-top-right-radius Top right radian
> border-bottom-right-radius Lower right radian
> border-bottom-left-radius Lower left radian
:::

(cHrome Firefox ie Auburn)
:::tipCompatibility writing
border-radius 50%
-webkit-border-radius 50% 
-moz-border-radius 50%
-ms-border-radius 50%
-o-border-radius 50%
:::

### box-shadow
The principle is to cover a box under the original box and control the color offset to blur
  - **Attribute**：
    - Horizontal migration
    - Vertical migration
    - vague
    - Extension (add corresponding value to four sides at the same time on the existing offset)
    - colour
    - Offset type
>Example: basic shadow of element: basic projection **box-shadow: 0 2px 4px rgba(0, 0, 0, .12)**, **0 0 6px rgba(0, 0, 0, .04)**

![QQ截图20200128143526.png](https://i.loli.net/2020/01/28/c5gMvmeZKBkQiVl.png)


### background
:::tip
 - background-clip - Background image area
      ```css
      <!-- Display area includes border area-->
      background-clip:border-box
      <!-- Display area includes padding area -->
      background-clip:padding-box
      <!-- Display area only includes content area -->
      background-clip:content-box
      ```
      Design sketch:
      ![QQ截图20200128144746.png](https://i.loli.net/2020/01/28/TgizLN2Zwf5co3E.png)
  - background-origin -Initial area offset from background
    ```css
    background-origin:border-box
    background-origin:padding-box
    background-origin:content-box

    background-image:url() no-repeat 10px 20px
    <!-- The weights of these three values are small to large, and the offsets corresponding to them are different. The positions of different background images are different -->
    ```
  - background-size
    ```css
    <!-- There is only one value. The second value is in place by default. Auto image will be zoomed by default. The starting point of different background images is different-->
    background-size:100%
    background-size:100% 100%
    <!-- In this case, the image will surely fill the container according to the aspect ratio -->
    background-size:cover
    <!-- In this case, the picture will be fully displayed with 100% width and highly adaptive -->
    background-size:contain
    ```
  - backgroundComplete writing
    ```CSS
    <!-- background:color position size repeat origin clip attachement url -->
    
    background:#fff center 50% no-repeat content-box content-box fixed url()
    ```
:::
 
 ### Gradual change
  **Gradient is divided into linear gradient and radial gradient**
   
  **Linear gradient-linear-gradient**
   - Default gradient direction**From top to bottom**
     ```css
     //There is a blue gradient from top to bottom to red
    background:linear-gradient(bule,red)
    background:-webkit-linear-gradient(blue,red)
    background:-moz-linear-gradient(blue,red)
    background:-ms-linear-gradient(blue,red)
    background:-o-linear-gradient(blue,red)
    ```

  - Left to right linear gradient writing
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
  - Diagonal gradient
    ```css
    <!-- 左上角到右下角渐变 -->
    linear-gradient(to right bottom,blue,right)
    <!-- chrome浏览器和其他浏览器相反 一个是定期开始位置 一个定义结束位置 -->
    -webkit-linear-gradient(left top,blue,right)
    -moz-linear-gradient(right bottom,blue,red)
    ```
  - Offset angle gradient
   ![QQ截图20200128155404.png](https://i.loli.net/2020/01/28/Y1nskjZoqdlm3e5.png)

    ```css
    0 deg From bottom to top
    90deg From left to right
    180deg From right to left
    background:linear-gradient(90deg,red 10%,orange 30%,blue 100%)
    //The percentage in this way means that you want to start from the percentage of this value to another color gradient
    10% - 30% red to orange
    30% - 100% orange to blue
    ```
    :::danger
    **The compatible 0DEG of Chrome browser with web kit is from left to right and then increase the angle. It's anticlockwise, i.e. in the lower left corner**
    ```css
    -webkit-linear-gradient(0deg,red,blue)
    ```
   In general, 0DEG is from bottom to top, which is the end direction
    ```css
    linear-gradient(0deg,red,blue)
    ```
    :::

 ### text-shadow
- **Attribute value**:
  - Horizontal migration
  - Vertical migration
  - blur vague
  - color

### text-overflow
- **Attribute value**:
  - clip Overflow text hiding
  - ellipsis Show ellipsis
  - string (Firefox only)


### @font-face
Rule of grammar
```css
@font-face{
  font-family:<webfontname>
  src:<source>[<format>]
  [font-weigth:<weight>];
  [font-style:<style>]
}
```
Example:
```css
@font-face
{
font-family: myFirstFont;
src: url('Sansation_Light.ttf'),
     url('Sansation_Light.eot'); /* IE9 */
}
```
:::warning
 **Internet Explorer 9 only supports `.eot` Font of type**, **Firefox, chrome, Safari, and opera support `.ttf` 与`.otf` Two types of fonts**
:::

It is recommended to introduce general font template
```stylus
@font-face
  font-family 'YourWebFontName'
  src url('YourWebFontName.eot'); /* IE9以上 */
  src url('YourWebFontName.eot?#iefix')format('embedded-opentype'),/*兼容IE6-IE8*/
  url('YourWebFontName.ttf')format('truetype'),/*Safari,Andriod ios*/
  url('YpurWebFontName.woff')format('wodff'),/*Mordern Browser*/
  url('YourWebFontName.svg#YourWebFontName')format('svg') /*除了ios*/
```
Use direct font family: yourwebfontname

// Todo: JS foundation of CSS animation is broken

### CSS3 2D conversion
:::tip
- rotate() **Plane 2D rotation**
  Rotate the element through the angle parameter. The positive angle is clockwise
  grammar:transfrom:rotate(angle)

- translate() **Pan - positive down right**
> translateX()
> translateY()
> translate(X,Y)


- scale() Scale parameter is scale **When zooming, the coordinate origin of horizontal and vertical direction is at the geometric center of the element**
> scaleX()
> scaleY()
> scale(X,Y)

- skew() Twist and bevel
> skewX()  **Valuepoint positive angle anti clockwise chamfering**
> skewY()  X-axis positive angle clockwise oblique cutting

:::

### CSS3 3D conversion
:::warning 
- rotate3d()
> rotateX() When the object rotates 90 DEG on the x-axis, the picture disappears. The palm bends upward and bends inward
> rotateY() In the y-axis rotation direction, the rotation is positive. In the positive direction, the palms are bent inward
> rotateZ() Z-axis rotation is similar to 2D rotation

- translate3d()
> translate3d(X,Y,Z) 
加速cpu渲染 z轴正方向指向我们
Acceleration CPU rendering z-axis positive direction points to us

- scale3d()
:::


### Transfrom coordinate system
**transfrom-origin**
  Change the position of the transformation element
> The default is the geometric center point of the element as the base point
> transfrom-origin: left top Rotate around top left corner

**transfrom-style属性**
Define how nested elements are rendered in 3D
> transfrom-style: flat | preserve-3d
> perspective:number  As the values get larger, the transformed elements will feel closer

### CSS transition property
Transition properties:
  - **transition-property**:Specifying excessive objects
> transition-property:Specify the transition time none | all (default) | property (specify color or opacity or other properties)
  - **transition-duration** :Specify the time of transition
  - **transition-timing-function** Animation type
> linear Linear transition (constant speed)
> ease Smooth transition
> ease-in From slow to fast
> ease-out From fast to slow
> ease-in-out Slow to fast to slow
> step-start 
  - **transition-delay** Specify excessive delay time

:::tip standard notation
```css
transition:<transition-propetry><transition-duration><transition-timing-function><transition-delay>
```
:::


### animation
:::tip
- animation-name Animation name
- animation-duration Animation duration defaults to 0
- animmation-timing-function
  > linear Linear transition
  > ease Smooth transition
  > ease-in Slow to fast
  > ease-out
  > ease-in-out
- animation-delay Define the delay time for the animation
- animation-iteration-count Animation cycles 
  > infinite Infinite number
  > count countfrequency
- animation-direction Define the direction of the animation
  > normal Positive direction
  > reverse Negative direction
  > alternate The animation works normally and then reverses
  > alternate-reverse Contrary

:::

:::tip standard notation
```css
animation:name duration timing-function delay iteration-count direction fill-mode play-state
```
:::

### @keyframes Key frame
Syntax:
```css
@keyframes animationname {
  keyframes-selector {
    css-styles
  }
}
```
**All three are required**
- animationName
- keyframes-selector Animation duration percentage 0-100 from(0%) to(100%)
- css-styles style
:::warning 
Better add`-webkit-animation`compatible
:::

## Flex layout
**Essential condition**
- flex container
- felx item
:::tip
- **flex-direction**:Row column row server column reverse
> If the width and height of the container are greater than the width and height of the fill element, the reverse element appears**Reverse alignment**
- **justify-content** Horizontal axis alignment reverse direction will be reversed (left to right)
  - flex-start
  - center
  - flex-end
  - space-between Average distribution (justify)
  - space-around  Equidistant distribution (Align the vertical axis and reverse the direction (the lower part becomes the upper part). The distance between two sides of each item is equal)
  
![](https://i.loli.net/2020/01/31/N65lALb8uzx2cFE.png) 

- **align-items** Vertical alignment reverse direction will be reversed (down to up)
  - flex-start
  - center
  - flex-end
  - stretch (When the element height is not set, the height will fill the entire container)
  - base-line (Align baseline of element text)

No line wrapping by default, width will be evenly distributed
- **flex-wrap**
  - no-wrap
  - Wrap wrap wrap elements will be centered with spacing elimination (reduce container height)
:::







## JS review

### arguments
The arguments object is just like an array, but it is not an array. It manages the parameters in the function

```js
function fun1(){
console.log(arguments.length)
console.log(arguments[0],arguments[1])
}
fun1(11,12)
```
### push
**array.push(a)** Add value to end

### unshift
**array.unshift(a)** Adding elements to the head of an array

### pop
**array.pop()** Delete last value

### shift
**array.shift()** Delete first value

### join
**array.join(separator)** Converting an array to a string returns a string
This sum**split(separator)**Split instead converts a string to an array
separator-Separator
### reverse
**_arr.reverse()_** Inverted array

### sort
**arr.sort(compare(a,b)=> return a-b)** Sort the array in ascending order print out the array sorting result. The default is to sort the string, not the number

### concat
**array.concat(Array1,Array2)** Array joins two arrays

### slice array
**array.slice(start,end)** **Front closed rear open** Return range element
- start Required if it is a negative number, starting from the end of the array is equivalent to (array length + start)
- end Optional end subscript
- Copy an array without parameters

### splice
The starting position of the parameter must be told and then it is the number (0, 1, delete one)
Insert is special (the index to be told is index + 1 of the inserted element, count is 0, Val is the value of the inserted element)
:::tip
- delete
array.splice(index,count)  Parameter is start of deleting element index, number of deletions

```js
let array=['a','b','c']
array.splice(1,1)
// ['a','c']
```
- insert
array.splice(index,0,val)

```js
let array=['a','b','c']
// 向b后面插入x，y 插入index等于元素index+1
array.splice(2,0,'x','y')
//['a','b','x','y','c']
``` 
- replace
array.splice(index,count,val)

```js
// 将 b c 替换成x y
array.splice(1,2,'x','y')
```
// Delete before replacing
:::

### indexOf
**array.indexOf(val)** Return the subscript of Val
Example:

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
**array.lastIndexOf(val)** Find subscript from end of array

### charAt
**stringObject.charAt(index)** Returns the character in the index position of the string

### substring
**array.substring(start,end)** The syntax is the same as slice()
:::warning
Last parameter omitted, truncated to the end
slice() If the parameter is negative, the interception starts from the index (string length + negative number)
If the parameter in substring () is negative, the parameter will be automatically converted to 0
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
Convert a string to uppercase and lowercase

### Math
- min(num1,num2...)
- max(num1,num2...)
- ceil(num) Round up (original 189.9 returns 190)
- floor(num) Round down (original 189.9 returns 189)
- abs(num) Absolute value
- random() Returns a random number from 0 to 1
**Return the random integer between N and m of date time object: math. Floor (math. Random() * (m-n + 1) + n)**

### date
new Date() Return date time object

:::tip
- date对象.getFullYear() Returns a 4-digit year
- date对象.getMonth() Return date month return value 0-11
- date对象.getDate() Returns the number of days in the current month
- date对象.getDay() Back to week 0-6
- date对象.getHours() Return hour
- date对象.getMinutes() branch
- date对象.getSeconds second


:::


### JS incident
<h3>Event definition</h3>

- Binding events on DOM, function implementation
- Get DOM directly. Event = function
- Dom. Addeventlistener ('event name ', function())

<h3>Remove events</h3>

**Element. Removeeventlistener ('s event ', function)**

:::warning
**Anonymous function (function() {}) cannot be released**
:::

Ie does not support capturing events, so adding events is a little different

:::tip
Add event listening
> element.attachEvent(event,function)
Remove events
>element.detachEvent(event,function)
:::


### Event Bubbling
> Add events to child, add events to bubbles in the upper layer of DOM structure, and add events to parent body HTML

### event object
::: danger important
function(event)
Properties:
- event.type Event type
- event.taget DOM IE browser of event source: srcelement
- event.preventDefault Prevent default behavior (the default behavior of a tag is to jump a tag is the default behavior) IE browser:returnValue 
- event.stopPropagation() Prevent event bubble IE browser: cancelbubble
- event.clientY  pageY  screenY

**clientY:Browser top bottom to mouse position**
**pageY:Browser top bottom to mouse position**
**screenY: Top of screen to mouse position**
:::

:::tip
**Client page screen offset difference**
- The client is calculated relative to the bottom of the top of the browser, that is, the top of the visible area

![QQ截图20200130113851.png](https://i.loli.net/2020/01/30/STqodEtYpjZk2Iy.png)
- Page, like client, represents the X Y coordinate of the touchpoint in the viewport area
- Screen this is relative to the whole screen

![QQ截图20200130114127.png](https://i.loli.net/2020/01/30/es5T7O4XMn6jJAp.png)
- offset 相对于事件源本身的触碰点位置 

![QQ截图20200130114301.png](https://i.loli.net/2020/01/30/MvFRCHIDuWzUPo9.png)
:::

### Common event types

Common event types| specific
---------|-------------------
 onclick | click | 
 onfocus | Lose focus get focus | 
 onblur | Lose focus |
 onmouseover | Mouse over element |
 onmouseout | Remove an element with the mouse |
 onmousedown | Mouse button pressed |
onmousemove | Mouse button moved |
onmouseup | Mouse button released |

<h3>Mobile common events</h3>

:::tip
- touchstart Finger touch screen trigger
- touchmove Finger slide trigger on screen
- touchend Finger move trigger

Function of touch event
```js
function(e){

}
- e.touches 记录触摸屏幕的触摸点信息数组
- e.changedTouches 只保存手指移动引起事件的信息
- e.tagetTouches 只保存函放在元素上的触摸信息
```
:::

// todo:js面向对象 正则表达式复习 案例实现 json ajax 登陆注册实现 小程序入门 mpvue实现书城 纯正商务 uniapp新鲜事板块 过程中烦躁就做在东理开发


