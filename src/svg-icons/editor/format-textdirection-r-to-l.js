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

var EditorFormatTextdirectionRToL = function EditorFormatTextdirectionRToL(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M10 10v5h2V4h2v11h2V4h2V2h-8C7.79 2 6 3.79 6 6s1.79 4 4 4zm-2 7v-3l-4 4 4 4v-3h12v-2H8z' })
  );
};
EditorFormatTextdirectionRToL = (0, _pure2.default)(EditorFormatTextdirectionRToL);
EditorFormatTextdirectionRToL.displayName = 'EditorFormatTextdirectionRToL';
EditorFormatTextdirectionRToL.muiName = 'SvgIcon';

exports.default = EditorFormatTextdirectionRToL;