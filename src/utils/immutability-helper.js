const React = require('react/addons');
const update = React.addons.update;

module.exports = {

  merge(obj1, obj2) {
    if (!obj1) return obj2;
    if (!obj2) return obj1;
    return update(obj1, {$merge: obj2});
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
    return update(array, {$splice: [[0,1]]});
  },

};
