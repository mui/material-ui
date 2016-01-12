import update from 'react-addons-update';

function mergeSingle(objA, objB) {
  if (!objA) return objB;
  if (!objB) return objA;
  return update(objA, {$merge: objB});
}

export default {

  merge(base, ...args) {
    for (let i = 0; i < args.length; i++) {
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
