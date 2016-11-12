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

var ImagePanoramaVertical = function ImagePanoramaVertical(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M19.94 21.12c-1.1-2.94-1.64-6.03-1.64-9.12 0-3.09.55-6.18 1.64-9.12.04-.11.06-.22.06-.31 0-.34-.23-.57-.63-.57H4.63c-.4 0-.63.23-.63.57 0 .1.02.2.06.31C5.16 5.82 5.71 8.91 5.71 12c0 3.09-.55 6.18-1.64 9.12-.05.11-.07.22-.07.31 0 .33.23.57.63.57h14.75c.39 0 .63-.24.63-.57-.01-.1-.03-.2-.07-.31zM6.54 20c.77-2.6 1.16-5.28 1.16-8 0-2.72-.39-5.4-1.16-8h10.91c-.77 2.6-1.16 5.28-1.16 8 0 2.72.39 5.4 1.16 8H6.54z' })
  );
};
ImagePanoramaVertical = (0, _pure2.default)(ImagePanoramaVertical);
ImagePanoramaVertical.displayName = 'ImagePanoramaVertical';
ImagePanoramaVertical.muiName = 'SvgIcon';

exports.default = ImagePanoramaVertical;