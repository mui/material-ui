import { styled } from '@mui/material/styles';

const GradientText = styled('span')<{
  color?: 'primary' | 'error' | 'success' | 'warning';
}>(({ theme, color = 'primary' }) => ({
  background:
    theme.palette.mode === 'dark'
      ? theme.palette.primary[300]
      : `linear-gradient(to right, ${theme.palette[color].main}, ${theme.palette[color][700]})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

export default GradientText;
