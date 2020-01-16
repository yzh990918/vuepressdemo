---
title: 播放器组件核心部分
lang: ZH
---
## 播放器部分 
歌曲的播放功能,主要是利用html5的audio标签实现

```vue
<audio autoplay muted ref="audio" @canplay="getDuration" @error="error" :src="songsUrl" @timeupdate="UpdateTime"></audio>
```
// todo:文档更新
