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

var AvSkipNext = function AvSkipNext(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z' })
  );
};
AvSkipNext = (0, _pure2.default)(AvSkipNext);
AvSkipNext.displayName = 'AvSkipNext';
AvSkipNext.muiName = 'SvgIcon';

exports.default = AvSkipNext;