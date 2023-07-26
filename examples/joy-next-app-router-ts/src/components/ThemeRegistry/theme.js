import { Public_Sans } from 'next/font/google';
import { extendTheme } from '@mui/joy/styles';

const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const theme = extendTheme({
  fontFamily: {
    body: publicSans.style.fontFamily,
  },
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
