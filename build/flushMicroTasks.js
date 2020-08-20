"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flushMicrotasksQueue;
exports.flushMicroTasks = flushMicroTasks;

var _errors = require("./helpers/errors");

/**
 * Wait for microtasks queue to flush
 */
function flushMicrotasksQueue() {
  (0, _errors.printDeprecationWarning)('flushMicrotasksQueue');
  return flushMicroTasks();
}

function flushMicroTasks() {
  return {
    // using "thenable" instead of a Promise, because otherwise it breaks when
    // using "modern" fake timers
    then(resolve) {
      setImmediate(resolve);
    }

  };
}