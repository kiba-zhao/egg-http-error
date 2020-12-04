# egg-http-error #
基于[eggjs](https://eggjs.org/zh-cn/index.html)的异常处理插件。该插件用于将执行过程中出现的异常，按照http响应的方式处理。

## 安装 ##
```bash
npm install git://github.com:kiba-zhao/egg-http-error.git --save
```

## 启用 ##
设置启用plugin: `config/plugin.js`
```javascript
exports.httpError = {
  enable:true,
  package:'egg-http-error'
};
```

## 中间件http异常响应规则 ##
* Error实例：由[eggjs](https://eggjs.org/zh-cn/index.html)框架默认处理。
* 非Error实例，包含status属性：由[eggjs](https://eggjs.org/zh-cn/index.html)框架默认处理。
* 非Error实例，且不包含status属性：将抛出409异常，http响应body为抛出的异常对象

## app.curl异常处理 ##
在使用eggjs框架自带的curl函数时候，大多时候需要将http请求中的异常直接抛出。
> 插件会自动将res.status>=400，且未包含在opts.ingoreStatus数组中的异常响应，直接抛出给eggjs.

### 示例 ###
1.未设置opts.ingoreStatus：会将res.status>=400的响应全部throw
```javascript
const { Service: Model } = require('egg');

class HttpErrorModel extends Model {

    async find(condition){
        const {app,ctx} = this;
        // res.status >= 400 都将throw error
        const res = await app.curl(`http://service/resource`);
        
        return res.data;
    }

}
```
2.设置了opts.ingoreStatus数组：会将res.status>=400，且未包含在opts.ingoreStatus数组中的响应全部throw
```javascript
const { Service: Model } = require('egg');

class HttpErrorModel extends Model {

    async find(condition){
        const {app,ctx} = this;
        // res.status >= 400 且res.status!== 404　的响应都将throw error
        const res = await app.curl(`http://service/resource`，{ingoreStatus:[404]});
        
        return res.data;
    }

}
```
