## easy-mock常用语法

> 数据全部是随机模拟的

- @ip 随机ip
- @id 随机输出长度为18的字符
- @image(size x size) 输出占位符
- @float(min,max,2,2) - 随机的保留两位小数的浮点数
... 不一一举例

request 接口内容
```json
{
  "data": {
    "stringTest|1-10": "★",
    "string": "@String",
    "number1": "@integer(1,100)",
    "number2": "@float(20,100,2,2)",
    "boolean": "@boolean",
    "object|2": {
      "301": "上海",
      "302": "安徽",
      "303": "浙江",
      "304": "北京"
    },
    "name": "@name",
    "cname": "@canme",
    "image": "@image('100x100','#666666')",
    "now": "@now",
    "now1": "@now('yyyy-MM-dd HH:mm:ss SS')",
    "date": "@date()",
    "datetime": "@datetime",
    "string": "@string(5)",
    "float": "@float(10,100,2,5)",
    "regexp": /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
    "function": function() {
      return 'a'
    },
    "range": "@range(1,10)",
    "array|1": ['a', 'b', 'c'],
    "ip": "@ip",
    "city": "@city",
    "province": "@province",
    "email": "@email"
  }
}

```

返回结果

```json
{
  "data": {
    "stringTest": "★★★★★★",
    "string": "E*rD#",
    "number1": 21,
    "number2": 25.35823,
    "boolean": true,
    "object": {
      "303": "浙江",
      "304": "北京"
    },
    "name": "Thomas Martin",
    "cname": "@canme",
    "image": "http://dummyimage.com/100x100/666666",
    "now": "2020-02-23 21:45:59",
    "now1": "2020-02-23 21:45:59",
    "date": "1975-10-04",
    "datetime": "1993-06-07 00:10:32",
    "float": 25.35823,
    "regexp": "Dsj$8a[S2k0kEKU8aof&YST",
    "range": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "array": "c",
    "ip": "112.63.21.170",
    "city": "澎湖县",
    "province": "天津",
    "email": "p.tlisedtml@ireuvgentt.nt",
    "function": "a"
  }
}
```
