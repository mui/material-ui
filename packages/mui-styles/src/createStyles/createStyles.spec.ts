import { createStyles } from '@mui/styles';

{
  // Missing types for @font-face
  // https://github.com/mui/material-ui/issues/15771

  // Object
  createStyles({
    '@global': {
      '@font-face': {
        fontFamily: '...',
        src: '...',
        fallbacks: [{ fontFamily: '...', src: '...' }],
      },
    },
  });

  // Array
  createStyles({
    '@global': {
      '@font-face': [
        {
          fontFamily: '...',
          src: '...',
          fallbacks: [{ fontFamily: '...', src: '...' }],
        },
        {
          fontFamily: '...',
          src: '...',
        },
      ],
    },
  });
}
