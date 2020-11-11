/**
 * @fileOverview 工具类
 * @name utils.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const { isString, isNumber } = require('lodash');

function buildError(data) {
  let error;
  if (data === null || data === undefined)
    error = new Error();
  else if (isString(data) || isNumber(data))
    error = new Error(data);
  else {
    const { message, ...props } = data;
    error = new Error(message);
    Object.assign(error, props);
  }
  return error;
}

module.exports = { buildError };
