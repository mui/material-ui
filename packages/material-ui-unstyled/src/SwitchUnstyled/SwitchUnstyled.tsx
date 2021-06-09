import React, { ElementType } from 'react';
import clsx from 'clsx';
import { styled } from '@material-ui/system';
import useSwitch, { UseSwitchProps } from './useSwitch';
import classes from './switchUnstyledClasses';
import ButtonUnstyled from '../ButtonUnstyled/ButtonUnstyled';

export interface SwitchUnstyledProps extends UseSwitchProps {
  components?: {
    Root?: ElementType;
    Thumb?: ElementType;
    Input?: ElementType;
  };
  componentsProps?: {
    root?: Record<string, any>;
    thumb?: Record<string, any>;
    input?: Record<string, any>;
  };
}

const BarelyStyledRoot = styled('span')({
  position: 'relative',
});

const BarelyStyledInput = styled('input')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  opacity: 0,
  zIndex: 1,
  margin: 0,
});

const SwitchUnstyled = function SwitchUnstyled(props: SwitchUnstyledProps) {
  const { components = {}, componentsProps = {}, disabled, ...otherProps } = props;
  const Root: ElementType = components.Root ?? BarelyStyledRoot;
  const rootProps = componentsProps.root ?? {};
  const Thumb: ElementType = components.Thumb ?? 'span';
  const thumbProps = componentsProps.thumb ?? {};
  const Input: ElementType = components.Input ?? BarelyStyledInput;
  const inputProps = componentsProps.input ?? {};
  
  const useSwitchProps = { disabled, ...otherProps };
  const { getRootProps, getInputProps, isChecked } = useSwitch(useSwitchProps);

  const computedClasses = {
    [classes.checked]: isChecked,
    [classes.disabled]: disabled,
  };

  return (
    <Root {...rootProps} {...getRootProps()} className={clsx(classes.root, computedClasses)}>
      <ButtonUnstyled components={{ Root: 'span' }}
        tabIndex={-1}
        disabled={disabled}
        className={classes.button}
        focusVisibleClassName={classes.focusVisible}>
        <Thumb {...thumbProps} className={classes.thumb} />
        <Input type="checkbox" className={classes.input} {...inputProps} {...getInputProps()} />
      </ButtonUnstyled>
    </Root>
  );
};

export default SwitchUnstyled;
