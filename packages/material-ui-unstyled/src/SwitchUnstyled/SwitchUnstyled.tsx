import React, { ElementType } from 'react';
import clsx from 'clsx';
import { styled } from '@material-ui/system';
import useSwitch, { SwitchProps } from './useSwitch';
import classes from './switchUnstyledClasses';

export interface SwitchUnstyledProps extends SwitchProps {
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
  cursor: 'pointer',
});

const BarelyStyledInput = styled('input')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  opacity: 0,
  zIndex: 1,
  cursor: 'inherit',
  margin: 0,
});

const SwitchUnstyled = function SwitchUnstyled(props: SwitchUnstyledProps) {
  const { components = {}, componentsProps = {}, ...otherProps } = props;

  const Root: ElementType = components.Root ?? BarelyStyledRoot;
  const rootProps = componentsProps.root ?? {};
  const Thumb: ElementType = components.Thumb ?? 'span';
  const thumbProps = componentsProps.thumb ?? {};
  const Input: ElementType = components.Input ?? BarelyStyledInput;
  const inputProps = componentsProps.input ?? {};

  const { getRootProps, getInputProps, isChecked } = useSwitch(otherProps);

  const computedClasses = {
    [classes.checked]: isChecked,
    [classes.disabled]: props.disabled,
  };

  return (
    <Root {...rootProps} {...getRootProps()} className={clsx(classes.root, computedClasses)}>
      <Thumb {...thumbProps} className={classes.thumb} />
      <Input type="checkbox" className={classes.input} {...inputProps} {...getInputProps()} />
    </Root>
  );
};

export default SwitchUnstyled;
