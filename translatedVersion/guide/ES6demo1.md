---
title: ES6 consolidate (I) let const var related usage
tags:
    -javascript
    -ES6
categories:
        -Front end
        -ES6   
---
![Insert picture description here](https://img-blog.csdnimg.cn/20191019145036964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjc2OTU2MQ==,size_16,color_FFFFFF,t_70)
<!--more-->
## The difference between let usage and VaR usage
The object declared by the let is only valid in the corresponding block scope and the let cannot be promoted
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
## Usage of const
As soon as const is assigned, it cannot be changed and cannot be assigned in the middle. Note that the object properties defined by const can be changed in the form of assignment. This is because the object property reference type returns that the pointer form pointer cannot be changed, but the value can be changed
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
