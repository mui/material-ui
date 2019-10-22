"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var switchRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-checked': 'false'
  },
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'button'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    'aria-checked': 'false'
  },
  superClass: [['roletype', 'widget', 'input', 'checkbox']]
};
var _default = switchRole;
exports.default = _default;