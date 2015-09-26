const React = require('react');
const update = require('react-addons-update');

function mergeSingle(objA, objB) {
  if (!objA) return objB;
  if (!objB) return objA;
  return update(objA, {$merge: objB});
}

module.exports = {

  merge() {
    const args = Array.prototype.slice.call(arguments, 0);
    let base = args[0];

    for (let i = 1; i < args.length; i++) {
      if (args[i]) {
        base = mergeSingle(base, args[i]);
      }
    }
    return base;
  },

  mergeItem(obj, key, newValueObject) {
    let command = {};
    command[key] = {$merge: newValueObject};
    return update(obj, command);
  },

  push(array, obj) {
    const newObj = Array.isArray(obj) ? obj : [obj];
    return update(array, {$push: newObj});
  },

  shift(array) {
    return update(array, {$splice: [[0, 1]]});
  },

};
