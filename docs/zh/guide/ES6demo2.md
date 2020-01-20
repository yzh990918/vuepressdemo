---
title: ES6巩固（二)解构赋值
tags:
    -javascript
    -ES6
categories:
        -前端    
        -ES6
---
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191017121754579.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjc2OTU2MQ==,size_16,color_FFFFFF,t_70)<!--more-->
# 解构赋值用法详解


## 数组解构
**简单的解构数组**
```javascript
{
  let a,b,rest;
  [a,b]=[1,2];
  console.log(a,b);
}//1,2
```
**剩余运算符的应用**

```javascript
{
  let a,b,rest;
  [a,b,...rest]=[1,2,3,4,5]
  console.log(a,b,rest);
}//1,2,[3,4,5]
```
**如果配对不完全 可以设置默认值**

```javascript
{
  let a, b, c, rest;
  [a, b, c = 3] = [1, 2];
  console.log(a, b, c); 
}//1,2,3 如果没有给c赋值 则为undefined
```
**应用场景 交换数值（比普通的要用中间变量简便的多）**

```javascript
{
  let a = 1;
  let b = 2;
  [a, b] = [b, a];
  console.log(a, b);
} //2 1
```
## 函数解构
**将函数返回值赋给变量**

```javascript
{
  function f() {
    return [1, 2];
  }
  let a, b;
  [a, b] = f();
  console.log(a, b);
} // 1 2
```
**选择性接收变量**

```javascript
{
  function f(){
    return [1,2,3,4,5]
  }
  let a,b,c;
  [a,,,b]=f();
  console.log(a,b);
}//1 4
```
**数组长度未知时 返回第一个数值 剩余结构为数组**

```javascript
  function f(){
    return [1,2,3,4,5]
  }
  let a,b,c;
  [a,,...b]=f();
  console.log(a,b);
}//1,[3,4,5]
```
## 对象解构
**简单对象解构**

```javascript
{
  let a,b;
  ({a,b}={a:1,b:2})
  console.log(a,b);
}//1 2
//另一种写法
{
  let p={a:1,b:2};
  let {a,b}=p;
  console.log(a,b);
}// 1 2
```
**设置默认值**

```javascript
{
let {a=10,b=5}={a=3}
console.log(a,b)
}//3 5
```
**模仿json文件解构**

```javascript
{
  let metaData={
    title:'abc',
    test:[{
      title:'test',
      desc:'description'
    }]
  }
let {title:estitle,test[{title:cdtitle}]}=metaData;
  console.log(esTitle,cnTitle);
}//abc test

```
## 字符串解构

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o
```
## 数值与布尔类型解构

```javascript
let { toString: s } = 123;
console.log(s === Number.prototype.toString); // true
//1.先将123转为对象 new Number(123)
//2.Nummber对象有toString方法，解构成功
let { toString: x } = true;
console.log(x === Boolean.prototype.toString);// true
```
