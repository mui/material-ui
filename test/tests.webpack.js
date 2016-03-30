const testsContext = require.context('./browser', true, /\.(js|jsx)$/);
testsContext.keys().forEach(testsContext);
const componentsContext = require.context(
  '../src/',
  true,
  /^(?!.*(examples|spec.js|-generator.js)).*\.js$/
);
componentsContext.keys().forEach(componentsContext);
