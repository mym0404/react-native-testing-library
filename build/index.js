"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pure = require("./pure");

Object.keys(_pure).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pure[key];
    }
  });
});

var _flushMicroTasks = require("./flushMicroTasks");

// If we're running in a test runner that supports afterEach
// then we'll automatically run cleanup afterEach test
// this ensures that tests run in isolation from each other
// if you don't like this then either import the `pure` module
// or set the RNTL_SKIP_AUTO_CLEANUP env variable to 'true'.
if (typeof afterEach === 'function' && !process.env.RNTL_SKIP_AUTO_CLEANUP) {
  // eslint-disable-next-line no-undef
  afterEach(async () => {
    await (0, _flushMicroTasks.flushMicroTasks)();
    (0, _pure.cleanup)();
  });
}