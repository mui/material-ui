import * as React from 'react';
import useNumberInput, { UseNumberInputParameters } from '@mui/base/useNumberInput';
import { styled } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';

const CompactNumberInput = React.forwardRef(function CompactNumberInput(
  props: UseNumberInputParameters & React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const {
    getRootProps,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput(props);

  const inputProps = getInputProps();

  inputProps.ref = useForkRef(inputProps.ref, ref);

  return (
    <StyledInputRoot {...getRootProps()}>
      <StyledStepperButton
        className="increment"
        {...getIncrementButtonProps()}
        tabIndex={0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
            fill="currentColor"
          />
        </svg>
      </StyledStepperButton>
      <StyledStepperButton
        className="decrement"
        {...getDecrementButtonProps()}
        tabIndex={0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
            fill="currentColor"
          />
        </svg>
      </StyledStepperButton>
      <HiddenInput {...props} {...inputProps} />
    </StyledInputRoot>
  );
});

export default function UseNumberInputCompact() {
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <Layout>
      <CompactNumberInput
        aria-label="Compact number input"
        placeholder="Type a number…"
        value={value}
        onValueChange={(val) => setValue(val)}
      />

      <pre>Current value: {value ?? ' '}</pre>
    </Layout>
  );
}

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledInputRoot = styled('div')(
  ({ theme }) => `
    display: grid;
    grid-template-columns: 2.5rem;
    grid-template-rows: 2rem 2rem;
    row-gap: 1px;
    border-radius: 0.5rem;
    border-style: solid;
    border-width: 1px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    overflow: auto;

    &:hover {
      border-color: ${blue[500]};
    }
  `,
);

const HiddenInput = styled('input')`
  visibility: hidden;
  position: absolute;
`;

const StyledStepperButton = styled('button')(
  ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  font-size: 0.875rem;
  box-sizing: border-box;
  border: 0;
  color: inherit;
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    cursor: pointer;
    background: ${blue[500]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
    background: ${blue[500]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[50]};
  }

  &.increment {
    border-top-left-radius: 0.35rem;
    border-top-right-radius: 0.35rem;
  }

  &.decrement {
    border-bottom-left-radius: 0.35rem;
    border-bottom-right-radius: 0.35rem;
  }
`,
);

const Layout = styled('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  column-gap: 2rem;
`;
