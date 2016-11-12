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

var ImageAssistantPhoto = function ImageAssistantPhoto(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z' })
  );
};
ImageAssistantPhoto = (0, _pure2.default)(ImageAssistantPhoto);
ImageAssistantPhoto.displayName = 'ImageAssistantPhoto';
ImageAssistantPhoto.muiName = 'SvgIcon';

exports.default = ImageAssistantPhoto;