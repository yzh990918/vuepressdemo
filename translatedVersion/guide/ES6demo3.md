---
title: ES6巩固（三)数值扩展应用
tags:
    -javascript
    -ES6
categories:
        -前端    
        -ES6
---
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191019145036964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjc2OTU2MQ==,size_16,color_FFFFFF,t_70)
<!--more-->
# Numerical expansion
##### 1.Binary representation starts with 0b

```javascript
console.log('B', 0B111110111);//494
```
##### 2.Octal notation starts with 0o

```javascript
  console.log(0o767);//503
```
##### 3.Judge whether a number is full or whether it is a character

```javascript
    console.log('15', Number.isFinite(15));
    // isFinite() 判断数值是否有尽
    console.log('NaN', Number.isFinite(NaN));//false
    console.log('1/0', Number.isFinite('true' / 0));//false
    console.log('NaN', Number.isNaN(NaN));//true
    // isNaN() 判断是否是字符
    console.log('0', Number.isNaN(0));//false
```
##### 4.Determine whether a number is an integer isinteger ()

```javascript
    console.log('25', Number.isInteger(25));//true
    console.log('25.0', Number.isInteger(25.0));//true
    console.log('25.1', Number.isInteger(25.1));//false
    console.log('25.1', Number.isInteger('25'));//true
```
##### 5.Judge the value limit of integer

```javascript
  // 表示数的一个最大上限：MAX_SAFE_INTEGER
    console.log(Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    console.log('10', Number.isSafeInteger(10));//true
    // isSafeInteger() 判断是否在整数的取值范围
    console.log('a', Number.isSafeInteger('a'));//false
```
##### 6.Returns the integer math. Trunc() rounded down

```javascript
 // Math.trunk() 返回整数 向下取整
    console.log(4.1, Math.trunc(4.1));//4
    console.log(4.9, Math.trunc(4.9));//4
```
##### 7.Positive and negative judgment number

```javascript
  // 判断是否为 正 负 零
    console.log('-5', Math.sign(-5));//-2
    console.log('0', Math.sign(0));//0
    console.log('5', Math.sign(5));//1
    console.log('50', Math.sign('50'));//1
    console.log('foo', Math.sign('foo'));//undefined
```
