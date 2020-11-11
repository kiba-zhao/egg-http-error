/**
 * @fileOverview httpclient curl测试
 * @name curl.test.js
 * @author kiba.x.zhao <kiba.rain@qq.com>
 * @license MIT
 */
'use strict';

const mm = require('egg-mock');
const assert = require('power-assert');
const nock = require('nock');

const TEST_CONFIG = {
  baseDir: 'testapp',
  host: 'http://test.curl',
  path: '/test/path'
};

describe('test/curl.test.js', () => {

  describe('app.curl', () => {

    it('404 not found', async () => {

      let app = mm.app({
        baseDir: TEST_CONFIG.baseDir
      });

      await app.ready();

      nock(TEST_CONFIG.host)
        .get(TEST_CONFIG.path)
        .once()
        .reply(404, "Not Found", { 'Content-Type': 'text/plain; charset=utf-8' });

      let error = null;
      let res = null;
      try {
        res = await app.curl(`${TEST_CONFIG.host}${TEST_CONFIG.path}`);
      } catch (err) {
        error = err;
      }

      assert.equal(res, null);
      assert.notEqual(error, null);
      assert.equal(error.status, 404);
      assert.equal(error.message, "Not Found");

    });

    it('ingore 404 not found', async () => {

      let app = mm.app({
        baseDir: TEST_CONFIG.baseDir
      });

      await app.ready();

      nock(TEST_CONFIG.host)
        .get(TEST_CONFIG.path)
        .once()
        .reply(404, "Not Found", { 'Content-Type': 'text/plain; charset=utf-8' });

      let error = null;
      let res = null;
      try {
        res = await app.curl(`${TEST_CONFIG.host}${TEST_CONFIG.path}`, { ingoreStatus: [404] });
      } catch (err) {
        error = err;
      }

      assert.equal(error, null);
      assert.notEqual(res, null);
      assert.equal(res.status, 404);
      assert.equal(res.data, "Not Found");
    });

    it('ingore 404 throw 400', async () => {

      let app = mm.app({
        baseDir: TEST_CONFIG.baseDir
      });

      await app.ready();

      nock(TEST_CONFIG.host)
        .get(TEST_CONFIG.path)
        .once()
        .reply(400, "Bad Request", { 'Content-Type': 'text/plain; charset=utf-8' });

      let error = null;
      let res = null;
      try {
        res = await app.curl(`${TEST_CONFIG.host}${TEST_CONFIG.path}`, { ingoreStatus: [404] });
      } catch (err) {
        error = err;
      }

      assert.equal(res, null);
      assert.notEqual(error, null);
      assert.equal(error.status, 400);
      assert.equal(error.message, "Bad Request");
    });

    it('200 success', async () => {

      let app = mm.app({
        baseDir: TEST_CONFIG.baseDir
      });

      await app.ready();

      nock(TEST_CONFIG.host)
        .get(TEST_CONFIG.path)
        .once()
        .reply(200, "Success", { 'Content-Type': 'text/plain; charset=utf-8' });

      let error = null;
      let res = null;
      try {
        res = await app.curl(`${TEST_CONFIG.host}${TEST_CONFIG.path}`, { ingoreStatus: [404] });
      } catch (err) {
        error = err;
      }

      assert.equal(error, null);
      assert.notEqual(res, null);
      assert.equal(res.status, 200);
      assert.equal(res.data, "Success");
    });

    it('400 Bad Request With Json', async () => {

      let app = mm.app({
        baseDir: TEST_CONFIG.baseDir
      });

      await app.ready();

      const json = { message: 'Bad Rquest', errors: [{ name: 'haha' }] };
      nock(TEST_CONFIG.host)
        .get(TEST_CONFIG.path)
        .once()
        .reply(400, json, { 'Content-Type': 'application/json; charset=utf-8' });

      let error = null;
      let res = null;
      try {
        res = await app.curl(`${TEST_CONFIG.host}${TEST_CONFIG.path}`);
      } catch (err) {
        error = err;
      }

      assert.equal(res, null);
      assert.notEqual(error, null);
      assert.equal(error.status, 400);
      assert.equal(error.message, json.message);
      assert.deepEqual(error.errors, json.errors);

    });

    it('400 Bad Request With Json Opts', async () => {

      let app = mm.app({
        baseDir: TEST_CONFIG.baseDir
      });

      await app.ready();

      const json = { message: 'Bad Rquest', errors: [{ name: 'haha' }] };
      nock(TEST_CONFIG.host)
        .get(TEST_CONFIG.path)
        .once()
        .reply(400, json);

      let error = null;
      let res = null;
      try {
        res = await app.curl(`${TEST_CONFIG.host}${TEST_CONFIG.path}`, { dataType: 'json' });
      } catch (err) {
        error = err;
      }

      assert.equal(res, null);
      assert.notEqual(error, null);
      assert.equal(error.status, 400);
      assert.equal(error.message, json.message);
      assert.deepEqual(error.errors, json.errors);

    });



  });


});
