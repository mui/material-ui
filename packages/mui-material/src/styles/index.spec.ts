import { experimental_sx as sx, styled, createTheme } from '@mui/material/styles';

// Can use the experimental_sx in the styled() utility
const Test = styled('div')(
  sx({
    color: 'primary.main',
    bgcolor: 'primary.light',
    m: 2,
  }),
);

// Can use the experimental_sx in the theme's variants
const customTheme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: {},
          style: sx({
            m: 2,
            p: 1,
          }),
        },
      ],
    },
  },
});
