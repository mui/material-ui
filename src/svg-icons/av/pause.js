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

var AvPause = function AvPause(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z' })
  );
};
AvPause = (0, _pure2.default)(AvPause);
AvPause.displayName = 'AvPause';
AvPause.muiName = 'SvgIcon';

exports.default = AvPause;