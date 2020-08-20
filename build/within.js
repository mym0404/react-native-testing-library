"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.within = within;
exports.getQueriesForElement = void 0;

var _getByAPI = require("./helpers/getByAPI");

var _queryByAPI = require("./helpers/queryByAPI");

var _findByAPI = require("./helpers/findByAPI");

var _a11yAPI = _interopRequireDefault(require("./helpers/a11yAPI"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function within(instance) {
  return { ...(0, _getByAPI.getByAPI)(instance),
    ...(0, _queryByAPI.queryByAPI)(instance),
    ...(0, _findByAPI.findByAPI)(instance),
    ...(0, _a11yAPI.default)(instance)
  };
}

const getQueriesForElement = within;
exports.getQueriesForElement = getQueriesForElement;