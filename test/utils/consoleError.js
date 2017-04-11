/* eslint-disable flowtype/require-valid-file-annotation, no-console */

/**
 * Makes sure the tests fails when a PropType validation fails.
 */
function consoleError() {
  console.error = (...args) => {
    console.log(...args);

    // @TODO: Uncomment this when this PR is released to Enzyme (> v2.8.0)
    // https://github.com/airbnb/enzyme/issues/875
    // throw new Error(...args);
  };
}

module.exports = consoleError;
