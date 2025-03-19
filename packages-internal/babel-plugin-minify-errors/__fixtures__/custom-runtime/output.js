import _formatErrorMessage from '@custom/error-formatter';
throw new Error(
  process.env.NODE_ENV !== 'production'
    ? 'MUI: This is a test error message.\n' + 'With a second line.'
    : _formatErrorMessage(42),
);
