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

var MapsNearMe = function MapsNearMe(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z' })
  );
};
MapsNearMe = (0, _pure2.default)(MapsNearMe);
MapsNearMe.displayName = 'MapsNearMe';
MapsNearMe.muiName = 'SvgIcon';

exports.default = MapsNearMe;