"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var roletypeRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-atomic': null,
    'aria-busy': null,
    'aria-controls': null,
    'aria-current': null,
    'aria-describedby': null,
    'aria-details': null,
    'aria-disabled': null,
    'aria-dropeffect': null,
    'aria-errormessage': null,
    'aria-flowto': null,
    'aria-grabbed': null,
    'aria-haspopup': null,
    'aria-hidden': null,
    'aria-invalid': null,
    'aria-keyshortcuts': null,
    'aria-label': null,
    'aria-labelledby': null,
    'aria-live': null,
    'aria-owns': null,
    'aria-relevant': null,
    'aria-roledescription': null
  },
  relatedConcepts: [{
    module: 'XHTML',
    concept: {
      name: 'role'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'rel'
    }
  }, {
    module: 'Dublin Core',
    concept: {
      name: 'type'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: []
};
var _default = roletypeRole;
exports.default = _default;