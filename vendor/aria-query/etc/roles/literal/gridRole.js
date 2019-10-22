"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var gridRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [{
    module: 'HTML',
    concept: {
      name: 'table',
      attributes: [{
        name: 'role',
        value: 'grid'
      }]
    }
  }],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-level': null,
    'aria-multiselectable': null,
    'aria-readonly': null
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredOwnedElements: [['rowgroup', 'row'], ['row']],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'composite'], ['roletype', 'structure', 'section', 'table']]
};
var _default = gridRole;
exports.default = _default;