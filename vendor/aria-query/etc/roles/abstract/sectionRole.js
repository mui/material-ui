"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var sectionRole = {
  abstract: true,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: [],
  props: {
    'aria-expanded': null
  },
  relatedConcepts: [{
    module: 'DTB',
    concept: {
      name: 'frontmatter'
    }
  }, {
    module: 'DTB',
    concept: {
      name: 'level'
    }
  }, {
    module: 'SMIL',
    concept: {
      name: 'level'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'structure']]
};
var _default = sectionRole;
exports.default = _default;