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

var EditorFormatQuote = function EditorFormatQuote(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z' })
  );
};
EditorFormatQuote = (0, _pure2.default)(EditorFormatQuote);
EditorFormatQuote.displayName = 'EditorFormatQuote';
EditorFormatQuote.muiName = 'SvgIcon';

exports.default = EditorFormatQuote;