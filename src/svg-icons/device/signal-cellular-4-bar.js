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

var DeviceSignalCellular4Bar = function DeviceSignalCellular4Bar(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M2 22h20V2z' })
  );
};
DeviceSignalCellular4Bar = (0, _pure2.default)(DeviceSignalCellular4Bar);
DeviceSignalCellular4Bar.displayName = 'DeviceSignalCellular4Bar';
DeviceSignalCellular4Bar.muiName = 'SvgIcon';

exports.default = DeviceSignalCellular4Bar;