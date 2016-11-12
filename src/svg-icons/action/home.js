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

var ActionHome = function ActionHome(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' })
  );
};
ActionHome = (0, _pure2.default)(ActionHome);
ActionHome.displayName = 'ActionHome';
ActionHome.muiName = 'SvgIcon';

exports.default = ActionHome;