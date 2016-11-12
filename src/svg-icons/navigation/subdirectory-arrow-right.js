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

var NavigationSubdirectoryArrowRight = function NavigationSubdirectoryArrowRight(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z' })
  );
};
NavigationSubdirectoryArrowRight = (0, _pure2.default)(NavigationSubdirectoryArrowRight);
NavigationSubdirectoryArrowRight.displayName = 'NavigationSubdirectoryArrowRight';
NavigationSubdirectoryArrowRight.muiName = 'SvgIcon';

exports.default = NavigationSubdirectoryArrowRight;