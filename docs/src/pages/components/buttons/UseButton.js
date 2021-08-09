import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Stack from '@material-ui/core/Stack';
import { useButton } from '@material-ui/unstyled/ButtonUnstyled';
import { styled } from '@material-ui/system';

const StyledButtonRoot = styled('button')(`
  background-color: #007fff;
  padding: 16px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  font-family: inherit;
  font-size: 16px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color: #0059b2;
  }

  &.active {
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

const CustomButton = React.forwardRef(function CustomButton(props, ref) {
  const { children } = props;
  const button = useButton({
    ...props,
    ref,
    component: StyledButtonRoot,
  });

  const classes = {
    active: button.active,
    disabled: button.disabled,
    focusVisible: button.focusVisible,
  };

  return (
    <StyledButtonRoot {...button.getRootProps()} className={clsx(classes)}>
      {children}
    </StyledButtonRoot>
  );
});

CustomButton.propTypes = {
  children: PropTypes.node,
};

export default function UseButton() {
  return (
    <Stack spacing={2} direction="row">
      <CustomButton onClick={() => console.log('click!')}>Button</CustomButton>
      <CustomButton disabled>Disabled</CustomButton>
    </Stack>
  );
}
