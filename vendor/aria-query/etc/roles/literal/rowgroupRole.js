"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var rowgroupRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [{
    module: 'HTML',
    concept: {
      name: 'tbody'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'tfoot'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'thead'
    }
  }],
  childrenPresentational: false,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-activedescendant': null,
    'aria-expanded': null
  },
  relatedConcepts: [],
  requireContextRole: ['grid', 'table', 'treegrid'],
  requiredOwnedElements: [['row']],
  requiredProps: {},
  superClass: [['roletype', 'structure']]
};
var _default = rowgroupRole;
exports.default = _default;