"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;
var menuitemRole = {
  abstract: false,
  accessibleNameRequired: true,
  baseConcepts: [],
  childrenPresentational: false,
  nameFrom: ['author', 'contents'],
  props: {
    'aria-posinset': null,
    'aria-setsize': null
  },
  relatedConcepts: [{
    module: 'ARIA',
    concept: {
      name: 'option'
    }
  }, {
    module: 'ARIA',
    concept: {
      name: 'listitem'
    }
  }, {
    module: 'HTML',
    concept: {
      name: 'menuitem'
    }
  }, {
    module: 'JAPI',
    concept: {
      name: 'MENU_ITEM'
    }
  }],
  requireContextRole: ['group', 'menu', 'menubar'],
  requiredOwnedElements: [],
  requiredProps: {},
  superClass: [['roletype', 'widget', 'command']]
};
var _default = menuitemRole;
exports.default = _default;