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

var CommunicationCallReceived = function CommunicationCallReceived(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z' })
  );
};
CommunicationCallReceived = (0, _pure2.default)(CommunicationCallReceived);
CommunicationCallReceived.displayName = 'CommunicationCallReceived';
CommunicationCallReceived.muiName = 'SvgIcon';

exports.default = CommunicationCallReceived;