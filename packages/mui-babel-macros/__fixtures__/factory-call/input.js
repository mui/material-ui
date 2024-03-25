import MuiError from '@mui/internal-babel-macros/MuiError.macro';

// `throw Error(message)` is valid JS but we limit error construction to a single syntax.
throw MuiError('my message');
