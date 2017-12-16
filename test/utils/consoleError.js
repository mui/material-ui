/* eslint-disable no-console */

// Makes sure the tests fails when a PropType validation fails.
export default function consoleError() {
  console.error = (...args) => {
    // Can't use log as karma is not displaying them.
    console.info(...args);
    throw new Error(...args);
  };
}
