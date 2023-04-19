import * as React from 'react';
import NumberInputUnstyled, {
  NumberInputUnstyledProps,
  numberInputUnstyledClasses,
} from '@mui/base/NumberInputUnstyled';
import { styled } from '@mui/system';

const CustomNumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputUnstyledProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <NumberInputUnstyled
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: '▴',
        },
        decrementButton: {
          // it's flipped with CSS, the downward pointing
          // triangle looks weird
          children: '▴',
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function UnstyledNumberInputBasic() {
  const [value, setValue] = React.useState<number | undefined>();
  return (
    <CustomNumberInput
      aria-label="Demo number input"
      placeholder="Type a number…"
      value={value}
      onValueChange={(event, val) => setValue(val)}
    />
  );
}

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  border-radius: 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  display: grid;
  grid-template-columns: 1fr 24px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;


  &.${numberInputUnstyledClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledInputElement = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 12px 12px;
  outline: 0;
`,
);

const StyledButton = styled('button')(
  ({ theme }) => `
  width: 24px;
  height: 24px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 0;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    cursor: pointer;
  }

  &.${numberInputUnstyledClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
  }
  
  &.${numberInputUnstyledClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    transform: rotate(180deg);
  }
`,
);
