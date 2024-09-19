import { ButtonBaseRoot } from '../ButtonBase/ButtonBase';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    primary: true;
    secondary: true;
    tertiary: true;
    error: true;
  }

  interface ButtonPropsSizeOverrides {}

  interface ButtonPropsVariantOverrides {
    elevated: true;
    filled: true;
    filledTonal: true;
    outlined: true;
    text: true;
  }
}

const ButtonMd3 = styled(ButtonBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiButton',
  slot: 'Root',
})(() => {
  return {
    '--md-sys-color-outline': '#747775',
    color: '#6442d6',
    border: '1px solid var(--md-sys-color-outline)',
    borderRadius: '20px',
    padding: '10px 16px',
  };
});

const slots = {
  MuiButton: {
    slots: {
      root: ButtonMd3,
    },
  },
};

export default slots;
