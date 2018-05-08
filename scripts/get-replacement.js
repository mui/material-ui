/* eslint-disable */
// Waiting for https://github.com/kentcdodds/babel-plugin-preval/issues/52

'use strict';

var requireFromString = require('require-from-string');
var objectToAST = require('babel-plugin-preval/dist/object-to-ast');

module.exports = getReplacement;

function getReplacement(_ref) {
  var stringToPreval = _ref.string,
    filename = _ref.filename,
    babel = _ref.babel;

  var _babel$transform = babel.transform(stringToPreval, {
      filename,
    }),
    code = _babel$transform.code;

  var transpiled = `require('@babel/register');\n${code}`;
  var val = requireFromString(transpiled, filename);
  return objectToAST(val);
}
