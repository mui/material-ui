import { experimentalStyled as styled, alpha } from '@material-ui/core/styles';

const UnderlinedText = styled('span')(({ theme }) => ({
  backgroundImage: `linear-gradient(to right, ${alpha(theme.palette.vividBlue, 0.4)} 75%, ${alpha(
    theme.palette.vividBlue,
    0.4,
  )} 75%)`,
  backgroundPosition: '0 0.9em',
  backgroundRepeat: 'repeat-x',
  backgroundSize: '1px 0.147em',
}));

export default UnderlinedText;
