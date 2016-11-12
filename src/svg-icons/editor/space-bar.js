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

var EditorSpaceBar = function EditorSpaceBar(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M18 9v4H6V9H4v6h16V9z' })
  );
};
EditorSpaceBar = (0, _pure2.default)(EditorSpaceBar);
EditorSpaceBar.displayName = 'EditorSpaceBar';
EditorSpaceBar.muiName = 'SvgIcon';

exports.default = EditorSpaceBar;