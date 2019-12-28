---
title: 开发歌手详情页面
lang: ZH
---
## :crystal_ball:封装数据
:::tip 分析
我们拿到的数据里面如下图,歌手详情页面的hotsongs是我们想要的数据 `name`是歌曲名 `al`专辑相关  `ar`歌曲演唱的歌手 还有就是歌手名 mvid等等
:::
![QQ截图20191228225755.png](https://i.loli.net/2019/12/28/YfydjNwxLZvcFgi.png)

> 以后遇到这种需要封装数据到一个对象 就应该用工厂模式去实例一个类 然后遍历数据添加对象到初始化数组里即可

创建song类
```js
export default class Song{
  constructor({
    id,
    singer,
    name,
    album,
    image,
    mv
  }){
    this.id=id
    this.singer=singer
    this.name=name
    this.album=album
    this.image=image
    this.mv=mv
  }
}
```
工厂模式创建实例函数
```js
export function createSong(music){
return new Song({
  // 根据api修改参数
      id:music.id,
      singer:filterSinger(music.ar),
      name:music.name,
      album:music.al.name,//专辑名
      image: music.al.picUrl,
      mv:music.mv
})
}
```
:::warning 注意
这里的歌手不止一个,这种情况就定义函数返回一个分隔开歌手数据的数组
```js
function filterSinger(singer){
  let ret=[]
  ret=singer.map((item)=>{
  return item.name
  })
  return ret.join('/')
}
```
:::

事先做好的事情都准备好了，开始处理数据

```js
_normalizeSong(list){
  let ret=[]
  list.forEach((item)=>{
    ret.push(createSong(item))
  })
  return ret
}
```
## :mega:总结
这样就完成了所有的封装数据任务,后续要完成的事情就是利用数据完成singerDetail组件,加油！
