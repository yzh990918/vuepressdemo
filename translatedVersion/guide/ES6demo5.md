---
title: ES6巩固（五)simbol详解
tags:
    -javascript
    -ES6
categories:
        -前端    
        -ES6
---
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191019145036964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjc2OTU2MQ==,size_16,color_FFFFFF,t_70)
<!--more-->
# Symbol detailed explanation
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191019145511919.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjc2OTU2MQ==,size_16,color_FFFFFF,t_70)
#### Simplest symbol instance

```javascript
    // 声明
    //   let a3=Symbol();
    let a1 = Symbol();
    let a2 = Symbol();
    //   用symobl声明的对象永远是独一无二的
    console.log(a1 === a2);//false
    
    //重要！！   symobl.for()  给变量设置一个key值 唯一标识符
    let a3 = Symbol.for('a3');
    let a4 = Symbol.for('a3');
    console.log(a3 === a4);//true
```
#### Simple use of symbol

```javascript
let a1 = Symbol.for('abc');
    let obj = {
        // [a1]:  而不写成'abc' 为了避免key复用冲突
        [a1]: '123',
        'abc': 345,
        'c': 456
    };
    console.log('obj', obj);
    // symbol对象 无法通过普通遍历访问！！
    for (let [key, value] of Object.entries(obj)) {
        console.log('let of', key, value);//打印不出symbol对象属性
    }

    // getOwnPropertySymbols 返回对象中symbol的值 并且遍历 返回值为数组
    Object.getOwnPropertySymbols(obj).forEach(function(item) {
        console.log(obj[item]);
    })

    // 返回所有属性的值 遍历 包括symbol变量
    Reflect.ownKeys(obj).forEach(function(item) {
        console.log('ownkeys', item, obj[item]);
    })
```
