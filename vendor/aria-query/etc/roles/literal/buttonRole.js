"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var buttonRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [{
    module: 'HTML',
    concept: {
      name: 'button'
    }
  }],
  childrenPresentational: true,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-expanded': null,
    'aria-pressed': null
  },
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'link'
    }
  }, {
    module: 'XForms',
    concept: {
      name: 'trigger'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'command']]
};
var _default = buttonRole;
exports.default = _default;