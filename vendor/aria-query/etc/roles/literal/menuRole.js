"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var menuRole = {
  abstract: false,
  accessibleNameRequired: false,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-orientation': 'vertical'
  },
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'list'
    }
  }, {
    module: 'DTB',
    concept: {
      name: 'sidebar'
    }
  }, {
    module: 'XForms',
    concept: {
      name: 'select'
    }
  }, {
    module: 'JAPI',
    concept: {
      name: 'MENU'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [['group', 'menuitemradio'], ['menuitem'], ['menuitemcheckbox'], ['menuitemradio']],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
};
var _default = menuRole;
exports.default = _default;