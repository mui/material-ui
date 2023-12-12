import { styled, createTheme } from '@mui/material/styles';

// Can use the unstable_sx in the styled() utility
const Test = styled('div')(({ theme }) =>
  theme.unstable_sx({
    color: 'primary.main',
    bgcolor: 'primary.light',
    m: 2,
  }),
);

// Can use the unstable_sx in the theme's variants
const customTheme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: {},
          style: ({ theme }) =>
            theme.unstable_sx({
              m: 2,
              p: 1,
            }),
        },
      ],
    },
  },
});
