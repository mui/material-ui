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

var ImageFlashOn = function ImageFlashOn(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M7 2v11h3v9l7-12h-4l4-8z' })
  );
};
ImageFlashOn = (0, _pure2.default)(ImageFlashOn);
ImageFlashOn.displayName = 'ImageFlashOn';
ImageFlashOn.muiName = 'SvgIcon';

exports.default = ImageFlashOn;