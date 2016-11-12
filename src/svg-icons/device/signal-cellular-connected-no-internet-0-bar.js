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

var DeviceSignalCellularConnectedNoInternet0Bar = function DeviceSignalCellularConnectedNoInternet0Bar(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { fillOpacity: '.3', d: 'M22 8V2L2 22h16V8z' }),
    _react2.default.createElement('path', { d: 'M20 22h2v-2h-2v2zm0-12v8h2v-8h-2z' })
  );
};
DeviceSignalCellularConnectedNoInternet0Bar = (0, _pure2.default)(DeviceSignalCellularConnectedNoInternet0Bar);
DeviceSignalCellularConnectedNoInternet0Bar.displayName = 'DeviceSignalCellularConnectedNoInternet0Bar';
DeviceSignalCellularConnectedNoInternet0Bar.muiName = 'SvgIcon';

exports.default = DeviceSignalCellularConnectedNoInternet0Bar;