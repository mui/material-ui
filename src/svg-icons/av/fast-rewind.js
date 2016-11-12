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

var AvFastRewind = function AvFastRewind(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z' })
  );
};
AvFastRewind = (0, _pure2.default)(AvFastRewind);
AvFastRewind.displayName = 'AvFastRewind';
AvFastRewind.muiName = 'SvgIcon';

exports.default = AvFastRewind;