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

var EditorFormatAlignJustify = function EditorFormatAlignJustify(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z' })
  );
};
EditorFormatAlignJustify = (0, _pure2.default)(EditorFormatAlignJustify);
EditorFormatAlignJustify.displayName = 'EditorFormatAlignJustify';
EditorFormatAlignJustify.muiName = 'SvgIcon';

exports.default = EditorFormatAlignJustify;