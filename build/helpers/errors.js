"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printDeprecationWarning = printDeprecationWarning;
exports.throwRemovedFunctionError = throwRemovedFunctionError;
exports.throwRenamedFunctionError = throwRenamedFunctionError;
exports.createQueryByError = exports.prepareErrorMessage = exports.createLibraryNotSupportedError = exports.ErrorWithStack = void 0;

class ErrorWithStack extends Error {
  constructor(message, callsite) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, callsite);
    }
  }

}

exports.ErrorWithStack = ErrorWithStack;

const createLibraryNotSupportedError = error => new Error(`Currently the only supported library to search by text is "react-native".\n\n${error.message}`);

exports.createLibraryNotSupportedError = createLibraryNotSupportedError;

const prepareErrorMessage = error => // Strip info about custom predicate
error.message.replace(/ matching custom predicate[^]*/gm, '');

exports.prepareErrorMessage = prepareErrorMessage;

const createQueryByError = (error, callsite) => {
  if (error.message.includes('No instances found')) {
    return null;
  }

  throw new ErrorWithStack(error.message, callsite);
};

exports.createQueryByError = createQueryByError;
const warned = {};

function printDeprecationWarning(functionName) {
  if (warned[functionName]) {
    return;
  }

  console.warn(`
  Deprecation Warning:
  Use of ${functionName} is not recommended and will be deleted in future versions of @testing-library/react-native.
  `);
  warned[functionName] = true;
}

function throwRemovedFunctionError(functionName, docsRef) {
  throw new Error(`"${functionName}" has been removed.\n\nPlease consult: https://callstack.github.io/react-native-testing-library/docs/${docsRef}`);
}

function throwRenamedFunctionError(functionName, newFunctionName) {
  throw new ErrorWithStack(`The "${functionName}" function has been renamed to "${newFunctionName}". Please replace all occurrences.`, throwRenamedFunctionError);
}