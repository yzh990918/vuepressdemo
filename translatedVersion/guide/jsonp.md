---
title: jsonp
lang: Zh
---
# 使用jsonp
## What is JSON
> In order to facilitate the client's use of data, an informal transmission protocol has been gradually formed, which is called jsonp. One of the key points of the protocol is to allow the user to pass a callback parameter to the server, and then when the server returns data, it will wrap the JSON data as a function name, so that the client can customize its own functions to automatically process Data returned by manager.

## Cross domain principle of jsonp
**Cross domain principle**
1. Use**script Label**Send request. This tag supports cross domain access
2. Pass a callback to the server in the script tag
3.**The value of callback * * corresponds to a global function that must be defined on the page (why global? Because when the server receives the callback function, it will return to the script on the page to find it. If it is not written in the global scope, it cannot be found.)
4. The server returns a function call. When calling, the data will be included in the function as parameters.
:: warning
Jsonp only supports get requests
:::

## Specific parameters of JSON
![](./images/2019-11-12-23-50-46.png)
- **url (String) url to fetch**
- **opts (Object)， optional**
 1. _**param**_(String) name of the query string parameter to specify the callback (defaults to callback)
2. **_timeout_** (Number) how long after a timeout error is emitted. 0 to disable (defaults to 60000)
3. _**prefix**_ (String) prefix for the global callback functions that handle jsonp responses (defaults to __jp)
4. _**name**_ (String) name of the global callback functions that handle jsonp responses (defaults to prefix + incremented counter)
- **callback**
