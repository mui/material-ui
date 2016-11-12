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

var SocialSentimentNeutral = function SocialSentimentNeutral(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M9 14h6v1.5H9z' }),
    _react2.default.createElement('circle', { cx: '15.5', cy: '9.5', r: '1.5' }),
    _react2.default.createElement('circle', { cx: '8.5', cy: '9.5', r: '1.5' }),
    _react2.default.createElement('path', { d: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' })
  );
};
SocialSentimentNeutral = (0, _pure2.default)(SocialSentimentNeutral);
SocialSentimentNeutral.displayName = 'SocialSentimentNeutral';
SocialSentimentNeutral.muiName = 'SvgIcon';

exports.default = SocialSentimentNeutral;