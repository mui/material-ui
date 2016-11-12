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

var AvFastForward = function AvFastForward(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z' })
  );
};
AvFastForward = (0, _pure2.default)(AvFastForward);
AvFastForward.displayName = 'AvFastForward';
AvFastForward.muiName = 'SvgIcon';

exports.default = AvFastForward;