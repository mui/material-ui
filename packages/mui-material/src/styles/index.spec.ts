import { unstable_sx as sx, styled, createTheme } from '@mui/material/styles';

// Can use the unstable_sx in the styled() utility
const Test = styled('div')(({ theme }) =>
  sx(
    {
      color: 'primary.main',
      bgcolor: 'primary.light',
      m: 2,
    },
    theme,
  ),
);

const defaultTheme = createTheme();

// Can use the unstable_sx in the theme's variants
const customTheme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: {},
          style: ({ theme }) =>
            sx(
              {
                m: 2,
                p: 1,
              },
              defaultTheme,
            ),
        },
      ],
    },
  },
});
