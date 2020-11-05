# egg-http-error #
基于[eggjs](https://eggjs.org/zh-cn/index.html)的异常处理插件。该插件用于将执行过程中出现的异常，按照http响应的方式处理。

## 安装 ##
```bash
npm install git+ssh://git@github.com:kiba-zhao/egg-http-error.git --save
```

## 启用 ##
设置启用plugin: `config/plugin.js`
```javascript
exports.httpError = {
  enable:true,
  package:'egg-http-error'
};
```

## http异常响应规则 ##
* Error实例：由[eggjs](https://eggjs.org/zh-cn/index.html)框架默认处理。
* 非Error实例，包含status属性：由[eggjs](https://eggjs.org/zh-cn/index.html)框架默认处理。
* 非Error实例，且不包含status属性：将抛出409异常，http响应body为抛出的异常对象

## HttpClient异常处理 ##
在使用eggjs框架自带的HttpClient时候，大多时候需要将http请求中的异常直接抛出。因此插件提供默认抛出函数进行处理。

### throw函数 ###
将res.status >= 400 的http响应body,作为异常内容直接抛出.

### HttpClient模型示例 ###
```javascript
const { Service: Model } = require('egg');

class HttpErrorModel extends Model {

    async find(condition){
        const {app,ctx} = this;
        const res = await app.curl(`http://service/resource`,{ctx})
            .then(app.httpError.throw);
        
        return res.data;
    }

}
```
