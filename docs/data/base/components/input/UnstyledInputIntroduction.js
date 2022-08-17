import * as React from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#C3D1DF',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 320px;
  font-size: 0.875rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 2px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 12px;
  padding: 12px 12px;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[300]};

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : blue[400]};
  }

  &:focus, hover {
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }
`,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
  );
});

export default function UnstyledInputBasic() {
  return <CustomInput aria-label="Demo input" placeholder="Type something…" />;
}
