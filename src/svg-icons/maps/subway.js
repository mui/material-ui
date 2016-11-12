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

var MapsSubway = function MapsSubway(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('circle', { cx: '15.5', cy: '16', r: '1' }),
    _react2.default.createElement('circle', { cx: '8.5', cy: '16', r: '1' }),
    _react2.default.createElement('path', { d: 'M7.01 9h10v5h-10zM17.8 2.8C16 2.09 13.86 2 12 2c-1.86 0-4 .09-5.8.8C3.53 3.84 2 6.05 2 8.86V22h20V8.86c0-2.81-1.53-5.02-4.2-6.06zm.2 13.08c0 1.45-1.18 2.62-2.63 2.62l1.13 1.12V20H15l-1.5-1.5h-2.83L9.17 20H7.5v-.38l1.12-1.12C7.18 18.5 6 17.32 6 15.88V9c0-2.63 3-3 6-3 3.32 0 6 .38 6 3v6.88z' })
  );
};
MapsSubway = (0, _pure2.default)(MapsSubway);
MapsSubway.displayName = 'MapsSubway';
MapsSubway.muiName = 'SvgIcon';

exports.default = MapsSubway;