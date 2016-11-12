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

var ActionChangeHistory = function ActionChangeHistory(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M12 7.77L18.39 18H5.61L12 7.77M12 4L2 20h20L12 4z' })
  );
};
ActionChangeHistory = (0, _pure2.default)(ActionChangeHistory);
ActionChangeHistory.displayName = 'ActionChangeHistory';
ActionChangeHistory.muiName = 'SvgIcon';

exports.default = ActionChangeHistory;