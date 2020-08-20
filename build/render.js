"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var React = _interopRequireWildcard(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _act = _interopRequireDefault(require("./act"));

var _cleanup = require("./cleanup");

var _getByAPI = require("./helpers/getByAPI");

var _queryByAPI = require("./helpers/queryByAPI");

var _findByAPI = require("./helpers/findByAPI");

var _a11yAPI = _interopRequireDefault(require("./helpers/a11yAPI"));

var _debugShallow = _interopRequireDefault(require("./helpers/debugShallow"));

var _debugDeep = _interopRequireDefault(require("./helpers/debugDeep"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-line import/no-extraneous-dependencies

/**
 * Renders test component deeply using react-test-renderer and exposes helpers
 * to assert on the output.
 */
function render(component, {
  wrapper: Wrapper,
  createNodeMock
} = {}) {
  const wrap = innerElement => Wrapper ? /*#__PURE__*/React.createElement(Wrapper, null, innerElement) : innerElement;

  const renderer = renderWithAct(wrap(component), createNodeMock ? {
    createNodeMock
  } : undefined);
  const update = updateWithAct(renderer, wrap);
  const instance = renderer.root;
  (0, _cleanup.addToCleanupQueue)(renderer.unmount);
  return { ...(0, _getByAPI.getByAPI)(instance),
    ...(0, _queryByAPI.queryByAPI)(instance),
    ...(0, _findByAPI.findByAPI)(instance),
    ...(0, _a11yAPI.default)(instance),
    update,
    rerender: update,
    // alias for `update`
    unmount: renderer.unmount,
    toJSON: renderer.toJSON,
    debug: debug(instance, renderer)
  };
}

function renderWithAct(component, options) {
  let renderer;
  (0, _act.default)(() => {
    renderer = _reactTestRenderer.default.create(component, options);
  });
  return renderer;
}

function updateWithAct(renderer, wrap) {
  return function (component) {
    (0, _act.default)(() => {
      renderer.update(wrap(component));
    });
  };
}

function debug(instance, renderer) {
  function debugImpl(message) {
    return (0, _debugDeep.default)(renderer.toJSON(), message);
  }

  debugImpl.shallow = message => (0, _debugShallow.default)(instance, message);

  return debugImpl;
}