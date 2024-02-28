import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { useCheckbox } from '@mui/base/useCheckbox';

export default function UseCheckboxesBasic() {
  return (
    <div>
      <BasicCheckbox defaultChecked />
      <BasicCheckbox />
      <BasicCheckbox defaultChecked disabled />
      <BasicCheckbox disabled />
    </div>
  );
}

function BasicCheckbox(props) {
  const { getInputProps, checked, disabled, focusVisible } = useCheckbox(props);

  const stateClasses = {
    'Checkbox-checked': checked,
    'Checkbox-disabled': disabled,
    'Checkbox-focusVisible': focusVisible,
  };

  return (
    <BasicCheckboxRoot className={clsx(stateClasses)}>
      <BasicCheckboxInput {...getInputProps()} aria-label="Demo checkbox" />
    </BasicCheckboxRoot>
  );
}

const blue = {
  200: '#99CCF3',
  500: '#007FFF',
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

const BasicCheckboxRoot = styled('span')(
  ({ theme }) => `
  box-sizing: border-box;
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 38px;
  height: 24px;
  margin: 10px;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  border-radius: 24px;
  box-shadow: inset 0px 1px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.05)'
  };

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
  }

  &.Checkbox-focusVisible {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  &.Checkbox-disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.Checkbox-checked {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    background: ${blue[500]};
    box-shadow: inset 0px 1px 1px ${
      theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'
    };
    &.Checkbox-focusVisible {
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
    }
  }

  `,
);

const BasicCheckboxInput = styled('input')`
  box-sizing: border-box;
  cursor: inherit;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
`;
