import React, { ElementType } from 'react';
import clsx from 'clsx';
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

const SwitchUnstyled = function SwitchUnstyled(props: SwitchUnstyledProps) {
  const { components = {}, componentsProps = {}, ...otherProps } = props;

  const Root: ElementType = components.Root ?? 'span';
  const rootProps = componentsProps.root ?? {};
  const Thumb: ElementType = components.Thumb ?? 'span';
  const thumbProps = componentsProps.thumb ?? {};
  const Input: ElementType = components.Input ?? 'input';
  const inputProps = componentsProps.input ?? {};

  const { getRootProps, isChecked } = useSwitch(otherProps);

  const computedClasses = {
    [classes.checked]: isChecked,
    [classes.disabled]: props.disabled,
  };

  return (
    <Root {...rootProps} {...getRootProps()} className={clsx(classes.root, computedClasses)}>
      <Thumb {...thumbProps} />
      <Input
        type="checkbox"
        {...inputProps}
        checked={isChecked}
        disabled={props.disabled}
        className={classes.input}
      />
    </Root>
  );
};

export default SwitchUnstyled;
