/** 
*  A recursive merge between two objects. 
* 
*  @param object     - the object whose properties are to be overwritten. It
*                     should be either the root level or some nested level.
*  @param overrides - an object containing properties to be overwritten. It 
*                     should have the same structure as the object object.
*/
var extend = function(object, overrides) {
  var mergeObject = {};

  Object.keys(object).forEach(function(currentKey) {

    var overridesCheck = object[currentKey] && !Array.isArray(object[currentKey]);
    
    // Recursive call to next level
    if (typeof(object[currentKey]) === 'object' && overridesCheck) {
      mergeObject[currentKey] = extend(object[currentKey], overrides[currentKey]);
    } else {
      if (overrides && overrides[currentKey]) {
        mergeObject[currentKey] = overrides[currentKey];
      } else {
        mergeObject[currentKey] = object[currentKey];
      }
    }

    if (Object.keys(overrides) > 0) console.log('unadded props: ', overrides);

  });

  return mergeObject;
};

module.exports = extend;