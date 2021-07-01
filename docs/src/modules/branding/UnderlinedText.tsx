import { styled, alpha } from '@material-ui/core/styles';

const UnderlinedText = styled('span', {
  shouldForwardProp: (prop) => prop !== 'mode',
})<{ mode?: 'light' | 'dark' }>(({ mode = 'light', theme }) => ({
  backgroundImage: `linear-gradient(to right, ${alpha(
    theme.palette.vividBlue,
    mode === 'light' ? 0.4 : 0.7,
  )} 75%, ${alpha(theme.palette.vividBlue, mode === 'light' ? 0.4 : 0.7)} 75%)`,
  backgroundPosition: '0 0.9em',
  backgroundRepeat: 'repeat-x',
  backgroundSize: '1px 0.147em',
}));

export default UnderlinedText;
