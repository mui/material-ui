/* eslint-disable */
// file is bundled untranspiled. we need to be as low level as possible

var isConcurrent = true;

// Add the strict mode back once the number of warnings is manageable.
// We might miss important warnings by keeping the strict mode 🌊🌊🌊.
var isStrict = isConcurrent || false;

module.exports = { isConcurrent, isStrict };
