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

var DeviceSignalCellular0Bar = function DeviceSignalCellular0Bar(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { fillOpacity: '.3', d: 'M2 22h20V2z' })
  );
};
DeviceSignalCellular0Bar = (0, _pure2.default)(DeviceSignalCellular0Bar);
DeviceSignalCellular0Bar.displayName = 'DeviceSignalCellular0Bar';
DeviceSignalCellular0Bar.muiName = 'SvgIcon';

exports.default = DeviceSignalCellular0Bar;