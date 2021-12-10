import * as React from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';

const blue = {
  200: '#80BFFF',
};

const grey = {
  50: '#F3F6F9',
  100: '#EAEEF3',
  300: '#D7DCE1',
  400: '#BFC7CF',
  900: '#20262D',
};

const StyledInputElement = styled('input')`
  width: 300px;
  font-size: 0.875rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: ${grey[900]};
  background: ${grey[50]};
  border: 1px solid ${grey[300]};
  border-radius: 8px;
  padding: 12px 12px;
  transition: width 150ms ease;

  &:hover {
    background: ${grey[100]};
    border-color: ${grey[400]};
  }

  &:focus {
    outline: 2px solid ${blue[200]};
    width: 320px;
    transition: width 150ms ease-out;
  }
`;

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
  );
});

export default function UnstyledInput() {
  return <CustomInput aria-label="Demo input" placeholder="Type something..." />;
}
