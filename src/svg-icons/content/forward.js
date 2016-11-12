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

var ContentForward = function ContentForward(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M12 8V4l8 8-8 8v-4H4V8z' })
  );
};
ContentForward = (0, _pure2.default)(ContentForward);
ContentForward.displayName = 'ContentForward';
ContentForward.muiName = 'SvgIcon';

exports.default = ContentForward;