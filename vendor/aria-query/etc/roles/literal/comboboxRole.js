"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var comboboxRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author'],
  props: {
    'aria-expanded': 'false',
    'aria-autocomplete': null,
    'aria-required': null,
    'aria-haspopup': 'listbox',
    'aria-readonly': null
  },
  relatedConcepts: [{
    module: 'XForms',
    concept: {
      name: 'select'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'select'
    }
  }],
  requireContextRole: [],
  requiredOwnedElements: [['textbox'], ['listbox'], ['tree'], ['grid'], ['dialog']],
  requiredProps: {
    'aria-controls': null,
    'aria-expanded': 'false'
  },
  superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
};
var _default = comboboxRole;
exports.default = _default;