/**
 * @fileOverview http异常处理帮助函数
 * @name http_error.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';


const utils = require('./utils');

module.exports = app => {
  app.httpError = {
    throw: function(res) {

      if (res.status >= 400) {
        const error = utils.buildError(res.data);
        error.status = res.status;
        throw error;
      }

      return res;
    }
  };
};
