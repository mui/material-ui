const testsContext = require.context('./browser', true, /\.(js|jsx)$/);
testsContext.keys().forEach(testsContext);
const componentsContext = require.context('../src/', true, /.*[^(generator|\.spec)]\.(js|jsx)$/);
componentsContext.keys().forEach(componentsContext);
