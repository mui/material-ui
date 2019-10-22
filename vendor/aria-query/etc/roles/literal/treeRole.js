"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var treeRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-multiselectable': null,
    'aria-required': null,
    'aria-orientation': 'vertical'
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredOwnedElements: [['group', 'treeitem'], ['treeitem']],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
};
var _default = treeRole;
exports.default = _default;