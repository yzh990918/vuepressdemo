---
title: 开发Singer组件
---
## Encapsulate the acquired singer list data
:::tip
The singer data you get through jsonp does not conform to the JSON format called by Vue

You have to encapsulate the array of objects sorted by the alphabet class
:::
### The JSON data you got
![](./images/2019-11-19-17-23-45.png)
### What you have to do
- Define a map object: it contains**Popular singer list object**(**title,items[]**),Also**Singer list object**(**title,items**)
```js
let map={
  hot:{
    title:'热门，
    items:[]
  }
}
```
- To create a singer class, you need to push the object into the items array
```js
export default class Singer{
constructor({id,name}){
  this.id=id
  this.name=name
  this.avtar=`ttps://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
}
}

```

- Loop traversal, encapsulating data

```js
  list.forEach((item,index)=>{
    // 热门歌手区
    if(index<10){
      map.hot.items.push(new Singer({
        id:item.Fsinger_mid
        name:item.Fsinger_name
      }))
    }
    // 歌手区
    const key=item.Findex
    if(!map[key]){
      map[key]={
        title:key,
        items:[]
      }
    }
    map[key].items.push(new Singer({
      id:item.Fsinger_mid
      name:item.Fsinger_name
    }))

  })

```
**So the data becomes**
Alphabetical map objects
![](./images/2019-11-19-18-08-15.png)

## Sort data
:::warning 
We just fill the hot object and map with the map object[key]Object, however, the Vue traversal object will be an unordered result, so we still need to

Objects are sorted and loaded into an array to get a satisfactory array of objects
:::
```js
let hot=[]
let singers=[]
for(let key in map){
  let value=map[key]
  if(value.title.match(/[a-zA-Z]/)){
    // 如果匹配的是字母
    singers.push(value)
  }else if(value.title === '热门'){
    hot.push(value)
  }
}
....
return hot.concat(singers)

```

**Get to expected effect**:
![](./images/2019-11-19-19-57-52.png)
