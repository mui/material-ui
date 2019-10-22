"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var tableRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [{
    module: 'HTML',
    concept: {
      name: 'table'
    }
  }],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-colcount': null,
    'aria-rowcount': null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredOwnedElements: [['row'], ['rowgroup', 'row']],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section']]
};
var _default = tableRole;
exports.default = _default;