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

var ImageDetails = function ImageDetails(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M3 4l9 16 9-16H3zm3.38 2h11.25L12 16 6.38 6z' })
  );
};
ImageDetails = (0, _pure2.default)(ImageDetails);
ImageDetails.displayName = 'ImageDetails';
ImageDetails.muiName = 'SvgIcon';

exports.default = ImageDetails;