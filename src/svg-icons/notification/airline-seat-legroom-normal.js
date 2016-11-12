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

var NotificationAirlineSeatLegroomNormal = function NotificationAirlineSeatLegroomNormal(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M5 12V3H3v9c0 2.76 2.24 5 5 5h6v-2H8c-1.66 0-3-1.34-3-3zm15.5 6H19v-7c0-1.1-.9-2-2-2h-5V3H6v8c0 1.65 1.35 3 3 3h7v7h4.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z' })
  );
};
NotificationAirlineSeatLegroomNormal = (0, _pure2.default)(NotificationAirlineSeatLegroomNormal);
NotificationAirlineSeatLegroomNormal.displayName = 'NotificationAirlineSeatLegroomNormal';
NotificationAirlineSeatLegroomNormal.muiName = 'SvgIcon';

exports.default = NotificationAirlineSeatLegroomNormal;