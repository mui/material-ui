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

var ImageDehaze = function ImageDehaze(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M2 15.5v2h20v-2H2zm0-5v2h20v-2H2zm0-5v2h20v-2H2z' })
  );
};
ImageDehaze = (0, _pure2.default)(ImageDehaze);
ImageDehaze.displayName = 'ImageDehaze';
ImageDehaze.muiName = 'SvgIcon';

exports.default = ImageDehaze;