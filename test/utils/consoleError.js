/* eslint-disable flowtype/require-valid-file-annotation, no-console */

/**
 * Makes sure the tests fails when a PropType validation fails.
 */
function consoleError() {
  console.error = (...args) => {
    console.log(...args);
    throw new Error(...args);
  };
}

module.exports = consoleError;
