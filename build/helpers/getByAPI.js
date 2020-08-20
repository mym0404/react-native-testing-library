"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getByAPI = exports.UNSAFE_getAllByProps = exports.UNSAFE_getAllByType = exports.UNSAFE_getByProps = exports.UNSAFE_getByType = exports.getAllByTestId = exports.getAllByDisplayValue = exports.getAllByPlaceholderText = exports.getAllByText = exports.getByTestId = exports.getByDisplayValue = exports.getByPlaceholderText = exports.getByText = void 0;

var React = _interopRequireWildcard(require("react"));

var _prettyFormat = _interopRequireDefault(require("pretty-format"));

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const filterNodeByType = (node, type) => node.type === type;

const getNodeByText = (node, text) => {
  try {
    // eslint-disable-next-line
    const {
      Text
    } = require('react-native');

    const isTextComponent = filterNodeByType(node, Text);

    if (isTextComponent) {
      const textChildren = getChildrenAsText(node.props.children, Text);

      if (textChildren) {
        const textToTest = textChildren.join('');
        return typeof text === 'string' ? text === textToTest : text.test(textToTest);
      }
    }

    return false;
  } catch (error) {
    throw (0, _errors.createLibraryNotSupportedError)(error);
  }
};

const isTextContentType = candidate => ['string', 'number'].includes(typeof candidate);

const getChildrenAsText = (children, TextComponent, textContent = []) => {
  var _children$props;

  if (typeof children === 'object' && isTextContentType((_children$props = children.props) === null || _children$props === void 0 ? void 0 : _children$props.children)) {
    return textContent;
  }

  React.Children.forEach(children, child => {
    var _child$props;

    if (isTextContentType(child)) {
      textContent.push(child + '');
      return textContent;
    }

    if (child === null || child === void 0 ? void 0 : (_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props.children) {
      // Bail on traversing text children down the tree if current node (child)
      // has no text. In such situations, react-test-renderer will traverse down
      // this tree in a separate call and run this query again. As a result, the
      // query will match the deepest text node that matches requested text.
      if (filterNodeByType(child, TextComponent) && textContent.length === 0) {
        return textContent;
      }

      getChildrenAsText(child.props.children, TextComponent, textContent);
    }
  });
  return textContent;
};

const getTextInputNodeByPlaceholderText = (node, placeholder) => {
  try {
    // eslint-disable-next-line
    const {
      TextInput
    } = require('react-native');

    return filterNodeByType(node, TextInput) && (typeof placeholder === 'string' ? placeholder === node.props.placeholder : placeholder.test(node.props.placeholder));
  } catch (error) {
    throw (0, _errors.createLibraryNotSupportedError)(error);
  }
};

const getTextInputNodeByDisplayValue = (node, value) => {
  try {
    // eslint-disable-next-line
    const {
      TextInput
    } = require('react-native');

    return filterNodeByType(node, TextInput) && (typeof value === 'string' ? value === node.props.value : value.test(node.props.value));
  } catch (error) {
    throw (0, _errors.createLibraryNotSupportedError)(error);
  }
};

const getByText = instance => function getByTextFn(text) {
  try {
    return instance.find(node => getNodeByText(node, text));
  } catch (error) {
    throw new _errors.ErrorWithStack((0, _errors.prepareErrorMessage)(error), getByTextFn);
  }
};

exports.getByText = getByText;

const getByPlaceholderText = instance => function getByPlaceholderTextFn(placeholder) {
  try {
    return instance.find(node => getTextInputNodeByPlaceholderText(node, placeholder));
  } catch (error) {
    throw new _errors.ErrorWithStack((0, _errors.prepareErrorMessage)(error), getByPlaceholderTextFn);
  }
};

exports.getByPlaceholderText = getByPlaceholderText;

const getByDisplayValue = instance => function getByDisplayValueFn(placeholder) {
  try {
    return instance.find(node => getTextInputNodeByDisplayValue(node, placeholder));
  } catch (error) {
    throw new _errors.ErrorWithStack((0, _errors.prepareErrorMessage)(error), getByDisplayValueFn);
  }
};

exports.getByDisplayValue = getByDisplayValue;

const getByTestId = instance => function getByTestIdFn(testID) {
  try {
    const results = getAllByTestId(instance)(testID);

    if (results.length === 1) {
      return results[0];
    } else {
      throw new _errors.ErrorWithStack(` Expected 1 but found ${results.length} instances with testID: ${String(testID)}`, getByTestIdFn);
    }
  } catch (error) {
    throw new _errors.ErrorWithStack((0, _errors.prepareErrorMessage)(error), getByTestIdFn);
  }
};

exports.getByTestId = getByTestId;

const getAllByText = instance => function getAllByTextFn(text) {
  const results = instance.findAll(node => getNodeByText(node, text));

  if (results.length === 0) {
    throw new _errors.ErrorWithStack(`No instances found with text: ${String(text)}`, getAllByTextFn);
  }

  return results;
};

exports.getAllByText = getAllByText;

const getAllByPlaceholderText = instance => function getAllByPlaceholderTextFn(placeholder) {
  const results = instance.findAll(node => getTextInputNodeByPlaceholderText(node, placeholder));

  if (results.length === 0) {
    throw new _errors.ErrorWithStack(`No instances found with placeholder: ${String(placeholder)}`, getAllByPlaceholderTextFn);
  }

  return results;
};

exports.getAllByPlaceholderText = getAllByPlaceholderText;

const getAllByDisplayValue = instance => function getAllByDisplayValueFn(value) {
  const results = instance.findAll(node => getTextInputNodeByDisplayValue(node, value));

  if (results.length === 0) {
    throw new _errors.ErrorWithStack(`No instances found with display value: ${String(value)}`, getAllByDisplayValueFn);
  }

  return results;
};

exports.getAllByDisplayValue = getAllByDisplayValue;

const getAllByTestId = instance => function getAllByTestIdFn(testID) {
  const results = instance.findAllByProps({
    testID
  }).filter(element => typeof element.type === 'string');

  if (results.length === 0) {
    throw new _errors.ErrorWithStack(`No instances found with testID: ${String(testID)}`, getAllByTestIdFn);
  }

  return results;
};

exports.getAllByTestId = getAllByTestId;

const UNSAFE_getByType = instance => function getByTypeFn(type) {
  try {
    return instance.findByType(type);
  } catch (error) {
    throw new _errors.ErrorWithStack((0, _errors.prepareErrorMessage)(error), getByTypeFn);
  }
};

exports.UNSAFE_getByType = UNSAFE_getByType;

const UNSAFE_getByProps = instance => function getByPropsFn(props) {
  try {
    return instance.findByProps(props);
  } catch (error) {
    throw new _errors.ErrorWithStack((0, _errors.prepareErrorMessage)(error), getByPropsFn);
  }
};

exports.UNSAFE_getByProps = UNSAFE_getByProps;

const UNSAFE_getAllByType = instance => function getAllByTypeFn(type) {
  const results = instance.findAllByType(type);

  if (results.length === 0) {
    throw new _errors.ErrorWithStack('No instances found', getAllByTypeFn);
  }

  return results;
};

exports.UNSAFE_getAllByType = UNSAFE_getAllByType;

const UNSAFE_getAllByProps = instance => function getAllByPropsFn(props) {
  const results = instance.findAllByProps(props);

  if (results.length === 0) {
    throw new _errors.ErrorWithStack(`No instances found with props:\n${(0, _prettyFormat.default)(props)}`, getAllByPropsFn);
  }

  return results;
};

exports.UNSAFE_getAllByProps = UNSAFE_getAllByProps;

const getByAPI = instance => ({
  getByText: getByText(instance),
  getByPlaceholderText: getByPlaceholderText(instance),
  getByDisplayValue: getByDisplayValue(instance),
  getByTestId: getByTestId(instance),
  getAllByText: getAllByText(instance),
  getAllByPlaceholderText: getAllByPlaceholderText(instance),
  getAllByDisplayValue: getAllByDisplayValue(instance),
  getAllByTestId: getAllByTestId(instance),
  // Unsafe
  UNSAFE_getByType: UNSAFE_getByType(instance),
  UNSAFE_getAllByType: UNSAFE_getAllByType(instance),
  UNSAFE_getByProps: UNSAFE_getByProps(instance),
  UNSAFE_getAllByProps: UNSAFE_getAllByProps(instance),
  // Removed
  getByName: () => (0, _errors.throwRemovedFunctionError)('getByName', 'migration-v2#removed-functions'),
  getAllByName: () => (0, _errors.throwRemovedFunctionError)('getAllByName', 'migration-v2#removed-functions'),
  getByType: () => (0, _errors.throwRemovedFunctionError)('getByType', 'migration-v2#removed-functions'),
  getAllByType: () => (0, _errors.throwRemovedFunctionError)('getAllByType', 'migration-v2#removed-functions'),
  getByProps: () => (0, _errors.throwRemovedFunctionError)('getByProps', 'migration-v2#removed-functions'),
  getAllByProps: () => (0, _errors.throwRemovedFunctionError)('getAllByProps', 'migration-v2#removed-functions'),
  // Renamed
  getByPlaceholder: () => (0, _errors.throwRenamedFunctionError)('getByPlaceholder', 'getByPlaceholderText'),
  getAllByPlaceholder: () => (0, _errors.throwRenamedFunctionError)('getAllByPlaceholder', 'getByPlaceholderText')
});

exports.getByAPI = getByAPI;