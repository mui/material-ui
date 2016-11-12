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

var CommunicationCallMissed = function CommunicationCallMissed(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M19.59 7L12 14.59 6.41 9H11V7H3v8h2v-4.59l7 7 9-9z' })
  );
};
CommunicationCallMissed = (0, _pure2.default)(CommunicationCallMissed);
CommunicationCallMissed.displayName = 'CommunicationCallMissed';
CommunicationCallMissed.muiName = 'SvgIcon';

exports.default = CommunicationCallMissed;