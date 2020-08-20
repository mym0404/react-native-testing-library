"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _waitFor = _interopRequireDefault(require("../waitFor"));

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNodeValid(node) {
  return typeof node.type === 'string';
}

function makeAliases(aliases, query) {
  return aliases.map(alias => ({
    [alias]: query
  })).reduce((acc, query) => ({ ...acc,
    ...query
  }), {});
}

const makeQuery = (name, queryNames, matcherFn) => instance => {
  const getBy = matcher => {
    try {
      return instance.find(node => isNodeValid(node) && matcherFn(node.props[name], matcher));
    } catch (error) {
      throw new _errors.ErrorWithStack((0, _errors.prepareErrorMessage)(error), getBy);
    }
  };

  const getAllBy = matcher => {
    const results = instance.findAll(node => isNodeValid(node) && matcherFn(node.props[name], matcher));

    if (results.length === 0) {
      throw new _errors.ErrorWithStack('No instances found', getAllBy);
    }

    return results;
  };

  const queryBy = matcher => {
    try {
      return getBy(matcher);
    } catch (error) {
      return (0, _errors.createQueryByError)(error, queryBy);
    }
  };

  const queryAllBy = matcher => {
    try {
      return getAllBy(matcher);
    } catch (error) {
      return [];
    }
  };

  const findBy = (matcher, waitForOptions) => {
    return (0, _waitFor.default)(() => getBy(matcher), waitForOptions);
  };

  const findAllBy = (matcher, waitForOptions) => {
    return (0, _waitFor.default)(() => getAllBy(matcher), waitForOptions);
  };

  return { ...makeAliases(queryNames.getBy, getBy),
    ...makeAliases(queryNames.getAllBy, getAllBy),
    ...makeAliases(queryNames.queryBy, queryBy),
    ...makeAliases(queryNames.queryAllBy, queryAllBy),
    ...makeAliases(queryNames.findBy, findBy),
    ...makeAliases(queryNames.findAllBy, findAllBy)
  };
};

var _default = makeQuery;
exports.default = _default;