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

var FileFileUpload = function FileFileUpload(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z' })
  );
};
FileFileUpload = (0, _pure2.default)(FileFileUpload);
FileFileUpload.displayName = 'FileFileUpload';
FileFileUpload.muiName = 'SvgIcon';

exports.default = FileFileUpload;