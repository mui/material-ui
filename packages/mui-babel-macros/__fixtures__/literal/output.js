import _formatMuiErrorMessage from '@mui/utils/formatMuiErrorMessage';
throw new Error(
  process.env.NODE_ENV !== 'production'
    ? `MUI: Expected valid input target.
Did you use \`inputComponent\``
    : _formatMuiErrorMessage(1),
);
