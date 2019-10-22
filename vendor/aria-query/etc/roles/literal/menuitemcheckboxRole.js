"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var menuitemcheckboxRole = {
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
      name: 'menuitem'
    }
  }],
  requireContextRole: ['menu', 'menubar'],
  requiredOwnedElements: [],
  requiredProps: {
    'aria-checked': null
  },
  superClass: [['roletype', 'widget', 'command', 'menuitem'], ['roletype', 'widget', 'input', 'checkbox']]
};
var _default = menuitemcheckboxRole;
exports.default = _default;