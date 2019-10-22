"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var linkRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-expanded': null
  },
  relatedConcepts: [{
    module: 'HTML',
    concept: {
      name: 'a',
      attributes: [{
        name: 'href'
      }]
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'area',
      attributes: [{
        name: 'href'
      }]
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'link'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'command']]
};
var _default = linkRole;
exports.default = _default;