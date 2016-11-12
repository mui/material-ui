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

var ActionPets = function ActionPets(props) {
  return _react2.default.createElement(
    _SvgIcon2.default,
    props,
    _react2.default.createElement('circle', { cx: '4.5', cy: '9.5', r: '2.5' }),
    _react2.default.createElement('circle', { cx: '9', cy: '5.5', r: '2.5' }),
    _react2.default.createElement('circle', { cx: '15', cy: '5.5', r: '2.5' }),
    _react2.default.createElement('circle', { cx: '19.5', cy: '9.5', r: '2.5' }),
    _react2.default.createElement('path', { d: 'M17.34 14.86c-.87-1.02-1.6-1.89-2.48-2.91-.46-.54-1.05-1.08-1.75-1.32-.11-.04-.22-.07-.33-.09-.25-.04-.52-.04-.78-.04s-.53 0-.79.05c-.11.02-.22.05-.33.09-.7.24-1.28.78-1.75 1.32-.87 1.02-1.6 1.89-2.48 2.91-1.31 1.31-2.92 2.76-2.62 4.79.29 1.02 1.02 2.03 2.33 2.32.73.15 3.06-.44 5.54-.44h.18c2.48 0 4.81.58 5.54.44 1.31-.29 2.04-1.31 2.33-2.32.31-2.04-1.3-3.49-2.61-4.8z' })
  );
};
ActionPets = (0, _pure2.default)(ActionPets);
ActionPets.displayName = 'ActionPets';
ActionPets.muiName = 'SvgIcon';

exports.default = ActionPets;