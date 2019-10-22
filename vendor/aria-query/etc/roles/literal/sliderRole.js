"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var sliderRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: true,
  nameFrom: ['author'],
  props: {
    'aria-orientation': 'horizontal',
    'aria-readonly': null,
    'aria-valuemax': '100',
    'aria-valuemin': '0',
    'aria-valuenow': '50'
  },
  relatedConcepts: [],
  requireContextRole: [],
  requiredOwnedElements: [],
  requiredProps: {
    'aria-valuemax': '100',
    'aria-valuemin': '0',
    'aria-valuenow': '50'
  },
  superClass: [['roletype', 'widget', 'input'], ['roletype', 'widget', 'range']]
};
var _default = sliderRole;
exports.default = _default;