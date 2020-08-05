/* eslint-disable no-console */
// Makes sure the tests fails when a PropType validation fails.
function consoleError() {
  console.error = (...args) => {
    // Can't use log as karma is not displaying them.
    console.info(...args);
    throw new Error(...args);
  };

  console.warn = (...args) => {
    // Can't use log as karma is not displaying them.
    console.info(...args);
    throw new Error(...args);
  };
}

module.exports = consoleError;
