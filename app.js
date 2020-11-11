'use strict';

const MW_NAME = 'httpError';
const OVERRIDE_METHOD = 'overrideMethod';

module.exports = app => {

  const index = app.config.coreMiddleware.indexOf(OVERRIDE_METHOD);
  if (index === -1) {
    app.config.coreMiddleware.push(MW_NAME);
  } else {
    app.config.coreMiddleware.splice(index, 0, MW_NAME);
  }

};
