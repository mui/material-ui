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

var PlacesGolfCourse = function PlacesGolfCourse(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('circle', { cx: '19.5', cy: '19.5', r: '1.5' }),
    _react2.default.createElement('path', { d: 'M17 5.92L9 2v18H7v-1.73c-1.79.35-3 .99-3 1.73 0 1.1 2.69 2 6 2s6-.9 6-2c0-.99-2.16-1.81-5-1.97V8.98l6-3.06z' })
  );
};
PlacesGolfCourse = (0, _pure2.default)(PlacesGolfCourse);
PlacesGolfCourse.displayName = 'PlacesGolfCourse';
PlacesGolfCourse.muiName = 'SvgIcon';

exports.default = PlacesGolfCourse;