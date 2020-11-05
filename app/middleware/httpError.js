/**
 * @fileOverview 异常处理中间件
 * @name httpError.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';


const utils = require('../../lib/utils');

const PROPERTY_STATUS = 'status';

module.exports = config => {

  return async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      if (err instanceof Error)
        throw err;

      const error = utils.buildError(err);
      if (error[PROPERTY_STATUS] === undefined)
        error[PROPERTY_STATUS] = 409;
      throw error;

    }
  };

};
