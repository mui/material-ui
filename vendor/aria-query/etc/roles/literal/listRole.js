"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var listRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [{
    module: 'HTML',
    concept: {
      name: 'ol'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'ul'
    }
  }],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {},
  relatedConcepts: [],
  requireContextRole: [],
  requiredOwnedElements: [['group', 'listitem'], ['listitem']],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'section']]
};
var _default = listRole;
exports.default = _default;