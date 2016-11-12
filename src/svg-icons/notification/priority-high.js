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

var NotificationPriorityHigh = function NotificationPriorityHigh(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('circle', { cx: '12', cy: '19', r: '2' }),
    _react2.default.createElement('path', { d: 'M10 3h4v12h-4z' })
  );
};
NotificationPriorityHigh = (0, _pure2.default)(NotificationPriorityHigh);
NotificationPriorityHigh.displayName = 'NotificationPriorityHigh';
NotificationPriorityHigh.muiName = 'SvgIcon';

exports.default = NotificationPriorityHigh;