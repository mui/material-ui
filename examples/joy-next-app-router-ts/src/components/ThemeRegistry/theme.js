import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  components: {
    JoyTypography: {
      styleOverrides: {
        root:{
          fontFamily: 'var(--font-public-sans)'
        },
      },
    },
    JoyButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === 'primary' && {
            backgroundColor: '#4338ca',
          }),
        }),
      },
    },
  },
});

export default theme;
