import MuiError from '@material-ui/utils/macros/MuiError.macro';

// `throw Error(message)` is valid JS but we limit error construction to a single syntax.
throw MuiError('my message');
