import { styled } from '@mui/material/styles';

const GradientText = styled('span')<{
  color?: 'primary' | 'error' | 'success' | 'warning';
}>(({ theme, color = 'primary' }) => ({
  ...(!theme.vars
    ? {
        background:
          theme.palette.mode === 'dark'
            ? theme.palette.primary.main
            : `linear-gradient(to right, ${theme.palette[color].main}, ${theme.palette[color][700]})`,
      }
    : {
        background: `linear-gradient(to right, ${theme.vars.palette[color].main}, ${theme.vars.palette[color][700]})`,
        [theme.getColorSchemeSelector('dark')]: {
          background: theme.vars.palette.primary.main,
          WebkitBackgroundClip: 'text',
        },
      }),
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

export default GradientText;
