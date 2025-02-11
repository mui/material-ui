import customTagName from '@mui/internal-babel-plugin-minify-errors/tag';

const error = new Error(customTagName`This is a minified error message`);
const errorWithParam = new Error(customTagName`This is a minified error message with ${param}`);
