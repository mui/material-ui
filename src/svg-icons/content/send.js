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

var ContentSend = function ContentSend(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' })
  );
};
ContentSend = (0, _pure2.default)(ContentSend);
ContentSend.displayName = 'ContentSend';
ContentSend.muiName = 'SvgIcon';

exports.default = ContentSend;