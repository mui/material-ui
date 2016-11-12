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

var CommunicationCallMade = function CommunicationCallMade(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z' })
  );
};
CommunicationCallMade = (0, _pure2.default)(CommunicationCallMade);
CommunicationCallMade.displayName = 'CommunicationCallMade';
CommunicationCallMade.muiName = 'SvgIcon';

exports.default = CommunicationCallMade;