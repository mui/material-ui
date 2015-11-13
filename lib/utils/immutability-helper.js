'use strict';

var React = require('react');
var update = require('react-addons-update');

function mergeSingle(objA, objB) {
  if (!objA) return objB;
  if (!objB) return objA;
  return update(objA, { $merge: objB });
}

module.exports = {

  merge: function merge() {
    var args = Array.prototype.slice.call(arguments, 0);
    var base = args[0];

    for (var i = 1; i < args.length; i++) {
      if (args[i]) {
        base = mergeSingle(base, args[i]);
      }
    }
    return base;
  },

  mergeItem: function mergeItem(obj, key, newValueObject) {
    var command = {};
    command[key] = { $merge: newValueObject };
    return update(obj, command);
  },

  push: function push(array, obj) {
    var newObj = Array.isArray(obj) ? obj : [obj];
    return update(array, { $push: newObj });
  },

  shift: function shift(array) {
    return update(array, { $splice: [[0, 1]] });
  }

};