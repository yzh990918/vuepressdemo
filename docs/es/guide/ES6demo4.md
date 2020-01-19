#  ES6巩固（四)数组扩展
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191019145036964.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjc2OTU2MQ==,size_16,color_FFFFFF,t_70)
<!--more-->
# 数组扩展
##### 1.将一串数据转为数组 Array.of()

```javascript
    let arr = Array.of(3, 4, 7, 9, 11);
    //   Array.of() 将一组数据转换为数组
    console.log('arr=', arr);

    let empty = Array.of();
    console.log('empty', empty);
```
#####  2.Array.from() 将伪数组.集合转换为数组

```javascript
    let p = document.querySelectorAll('p');
    // querySelectorAll取一个集合 Array.from将伪数组（集合）转化为数组
    let pArr = Array.from(p);
    pArr.forEach(function(item) {
        // textConetnt 获取文本
        console.log(item.textContent);
    });
    // 第二个参数可以执行回调遍历数组
    console.log(Array.from([1, 3, 5], function(item) { return item * 2 }));//2，6，10
```
##### 3.替换数组元素 Array.fill（）
```javascript
    // fill()  将数组中的每个元素都换成参数 
    console.log('fill-7', [1, 'a', undefined].fill(7));
    // fill(替换的数,起始下标,结束末尾下标)
    console.log('fill,pos', ['a', 'b', 'c'].fill(7, 1, 3));//a 7 7
```
##### 4.遍历数组返回下标 值

```javascript
    // .keys() 返回数组下标
     for(let index of ['1','c','ks'].keys()){
		console.log('index',index)
	}
    // .values() 返回值
    for (let value of['1', 'c', 'ks'].values()) {
        console.log('values', value);
    }
    // 既返回索引又返回值
    for (let [index, value] of['1', 'c', 'ks'].entries()) {
        console.log('values', index, value);
    }
```
##### 5.在数组中查找符合条件的item Array.find(callback)

```javascript
 // find 查找符合条件的item（只找到符合条件的第一个数）
    console.log([1, 2, 3, 4, 5, 6].find(function(item) { return item > 3 }));
    // findIndex同理 只找到第一个下标
    console.log([1, 2, 3, 4, 5, 6].findIndex(function(item) { return item > 3 }));
```
##### 6.在数组中搜索是否包含该关键词 Array.includes()

```javascript
// 判断数组中是否包含该参数
    console.log('number', [1, 2, NaN].includes(1));//true
    console.log('number', [1, 2, NaN].includes(NaN));//true
```
