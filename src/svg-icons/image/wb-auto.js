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

var ImageWbAuto = function ImageWbAuto(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M6.85 12.65h2.3L8 9l-1.15 3.65zM22 7l-1.2 6.29L19.3 7h-1.6l-1.49 6.29L15 7h-.76C12.77 5.17 10.53 4 8 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c3.13 0 5.84-1.81 7.15-4.43l.1.43H17l1.5-6.1L20 16h1.75l2.05-9H22zm-11.7 9l-.7-2H6.4l-.7 2H3.8L7 7h2l3.2 9h-1.9z' })
  );
};
ImageWbAuto = (0, _pure2.default)(ImageWbAuto);
ImageWbAuto.displayName = 'ImageWbAuto';
ImageWbAuto.muiName = 'SvgIcon';

exports.default = ImageWbAuto;