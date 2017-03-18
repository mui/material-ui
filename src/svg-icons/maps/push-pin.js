'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let _react = require('react');

let _react2 = _interopRequireDefault(_react);

const _pure = require('recompose/pure');

const _pure2 = _interopRequireDefault(_pure);

const _SvgIcon = require('../../SvgIcon');

const _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MapsPushPin = function MapsPushPin(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M14,11.93V5.876C15,5.56,16.023,5,16.023,4H8.314c0,1,0.576,1.284,1.498,1.601l0.002,6.174C7.99,12.088,6.882,13,6.882,14H11v6h2v-6h4.457C17.457,13,16,12.244,14,11.93z' })
  );
};
MapsPushPin = (0, _pure2.default)(MapsPushPin);
MapsPushPin.displayName = 'MapsPushPin';
MapsPushPin.muiName = 'SvgIcon';

exports.default = MapsPushPin;