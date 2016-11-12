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

var CommunicationChatBubbleOutline = function CommunicationChatBubbleOutline(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z' })
  );
};
CommunicationChatBubbleOutline = (0, _pure2.default)(CommunicationChatBubbleOutline);
CommunicationChatBubbleOutline.displayName = 'CommunicationChatBubbleOutline';
CommunicationChatBubbleOutline.muiName = 'SvgIcon';

exports.default = CommunicationChatBubbleOutline;