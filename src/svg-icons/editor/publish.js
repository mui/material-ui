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

var EditorPublish = function EditorPublish(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z' })
  );
};
EditorPublish = (0, _pure2.default)(EditorPublish);
EditorPublish.displayName = 'EditorPublish';
EditorPublish.muiName = 'SvgIcon';

exports.default = EditorPublish;