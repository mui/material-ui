const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

// Convert any console error into a thrown error
const error = console.error;
console.error = (...args) => {
  error.apply(console, args);
  if (args[0] instanceof Error) {
    throw args[0];
  } else {
    // combine multi args into a string
    const message = args
      .map(value => {
        if (typeof value === 'object') {
          return JSON.stringify(value);
        } else {
          return value;
        }
      })
      .join(' ');
    throw new Error(message);
  }
};
