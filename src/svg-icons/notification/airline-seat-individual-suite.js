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

var NotificationAirlineSeatIndividualSuite = function NotificationAirlineSeatIndividualSuite(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M7 13c1.65 0 3-1.35 3-3S8.65 7 7 7s-3 1.35-3 3 1.35 3 3 3zm12-6h-8v7H3V7H1v10h22v-6c0-2.21-1.79-4-4-4z' })
  );
};
NotificationAirlineSeatIndividualSuite = (0, _pure2.default)(NotificationAirlineSeatIndividualSuite);
NotificationAirlineSeatIndividualSuite.displayName = 'NotificationAirlineSeatIndividualSuite';
NotificationAirlineSeatIndividualSuite.muiName = 'SvgIcon';

exports.default = NotificationAirlineSeatIndividualSuite;