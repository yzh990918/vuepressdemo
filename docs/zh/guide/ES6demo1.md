---
title: ES6巩固（一)let const var相关用法
tags:
    -javascript
    -ES6
categories:
        -前端 
        -ES6   
---
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191019145036964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjc2OTU2MQ==,size_16,color_FFFFFF,t_70)
<!--more-->
## let 用法和var用法的区别
let声明的对象只在相应的块作用域有效 且let不能进行变量提升
```javascript
function test() {
  // 大括号内就是一个块级作用域
  for (let i = 1; i < 3; i++) {
    console.log(i);
  }
  // console.log(i); 
  // 报错:脱离了块级作用域 i is not defined 如果是var 则输出 1,2，3

  let a = 1
  // let a = 2
  // 报错:不能重复定义
}
test()
```
## const的用法
const一但赋值就不能进行改变 而且不能进行中间赋值 注意const定义的对象属性可以通过赋值的形式改变，这是因为对象属性引用类型，返回的是指针形式 指针不能改变 但是值可以
```javascript
function last() {
  const PI = 3.1415926
  // PI = 8
  // 报错:"PI" is read-only 

  // const zxc
  // zxc = 55
  // 必须赋值

  // 引用类型，返回的是指针，指针是不变的，但对象本身是可以改变的
  const k = {
    a: 1
  }
  k.b = 2

  console.log(PI, k)
}
last()
```
