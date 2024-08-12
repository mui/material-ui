import { ButtonRoot } from '../Button';
import { styled } from '../zero-styled';

const ButtonMd3 = styled(ButtonRoot)(() => {
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
