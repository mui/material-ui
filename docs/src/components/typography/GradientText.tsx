import { styled } from '@mui/material/styles';

const GradientText = styled('span')<{
  color?: 'primary' | 'error' | 'success' | 'warning';
}>(({ theme, color = 'primary' }) => ({
  background: `linear-gradient(90deg, ${(theme.vars || theme).palette[color][400]} 5%, ${
    (theme.vars || theme).palette[color].main
  } 90%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

export default GradientText;
