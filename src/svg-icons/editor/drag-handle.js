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

var EditorDragHandle = function EditorDragHandle(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('path', { d: 'M20 9H4v2h16V9zM4 15h16v-2H4v2z' })
  );
};
EditorDragHandle = (0, _pure2.default)(EditorDragHandle);
EditorDragHandle.displayName = 'EditorDragHandle';
EditorDragHandle.muiName = 'SvgIcon';

exports.default = EditorDragHandle;