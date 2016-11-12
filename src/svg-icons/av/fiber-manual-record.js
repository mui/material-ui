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

var AvFiberManualRecord = function AvFiberManualRecord(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('circle', { cx: '12', cy: '12', r: '8' })
  );
};
AvFiberManualRecord = (0, _pure2.default)(AvFiberManualRecord);
AvFiberManualRecord.displayName = 'AvFiberManualRecord';
AvFiberManualRecord.muiName = 'SvgIcon';

exports.default = AvFiberManualRecord;