/* eslint-disable react/prop-types */

import * as React from 'react';
import clsx from 'clsx';
import Stack from '@material-ui/core/Stack';
import { useButton } from '@material-ui/unstyled/ButtonUnstyled';
import { styled } from '@material-ui/system';

const StyledButtonRoot = styled('span')(`
  background-color: #007fff;
  padding: 16px 20px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  color: #fff;
  font-weight: bold;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);

  &:hover {
    background-color: #0059b2;
  }

  &:active {
    background-color: #004386;
  }

  &.focusVisible {
    box-shadow: 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`);

function CustomButton(props) {
  const { children } = props;
  const buttonRef = React.useRef(null);
  const button = useButton({
    ...props,
    ref: buttonRef,
    component: StyledButtonRoot,
  });

  const classes = {
    focusVisible: button.focusVisible,
    disabled: button.disabled,
  };

  return (
    <StyledButtonRoot {...button.getRootProps()} className={clsx(classes)}>
      {children}
    </StyledButtonRoot>
  );
}

export default function UseButton() {
  return (
    <Stack spacing={2} direction="row">
      <CustomButton>Button</CustomButton>
      <CustomButton disabled>Disabled</CustomButton>
    </Stack>
  );
}
