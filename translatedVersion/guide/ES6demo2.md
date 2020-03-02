---
title: ES6 consolidation (II) deconstruction assignment
tags:
    -javascript
    -ES6
categories:
        -Front end   
        -ES6
---
![Insert picture description here](https://img-blog.csdnimg.cn/20191017121754579.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjc2OTU2MQ==,size_16,color_FFFFFF,t_70)<!--more-->
# A detailed explanation of the usage of deconstruction and assignment


## Array deconstruction
**Simple deconstruction array**
```javascript
{
  let a,b,rest;
  [a,b]=[1,2];
  console.log(a,b);
}//1,2
```
**Application of residue operator**

```javascript
{
  let a,b,rest;
  [a,b,...rest]=[1,2,3,4,5]
  console.log(a,b,rest);
}//1,2,[3,4,5]
```
**If the pairing is not complete, the default value can be set**

```javascript
{
  let a, b, c, rest;
  [a, b, c = 3] = [1, 2];
  console.log(a, b, c); 
}//1,2,3 如果没有给c赋值 则为undefined
```
**Exchange values of application scenarios (much easier than using intermediate variables)**

```javascript
{
  let a = 1;
  let b = 2;
  [a, b] = [b, a];
  console.log(a, b);
} //2 1
```
## Function deconstruction
**Assign function return value to variable**

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
**Selective receive variable**

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
**Returns the first value when the array length is unknown. The remaining structure is array**

```javascript
  function f(){
    return [1,2,3,4,5]
  }
  let a,b,c;
  [a,,...b]=f();
  console.log(a,b);
}//1,[3,4,5]
```
## Object deconstruction
**Simple object deconstruction**

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
**Set default**

```javascript
{
let {a=10,b=5}={a=3}
console.log(a,b)
}//3 5
```
**Imitating JSON file deconstruction**

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
## String deconstruction

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o
```
## Numerical and boolean type deconstruction

```javascript
let { toString: s } = 123;
console.log(s === Number.prototype.toString); // true
//1.先将123转为对象 new Number(123)
//2.Nummber对象有toString方法，解构成功
let { toString: x } = true;
console.log(x === Boolean.prototype.toString);// true
```
