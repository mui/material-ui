"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _set = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/keys"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/map"));

var _rolesMap = _interopRequireDefault(require("./rolesMap"));

var _context;

var roleElementMap = new _map.default([]);
(0, _forEach.default)(_context = (0, _toConsumableArray2.default)((0, _keys.default)(_rolesMap.default).call(_rolesMap.default))).call(_context, function (key) {
  var role = _rolesMap.default.get(key);

  if (role) {
    var _context2, _context3;

    (0, _forEach.default)(_context2 = (0, _concat.default)(_context3 = []).call(_context3, (0, _toConsumableArray2.default)(role.baseConcepts), (0, _toConsumableArray2.default)(role.relatedConcepts))).call(_context2, function (relation) {
      if (relation.module === 'HTML') {
        var concept = relation.concept;

        if (concept) {
          var relationConcepts = roleElementMap.get(key) || new _set.default([]);
          relationConcepts.add(concept);
          roleElementMap.set(key, relationConcepts);
        }
      }
    });
  }
});
var _default = roleElementMap;
exports.default = _default;