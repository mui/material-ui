"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var tabRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-posinset': null,
    'aria-selected': 'false',
    'aria-setsize': null
  },
  relatedConcepts: [],
  requireContextRole: ['tablist'],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'sectionhead'], ['roletype', 'widget']]
};
var _default = tabRole;
exports.default = _default;