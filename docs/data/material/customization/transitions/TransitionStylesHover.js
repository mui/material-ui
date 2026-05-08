import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';

const customTheme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
  },
  transitions: {
    reducedMotion: 'system',
  },
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  cursor: 'pointer',
  backgroundColor: theme.palette.primary.main,
  ...theme.transitions.createStyles(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    transform: 'scale(1.3)',
  },
}));

export default function TransitionStylesHover() {
  return (
    <ThemeProvider theme={customTheme}>
      <StyledAvatar>OP</StyledAvatar>
    </ThemeProvider>
  );
}
