import { styled } from '@mui/material/styles';

const GradientText = styled('span')<{
  color?: 'primary' | 'error' | 'success' | 'warning';
}>(({ theme, color = 'primary' }) => ({
  background: `linear-gradient(to right, ${(theme.vars || theme).palette[color].main}, ${
    (theme.vars || theme).palette[color][700]
  })`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  ...theme.applyDarkStyles({
    background: (theme.vars || theme).palette.primary[300],
    WebkitBackgroundClip: 'text',
  }),
}));

export default GradientText;
