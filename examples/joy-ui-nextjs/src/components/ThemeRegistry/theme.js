import { Inter } from 'next/font/google';
import { extendTheme } from '@mui/joy/styles';

Inter({
  subsets: ['latin'],
  display: 'swap',
});

const theme = extendTheme({
  components: {
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
