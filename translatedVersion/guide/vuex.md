---
title: 使用vuex获取子路由的singer对象
lang: ZH
---
## Understanding vuex
`Vuex` Is a state management pattern developed specifically for vue.js applications. It uses centralized storage to manage the state of all components of the application, and ensures that the state changes in a predictable way with corresponding rules. Vuex is also integrated into the official debugging tool 'devtools' extension of Vue, which provides advanced debugging functions such as zero configuration time travel debugging, state snapshot import and export, etc.

> In short, it's a`Public Warehouse` You can modify the warehouse content through the component, share the warehouse content and render it back to the component

**To master vuex, you just need to make this picture clear**
![](./images/2019-12-22-15-33-59.png)
:::Brief interpretation of tip

* First, vuex creates a`store`region，Storage public`state`data,`actions`:Change the incoming batch synchronization method or asynchronous operation of data，'mutations':Modify state data call
* When the component modifies the data in the state, it must pass the`dispatch`Pass actions to call actions, and then pass`commit`Submit method to States，mutationsModify inside`state`内部修改
* Of course, you can skip actions and modify the state directly through the registration method
:::
## Usage method
A simple example
```js
store下面的index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//大型应用分开写  actions mutations mutations-type getters index state
export default new Vuex.Store({
state:{
    city:"上海"
},
actions:{
    //外部组件传过来的actions
    changeCity(ctx,city){
        ctx.commit('increment','city')
        //通常increment被封装在mutations-type中 然后通过import * as a取出
    }
},
mutations:{
    increment(state,city){
        state.city=city
    }
}

})

```
## Get singer object through vuex
* First create the following directory in the store directory
```md
├── store
│   ├── index.js(vuex入口文件)
│   ├── actions.js(异步操作文件)
│   ├── mutations.js(修改state数据文件)
│   ├── mutations-types.js(mutations关联文件)
│   ├── getters.js(获取state数据文件)
│   ├── state.js
```
<h3>Initialization file</h3>
<br>
state.js

```js
const state ={
  singer:{}
}
export default state
```
getters.js

```js
export const singer=state=>state.singer;

```
mutations-types.js

```js
export const SET_SINGER='SET_SINGER'
```
mutations.js

```js
import * as types from 'mutations-types'
//* as 通过这样的import就可以避免花括号一个一个引入
export default mutations={
  // 常数作为函数名
  [types.SET_SINGER](state,singer){
    state.singer=singer
  }
}
```
**index.js**
```js
import Vue from 'vue'
import Vuex from 'vuex'
import state from 'state'
import mutations from 'mutations'
import * as getters from 'getters'
import * as actions from 'actions'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
// 生产环境开启 线上不开启
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // 严格模式
  strict: debug,
  // 打印vuex修改state日志
  plugins: debug ? [createLogger()] : []
});

```
* Next, use vuex to get the singer object
::: warning
Vuex provides mapxxx syntax class to simplify the operation code of each link
:::
  * Main.js import vuex import and register store
  * Singer.vue operation
```js
import {mapMutations} from 'vuex'
methods:{
  ...mapMutations({
    setSinger:'SET_SINGER'
  })
}

```
The operation here is`映射`，Mapping this. Setsinger to this. $store. Commit (set ﹐ singer) simplifies the code
Then you can use setsinger to manipulate state data directly
```js
selectSinger(singer){
  this.$router.push({
    path:`singer/${singer.id}`
  });
  this.setSinger(singer)
}
```
This completes the operation of setting the data in the store. The next step is to take the data
  * singer-detail.vue

```js
import {mapGetters} from 'vuex'
computed:{
...mapGetters(
  // 之前getters.js里面已经处理过数据,所以不需要添加操作 直接引用既可
  ['singer']
)
}

```

<br>

## summary
Summing up`vuex`To summarize the following steps
:::tip
1. Define initialization file `store`Relevant
2. Using vuex, you can use the syntax class`mapxxx`Mapping
3. Data will be mapped automatically no action required
:::
The data will be mapped automatically. No operation is required. Please refer to[Vuex official website](https://vuex.vuejs.org/zh/)
next :Encapsulated data
