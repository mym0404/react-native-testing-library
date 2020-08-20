"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _act = _interopRequireDefault(require("./act"));

var _errors = require("./helpers/errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const findEventHandler = (element, eventName, callsite, nearestHostDescendent, hasDescendandHandler) => {
  var _hostElement$props$on, _hostElement$props;

  const handler = getEventHandler(element, eventName);
  const hasHandler = handler != null || hasDescendandHandler;
  const isHostComponent = typeof element.type === 'string';
  const hostElement = isHostComponent ? element : nearestHostDescendent;
  const isEventEnabled = (hostElement === null || hostElement === void 0 ? void 0 : (_hostElement$props$on = (_hostElement$props = hostElement.props).onStartShouldSetResponder) === null || _hostElement$props$on === void 0 ? void 0 : _hostElement$props$on.call(_hostElement$props)) !== false;
  if (handler && isEventEnabled) return handler; // Do not bubble event to the root element

  if (element.parent === null || element.parent.parent === null) {
    if (hasHandler) {
      return null;
    } else {
      throw new _errors.ErrorWithStack(`No handler function found for event: "${eventName}"`, callsite || invokeEvent);
    }
  }

  return findEventHandler(element.parent, eventName, callsite, hostElement, hasHandler);
};

const getEventHandler = (element, eventName) => {
  const eventHandlerName = toEventHandlerName(eventName);

  if (typeof element.props[eventHandlerName] === 'function') {
    return element.props[eventHandlerName];
  }

  if (typeof element.props[eventName] === 'function') {
    return element.props[eventName];
  }

  return undefined;
};

const invokeEvent = (element, eventName, callsite, ...data) => {
  const handler = findEventHandler(element, eventName, callsite);

  if (!handler) {
    return null;
  }

  let returnValue;
  (0, _act.default)(() => {
    returnValue = handler(...data);
  });
  return returnValue;
};

const toEventHandlerName = eventName => `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`;

const pressHandler = element => invokeEvent(element, 'press', pressHandler);

const changeTextHandler = (element, ...data) => invokeEvent(element, 'changeText', changeTextHandler, ...data);

const scrollHandler = (element, ...data) => invokeEvent(element, 'scroll', scrollHandler, ...data);

const fireEvent = (element, eventName, ...data) => invokeEvent(element, eventName, fireEvent, ...data);

fireEvent.press = pressHandler;
fireEvent.changeText = changeTextHandler;
fireEvent.scroll = scrollHandler;
var _default = fireEvent;
exports.default = _default;