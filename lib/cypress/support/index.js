// @ts-nocheck
Cypress.on('window:load', win => {
  win.ReactDOM = window.ReactDOM || win.ReactDOM;
});

// require('./commands.tsx');
// require('cypress-react-unit-test');

// Cypress.Commands.overwrite('get', (originalFn, selector, options) => {
//   console.log(selector, options);

//   const result = originalFn(`window .spec-frame ${selector}`, options)
//   result.then(console.log
// });
