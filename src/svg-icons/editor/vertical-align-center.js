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

var EditorVerticalAlignCenter = function EditorVerticalAlignCenter(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M8 19h3v4h2v-4h3l-4-4-4 4zm8-14h-3V1h-2v4H8l4 4 4-4zM4 11v2h16v-2H4z' })
  );
};
EditorVerticalAlignCenter = (0, _pure2.default)(EditorVerticalAlignCenter);
EditorVerticalAlignCenter.displayName = 'EditorVerticalAlignCenter';
EditorVerticalAlignCenter.muiName = 'SvgIcon';

exports.default = EditorVerticalAlignCenter;