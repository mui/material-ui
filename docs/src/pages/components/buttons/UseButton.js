import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Stack from '@material-ui/core/Stack';
import { useButton } from '@material-ui/unstyled/ButtonUnstyled';
import { styled } from '@material-ui/system';

const CustomButtonRoot = styled('button')(`
  background-color: #007fff;
  padding: 15px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color: #0059b2;
  }

  &.active {
    background-color: #004386;
  }

  &.focusVisible {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`);

const CustomButton = React.forwardRef(function CustomButton(props, ref) {
  const { children } = props;
  const button = useButton({
    ...props,
    ref,
    component: CustomButtonRoot,
  });

  const classes = {
    active: button.active,
    disabled: button.disabled,
    focusVisible: button.focusVisible,
  };

  return (
    <CustomButtonRoot {...button.getRootProps()} className={clsx(classes)}>
      {children}
    </CustomButtonRoot>
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
