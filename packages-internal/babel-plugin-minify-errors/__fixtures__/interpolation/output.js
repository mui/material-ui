import _formatErrorMessage from '@mui/utils/formatMuiErrorMessage';
const foo = 'foo';
const bar = 'bar';
throw new Error(
  process.env.NODE_ENV !== 'production' ? `MUI: ${foo}, ${bar}` : _formatErrorMessage(1, foo, bar),
);
throw new Error(
  process.env.NODE_ENV !== 'production'
    ? `MUI: ${foo}` + `, ${bar}`
    : _formatErrorMessage(1, foo, bar),
);
throw new Error(
  process.env.NODE_ENV !== 'production'
    ? 'MUI: ' + `${foo}, ${bar}`
    : _formatErrorMessage(1, foo, bar),
);
