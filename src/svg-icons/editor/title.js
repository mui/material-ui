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

var EditorTitle = function EditorTitle(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M5 4v3h5.5v12h3V7H19V4z' })
  );
};
EditorTitle = (0, _pure2.default)(EditorTitle);
EditorTitle.displayName = 'EditorTitle';
EditorTitle.muiName = 'SvgIcon';

exports.default = EditorTitle;