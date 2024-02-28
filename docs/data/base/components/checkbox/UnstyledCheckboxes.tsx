import * as React from 'react';
import { styled } from '@mui/system';
import { Checkbox, checkboxClasses } from '@mui/base/Checkbox';

export default function UnstyledCheckboxes() {
  const label = { slotProps: { input: { 'aria-label': 'Demo checkbox' } } };

  return (
    <div>
      <Checkbox
        slots={{
          root: Root,
        }}
        {...label}
        defaultChecked
      />
      <Checkbox
        slots={{
          root: Root,
        }}
        {...label}
      />
      <Checkbox
        slots={{
          root: Root,
        }}
        {...label}
        defaultChecked
        disabled
      />
      <Checkbox
        slots={{
          root: Root,
        }}
        {...label}
        disabled
      />
    </div>
  );
}
const blue = {
  200: '#99CCF3',
  500: '#007FFF',
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

const Root = styled('span')(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 38px;
  height: 24px;
  margin: 10px;
  cursor: pointer;

  &.${checkboxClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${checkboxClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `,
);
