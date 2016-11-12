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

var AvPlayArrow = function AvPlayArrow(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M8 5v14l11-7z' })
  );
};
AvPlayArrow = (0, _pure2.default)(AvPlayArrow);
AvPlayArrow.displayName = 'AvPlayArrow';
AvPlayArrow.muiName = 'SvgIcon';

exports.default = AvPlayArrow;