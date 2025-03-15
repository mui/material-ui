import _formatErrorMessage from '@mui/utils/formatMuiErrorMessage';
throw new Error(
  process.env.NODE_ENV !== 'production'
    ? 'MUI: Expected valid input target.\n' + 'Did you use `inputComponent`'
    : _formatErrorMessage(1),
);
throw new Error(
  process.env.NODE_ENV !== 'production'
    ? `MUI: Expected valid input target.\n` + `Did you use \`inputComponent\``
    : _formatErrorMessage(1),
);
