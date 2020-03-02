---
title: ES6巩固（六)promise详解
tags:
    -javascript
    -ES6
categories:
        -前端    
        -ES6
---
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191019145036964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjc2OTU2MQ==,size_16,color_FFFFFF,t_70)
<!--more-->
# Promise details
### 1.Understanding callback functions
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191019150238375.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjc2OTU2MQ==,size_16,color_FFFFFF,t_70)
#### Classic case series
```javascript
function say(value){
alert(value)
}
function execute(somefunction,value){
//回调函数say 当作参数使用
somefunction(value)
}
//调用say 这里的say就是典型的回调 callback
execute(say,'value')

```
### 2.Understanding asynchronous programming
Understand why asynchronous programming is synchronous: synchronization is everything in order
What is asynchronous: it can be executed regardless of the order
**The importance of asynchrony: imagine that any operation of a hotel is synchronous, so the hotel will come because everything is in order, and the server can only receive one customer before receiving the next customer. This efficiency is very low, so asynchronous programming is needed**

#### Simplest asynchrony

```javascript
// 异步就是不需要等待函数执行完按顺序调用  
            function a() {
                console.log('刷牙');
                setTimeout(() => {
                    console.log('洗脸');
                }, 2000)
            }

            function b() {
                console.log('喝水');
            }
            //    打印结果 刷牙 喝水 洗脸 异步不会等带a函数执行完再去执行b
            a();
            b();
```
#### Asynchronous processing callback function (Es5 writing method)

```javascript
   //模拟ajax请求
       let ajax = function(callback) {
                console.log('执行');
                setTimeout(function() {
                    callback && callback.call()
                        // 如果callback存在 则执行callback.call()
                }, 1000);

            };
            ajax(function() {
                // 这个函数就是callback  就是ajax的参数
                console.log('timeout1')

            })
```
**Asynchronously handle callback function (Es5 writing method) so that the callback can be executed after handling an operation. If there are many asynchronous operations, the code will become very complex. At this time, we need to use promise to handle it**
####  promise
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191019151259383.png)
###### Promise instance

```javascript
 // ES6写法实现上述案列
            let ajax = function() {
                console.log("执行2");
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                            resolve()
                        }, 1000)
                        // ajax返回一个promise实例 里面有then catch方法  then里面的函数体的参数就是resolve 或者是reject所对应的值 1秒钟后执行resolve 也就是then第一个参数
                })
            };
            ajax().then(function() {
                console.log('promise', "timeout")
            })

```
Ajax request
```javascript
             //  写法类似于获取ajax请求
                    getCityInfo () {
              axios.get('/api/city.json')
                .then(this.handlecityajax)
            },
            handlecityajax (res) {
              res = res.data
              if (res.ret && res.data) {
                const data = res.data
                this.cities = data.cities
                this.hotCities = data.hotCities
              }
            }
```

##### To realize the above idea a, execute B, execute C

```javascript
  // 实现执行 a 再执行b 再执行c 再执行d
            let ajax = function() {
                console.log('执行4');
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve()
                    }, 1000)
                })
            };
            ajax().then(function() {
                return new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        resolve()
                    }, 2000)
                })
            }).then(function() {
                console.log('timeout4')
            })
```
##### How to get exception if promise asynchronous operation fails

```javascript
// 抛出异常
            let ajax = function(num) {
                console.log("执行5");
                return new Promise(function(resolve, reject) {

                    if (num > 5) {
                        resolve()
                    } else {
                    //否则抛出一个异常
                        throw new Error('出错了');
                    }
                })
            };
            ajax(6).then(function() {
                console.log('log', 6);
            }).catch(function(err) {
            //打印这个异常堆栈信息
                console.log('catch', err);
            });

            ajax(3).then(function() {
                console.log('log', 3);
            }).catch(function(err) {
                console.log('catch', err);
            });
```
application

```javascript
// promise的应用  加载完图片再显示再屏幕上
            function loadimg(src) {
                return new Promise((resolve, reject) => {
                    let img = document.createElement('img');
                    img.src = src;
                    // 创建img节点
                    // 加载成功 执行then 失败返回err
                    img.onload = () => {
                        resolve(img);
                    };
                    img.onerror = () => {
                        reject(err);
                    }

                })
            };

            function showImgs(imgs) {
                imgs.forEach((img) => {
                    document.body.appendChild(img);
                })
            }
            promise.all([
                // promise.all([promise1,promise2...])把多个promise实例当作一个
                loadimg(
                    "http://img.mp.itc.cn/upload/20160415/43ba06629ee0493cb6784a7455cb5cc5.jpg"
                ),
                loadimg("http://img.duoziwang.com/2018/06/2018010154139925.jpg"),
                loadimg(
                    "http://img.mp.itc.cn/upload/20160415/59cca1073eaa49788e349c67e4a9c37e.jpg"
                )

            ]).then(showImgs);
            //有一个状态改变，race实例也跟着改变
            Promise.race([
                loadImg(
                    "http://img.mp.itc.cn/upload/20160415/43ba06629ee0493cb6784a7455cb5cc5.jpg"
                ),
                loadImg("http://img.duoziwang.com/2018/06/2018010154139925.jpg"),
                loadImg(
                    "http://img.mp.itc.cn/upload/20160415/59cca1073eaa49788e349c67e4a9c37e.jpg"
                )
            ]).then(showImgs);
```
