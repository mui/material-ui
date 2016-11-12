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

var MapsNavigation = function MapsNavigation(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z' })
  );
};
MapsNavigation = (0, _pure2.default)(MapsNavigation);
MapsNavigation.displayName = 'MapsNavigation';
MapsNavigation.muiName = 'SvgIcon';

exports.default = MapsNavigation;