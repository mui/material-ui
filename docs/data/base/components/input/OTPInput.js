import * as React from 'react';
import { Input as BaseInput } from '@mui/base/Input';
import { Box, styled } from '@mui/system';

function OTP({ seperator, inputCount }) {
  const inputRefs = React.useRef(new Array(6).fill(null));
  const [otp, setOtp] = React.useState(new Array(inputCount).fill(''));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case 'ArrowLeft':
        if (currentIndex > 0) {
          event.preventDefault();
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case 'ArrowRight':
        if (currentIndex < inputCount - 1) {
          event.preventDefault();
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case 'Backspace':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        setOtp((prev) => {
          const otpArray = [...prev];
          otpArray.splice(currentIndex, 1);
          otpArray.push('');
          return otpArray;
        });

        break;
      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const value = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (otp[indexToEnter] && indexToEnter < currentIndex) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    setOtp((prev) => {
      const otpArray = [...prev];
      const lastValue = value[value.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray;
    });
    if (value !== '') {
      if (currentIndex < inputCount - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex);
  };

  return new Array(inputCount).fill(null).map((_, index) => (
    <React.Fragment key={index}>
      <BaseInput
        slots={{
          input: InputElement,
        }}
        aria-label="OTP input field"
        slotProps={{
          input: {
            ref: (ele) => {
              inputRefs.current[index] = ele;
            },
            onKeyDown: (event) => handleKeyDown(event, index),
            onChange: (event) => handleChange(event, index),
            onClick: (event) => handleClick(event, index),
            value: otp[index],
          },
        }}
      />
      {index === inputCount - 1 ? null : seperator}
    </React.Fragment>
  ));
}

export default function OTPInput() {
  return (
    <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <OTP seperator={<span>-</span>} inputCount={6} />
    </Box>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputElement = styled('input')(
  ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);
