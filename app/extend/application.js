/**
 * @fileOverview app扩展
 * @name application.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const utils = require('../../lib/utils');

const mime = require('mime');
const CONTENT_TYPE = 'content-type';
const JSON_TYPE = 'json';
const TEXT_TYPES = [JSON_TYPE, 'html', 'txt', 'xml'];
const UTF8_ENCODING = 'utf8';

module.exports = {

  async curl(...args) {

    const res = await this.httpclient.request(...args);

    if (res.status < 400)
      return res;

    const opts = args.length > 1 ? args[1] : {};
    const ingoreStatus = opts.ingoreStatus || [];
    if (ingoreStatus.includes(res.status))
      return res;

    const extname = mime.getExtension(res.headers[CONTENT_TYPE]);
    let data = null;
    if (!Buffer.isBuffer(res.data)) {
      data = res.data;
    } else if (TEXT_TYPES.includes(extname)) {
      data = Buffer.from(res.data, UTF8_ENCODING).toString(UTF8_ENCODING);
      if (JSON_TYPE === extname)
        data = JSON.parse(data);
    }

    const error = utils.buildError(data);
    error.status = res.status;
    throw error;

  }

};
