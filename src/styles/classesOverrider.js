// @flow
/* eslint-disable */
const classesOverrider = (classes, overrideKeys) => {
  let obj = {};
  overrideKeys.map(o => {
    obj[o] = classes[o];
  });
  return obj;
}
/* eslint-enable */

export default classesOverrider;
