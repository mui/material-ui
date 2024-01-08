import _formatMuiErrorMessage from '@mui/utils/formatMuiErrorMessage';
throw new Error(process.env.NODE_ENV !== 'production' ? `exists` : _formatMuiErrorMessage(1));
throw new Error(
  process.env.NODE_ENV !== 'production' ? `will be created` : _formatMuiErrorMessage(2),
);
