import * as React from 'react';
import clsx from 'clsx';
import { styled } from '@mui/system';
import { useCheckbox, UseCheckboxParameters } from '@mui/base/useCheckbox';

export default function UseCheckboxesCustom() {
  return <MUICheckbox defaultChecked />;
}

function MUICheckbox(props: UseCheckboxParameters) {
  const { getInputProps, checked, disabled, focusVisible } = useCheckbox(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };

  return (
    <CheckboxRoot className={clsx(stateClasses)}>
      <CheckboxInput {...getInputProps()} aria-label="Demo checkbox" />
    </CheckboxRoot>
  );
}

const blue = {
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

const CheckboxRoot = styled('span')`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 36px;
  padding: 8px;
`;

const CheckboxInput = styled('input')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`;
