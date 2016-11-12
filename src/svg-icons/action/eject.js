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

var ActionEject = function ActionEject(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M5 17h14v2H5zm7-12L5.33 15h13.34z' })
  );
};
ActionEject = (0, _pure2.default)(ActionEject);
ActionEject.displayName = 'ActionEject';
ActionEject.muiName = 'SvgIcon';

exports.default = ActionEject;