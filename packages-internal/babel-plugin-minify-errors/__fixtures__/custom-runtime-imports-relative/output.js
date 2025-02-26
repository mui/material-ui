import _formatErrorMessage from './error/formatter.js';
throw new Error(
  process.env.NODE_ENV !== 'production'
    ? 'MUI: This is a test error message.\n' + 'With a second line.'
    : _formatErrorMessage(42),
);
