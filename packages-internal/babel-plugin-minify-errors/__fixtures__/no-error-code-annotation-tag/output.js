import minifyError from '@mui/internal-babel-plugin-minify-errors/tag';
throw new Error(
  /* FIXME (minify-errors-in-prod): Unminified error message in production build! */ minifyError`MUI: Expected valid input target.\nDid you use inputComponent`,
);
