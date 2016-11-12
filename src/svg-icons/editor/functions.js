'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _SvgIcon = require('../../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditorFunctions = function EditorFunctions(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M18 4H6v2l6.5 6L6 18v2h12v-3h-7l5-5-5-5h7z' })
  );
};
EditorFunctions = (0, _pure2.default)(EditorFunctions);
EditorFunctions.displayName = 'EditorFunctions';
EditorFunctions.muiName = 'SvgIcon';

exports.default = EditorFunctions;