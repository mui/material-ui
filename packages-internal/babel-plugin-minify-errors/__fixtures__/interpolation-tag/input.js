import minifyError from '@mui/internal-babel-plugin-minify-errors/tag';
const foo = 'foo';
const bar = 'bar';
throw  new Error(minifyError`MUI: ${foo}, ${bar}`);
