import * as React from 'react';
import { Input as BaseInput } from '@mui/base/Input';
import { Box, styled } from '@mui/system';

const CustomNumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseInput
      slots={{
        input: InputElement,
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function OTPInput() {
  const inputCount = 6;
  const inputRefs = React.useRef(new Array(6).fill(null));
  const [otp, setOtp] = React.useState(new Array(inputCount).fill(''));

  const otpAsString = otp.join('');
  console.log(otpAsString);

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
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case 'ArrowRight':
        if (currentIndex < inputCount - 1) {
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
    setOtp((prev) => {
      const otpArray = [...prev];
      const lastValue = value[value.length - 1];
      otpArray[currentIndex] = lastValue;
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

  return (
    <Box sx={{ display: 'flex', gap: '1rem' }}>
      {new Array(inputCount).fill(null).map((_, index) => (
        <CustomNumberInput
          key={index}
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
      ))}
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
  padding: 8px 12px;
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
