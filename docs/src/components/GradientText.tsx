import { styled } from '@material-ui/core/styles';

const GradientText = styled('span')<{
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}>(({ theme, color = 'primary' }) => ({
  background: `linear-gradient(to right, ${theme.palette[color].main}, ${theme.palette[color].dark})`,
  backgroundClip: 'text',
  '-webkit-text-fill-color': 'transparent',
}));

export default GradientText;
