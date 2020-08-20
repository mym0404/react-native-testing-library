"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debugDeep;

var _format = _interopRequireDefault(require("./format"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Log pretty-printed deep test component instance
 */
function debugDeep(instance, message = '') {
  if (message) {
    console.log(`${message}\n\n`, (0, _format.default)(instance));
  } else {
    console.log((0, _format.default)(instance));
  }
}