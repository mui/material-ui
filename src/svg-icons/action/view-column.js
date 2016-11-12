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

var ActionViewColumn = function ActionViewColumn(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z' })
  );
};
ActionViewColumn = (0, _pure2.default)(ActionViewColumn);
ActionViewColumn.displayName = 'ActionViewColumn';
ActionViewColumn.muiName = 'SvgIcon';

exports.default = ActionViewColumn;