import _formatErrorMessage from '@mui/utils/formatMuiErrorMessage';
throw new Error(process.env.NODE_ENV !== 'production' ? 'exists' : _formatErrorMessage(1));
throw new Error(process.env.NODE_ENV !== 'production' ? 'will be created' : _formatErrorMessage(2));
