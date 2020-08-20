"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchStringValue = matchStringValue;
exports.matchArrayValue = matchArrayValue;
exports.matchObject = matchObject;
exports.default = void 0;

var _makeQuery = _interopRequireDefault(require("./makeQuery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function matchStringValue(prop, matcher) {
  if (!prop) {
    return false;
  }

  if (typeof matcher === 'string') {
    return prop === matcher;
  }

  return Boolean(prop.match(matcher));
}

function matchArrayValue(prop, matcher) {
  if (!prop || matcher.length === 0) {
    return false;
  }

  if (typeof matcher === 'string') {
    return prop.includes(matcher);
  }

  return !matcher.some(e => !prop.includes(e));
}

function matchObject(prop, matcher) {
  return prop ? Object.keys(matcher).length !== 0 && Object.keys(prop).length !== 0 && !Object.keys(matcher).some(key => prop[key] !== matcher[key]) : false;
}

const a11yAPI = instance => ({ ...(0, _makeQuery.default)('accessibilityLabel', {
    getBy: ['getByA11yLabel', 'getByAccessibilityLabel', 'getByLabelText'],
    getAllBy: ['getAllByA11yLabel', 'getAllByAccessibilityLabel', 'getAllByLabelText'],
    queryBy: ['queryByA11yLabel', 'queryByAccessibilityLabel', 'queryByLabelText'],
    queryAllBy: ['queryAllByA11yLabel', 'queryAllByAccessibilityLabel', 'queryAllByLabelText'],
    findBy: ['findByA11yLabel', 'findByAccessibilityLabel', 'findByLabelText'],
    findAllBy: ['findAllByA11yLabel', 'findAllByAccessibilityLabel', 'findAllByLabelText']
  }, matchStringValue)(instance),
  ...(0, _makeQuery.default)('accessibilityHint', {
    getBy: ['getByA11yHint', 'getByAccessibilityHint', 'getByHintText'],
    getAllBy: ['getAllByA11yHint', 'getAllByAccessibilityHint', 'getAllByHintText'],
    queryBy: ['queryByA11yHint', 'queryByAccessibilityHint', 'queryByHintText'],
    queryAllBy: ['queryAllByA11yHint', 'queryAllByAccessibilityHint', 'queryAllByHintText'],
    findBy: ['findByA11yHint', 'findByAccessibilityHint', 'findByHintText'],
    findAllBy: ['findAllByA11yHint', 'findAllByAccessibilityHint', 'findAllByHintText']
  }, matchStringValue)(instance),
  ...(0, _makeQuery.default)('accessibilityRole', {
    getBy: ['getByA11yRole', 'getByAccessibilityRole', 'getByRole'],
    getAllBy: ['getAllByA11yRole', 'getAllByAccessibilityRole', 'getAllByRole'],
    queryBy: ['queryByA11yRole', 'queryByAccessibilityRole', 'queryByRole'],
    queryAllBy: ['queryAllByA11yRole', 'queryAllByAccessibilityRole', 'queryAllByRole'],
    findBy: ['findByA11yRole', 'findByAccessibilityRole', 'findByRole'],
    findAllBy: ['findAllByA11yRole', 'findAllByAccessibilityRole', 'findAllByRole']
  }, matchStringValue)(instance),
  ...(0, _makeQuery.default)('accessibilityStates', {
    getBy: ['getByA11yStates', 'getByAccessibilityStates'],
    getAllBy: ['getAllByA11yStates', 'getAllByAccessibilityStates'],
    queryBy: ['queryByA11yStates', 'queryByAccessibilityStates'],
    queryAllBy: ['queryAllByA11yStates', 'queryAllByAccessibilityStates'],
    findBy: ['findByA11yStates', 'findByAccessibilityStates'],
    findAllBy: ['findAllByA11yStates', 'findAllByAccessibilityStates']
  }, matchArrayValue)(instance),
  ...(0, _makeQuery.default)('accessibilityState', {
    getBy: ['getByA11yState', 'getByAccessibilityState'],
    getAllBy: ['getAllByA11yState', 'getAllByAccessibilityState'],
    queryBy: ['queryByA11yState', 'queryByAccessibilityState'],
    queryAllBy: ['queryAllByA11yState', 'queryAllByAccessibilityState'],
    findBy: ['findByA11yState', 'findByAccessibilityState'],
    findAllBy: ['findAllByA11yState', 'findAllByAccessibilityState']
  }, matchObject)(instance),
  ...(0, _makeQuery.default)('accessibilityValue', {
    getBy: ['getByA11yValue', 'getByAccessibilityValue'],
    getAllBy: ['getAllByA11yValue', 'getAllByAccessibilityValue'],
    queryBy: ['queryByA11yValue', 'queryByAccessibilityValue'],
    queryAllBy: ['queryAllByA11yValue', 'queryAllByAccessibilityValue'],
    findBy: ['findByA11yValue', 'findByAccessibilityValue'],
    findAllBy: ['findAllByA11yValue', 'findAllByAccessibilityValue']
  }, matchObject)(instance)
});

var _default = a11yAPI;
exports.default = _default;