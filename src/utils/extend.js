// http://stackoverflow.com/questions/1187518/javascript-array-difference
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

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

    // Arrays and null are also objects, 
    var overridesIsValidObject = object[currentKey] && !Array.isArray(object[currentKey]);
    
    // Recursive call to next level
    if (typeof(object[currentKey]) === 'object' && overridesIsValidObject) {
      mergeObject[currentKey] = extend(object[currentKey], overrides[currentKey]);
    } else {
      if (overrides && overrides[currentKey]) {
        mergeObject[currentKey] = overrides[currentKey];
      } else {
        mergeObject[currentKey] = object[currentKey];
      }
    }

  });

  // Overrides not defined in object are immediately added.
  if (overrides && typeof(overrides) === 'object' && !Array.isArray(overrides)) {
    Object.keys(overrides).diff(Object.keys(object)).forEach(function(currentDiff) {
      mergeObject[currentDiff] = overrides[currentDiff];
    });
  }

  return mergeObject;
};

module.exports = extend;