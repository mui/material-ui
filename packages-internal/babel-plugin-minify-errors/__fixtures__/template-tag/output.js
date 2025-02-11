import { formatErrorMessage } from '@mui/internal-babel-plugin-minify-errors/formatter';

const error = new Error(formatErrorMessage(1));
const errorWithParam = new Error(formatErrorMessage(2, param));
