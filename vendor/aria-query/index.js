"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.roleElements = exports.elementRoles = exports.roles = exports.dom = exports.aria = void 0;

var _ariaPropsMap = _interopRequireDefault(require("./ariaPropsMap"));

var _domMap = _interopRequireDefault(require("./domMap"));

var _rolesMap = _interopRequireDefault(require("./rolesMap"));

var _elementRoleMap = _interopRequireDefault(require("./elementRoleMap"));

var _roleElementMap = _interopRequireDefault(require("./roleElementMap"));

var aria = _ariaPropsMap.default;
exports.aria = aria;
var dom = _domMap.default;
exports.dom = dom;
var roles = _rolesMap.default;
exports.roles = roles;
var elementRoles = _elementRoleMap.default;
exports.elementRoles = elementRoles;
var roleElements = _roleElementMap.default;
exports.roleElements = roleElements;