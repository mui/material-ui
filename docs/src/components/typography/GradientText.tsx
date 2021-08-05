import { styled } from '@material-ui/core/styles';

const GradientText = styled('span')<{
  color?: 'primary' | 'error' | 'success' | 'warning';
}>(({ theme, color = 'primary' }) => ({
  background:
    theme.palette.mode === 'dark'
      ? theme.palette.primary.main
      : `linear-gradient(to right, ${theme.palette[color].main}, ${theme.palette[color][700]})`,
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

export default GradientText;
