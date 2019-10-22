"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var headingRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-level': '2'
  },
  relatedConcepts: [{
    module: 'HTML',
    concept: {
      name: 'h1'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'h2'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'h3'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'h4'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'h5'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'h6'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure', 'sectionhead']]
};
var _default = headingRole;
exports.default = _default;