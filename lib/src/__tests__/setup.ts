import '@testing-library/jest-dom';

const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

// Convert any console error into a thrown error
const consoleError = console.error;
const consoleWarn = console.warn;

function logAndThrowArgs(...args: any[]) {
  if (args[0] instanceof Error) {
    throw args[0];
  } else {
    // combine multi args into a string
    const message = args
      .map((value) => {
        if (typeof value === 'object') {
          return JSON.stringify(value);
        } else {
          return value;
        }
      })
      .join(' ');
    throw new Error(message);
  }
}

console.error = (...args: any[]) => {
  consoleError.apply(console, args as any);
  logAndThrowArgs(...args);
};

// Waiting to fix https://github.com/mui-org/material-ui-pickers/issues/1924
if (process.env.UTILS !== 'moment') {
  console.warn = (...args: any[]) => {
    consoleWarn.apply(console, args as any);
    logAndThrowArgs(...args);
  };
}
