'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _SvgIcon = require('../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavigationArrowDropRight = function NavigationArrowDropRight(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M9.5,7l5,5l-5,5V7z' })
  );
};

NavigationArrowDropRight = (0, _pure2.default)(NavigationArrowDropRight);
NavigationArrowDropRight.displayName = 'NavigationArrowDropRight';
NavigationArrowDropRight.muiName = 'SvgIcon';

exports.default = NavigationArrowDropRight;