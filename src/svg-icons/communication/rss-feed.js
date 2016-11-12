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

var CommunicationRssFeed = function CommunicationRssFeed(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('circle', { cx: '6.18', cy: '17.82', r: '2.18' }),
    _react2.default.createElement('path', { d: 'M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z' })
  );
};
CommunicationRssFeed = (0, _pure2.default)(CommunicationRssFeed);
CommunicationRssFeed.displayName = 'CommunicationRssFeed';
CommunicationRssFeed.muiName = 'SvgIcon';

exports.default = CommunicationRssFeed;