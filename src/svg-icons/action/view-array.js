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

var ActionViewArray = function ActionViewArray(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M4 18h3V5H4v13zM18 5v13h3V5h-3zM8 18h9V5H8v13z' })
  );
};
ActionViewArray = (0, _pure2.default)(ActionViewArray);
ActionViewArray.displayName = 'ActionViewArray';
ActionViewArray.muiName = 'SvgIcon';

exports.default = ActionViewArray;