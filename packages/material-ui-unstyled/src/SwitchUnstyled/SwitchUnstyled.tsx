import React, { ComponentPropsWithRef, CSSProperties, ElementType } from 'react';
import clsx from 'clsx';
import useSwitch, { UseSwitchProps } from './useSwitch';
import classes from './switchUnstyledClasses';
import ButtonUnstyled from '../ButtonUnstyled/ButtonUnstyled';

export interface SwitchUnstyledProps<
  TRoot extends ElementType,
  TThumb extends ElementType,
  TInput extends ElementType,
> extends UseSwitchProps {
  components?: {
    Root?: TRoot;
    Thumb?: TThumb;
    Input?: TInput;
  };
  componentsProps?: {
    root?: ComponentPropsWithRef<TRoot>;
    thumb?: ComponentPropsWithRef<TThumb>;
    input?: ComponentPropsWithRef<TInput>;
  };
}

const minimalRootStyles: CSSProperties = {
  position: 'relative',
};

const minimalInputStyles: CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  opacity: 0,
  zIndex: 1,
  margin: 0,
};

const SwitchUnstyled = function SwitchUnstyled<
  TRoot extends ElementType = 'span',
  TThumb extends ElementType = 'span',
  TInput extends ElementType = 'input',
>(props: SwitchUnstyledProps<TRoot, TThumb, TInput>) {
  const { components = {}, componentsProps = {}, ...otherProps } = props;
  const Root = components.Root ?? 'span';
  const rootProps = componentsProps.root ?? ({} as React.ComponentPropsWithRef<TRoot>);
  const Thumb = components.Thumb ?? 'span';
  const thumbProps = componentsProps.thumb ?? ({} as React.ComponentPropsWithRef<TThumb>);
  const Input = components.Input ?? 'input';
  const inputProps = componentsProps.input ?? ({} as React.ComponentPropsWithRef<TInput>);

  const { getInputProps, isChecked, isDisabled } = useSwitch(otherProps);

  const computedClasses = {
    [classes.checked]: isChecked,
    [classes.disabled]: isDisabled,
  };

  return (
    <Root style={minimalRootStyles} {...rootProps} className={clsx(classes.root, computedClasses)}>
      <ButtonUnstyled
        components={{ Root: 'span' }}
        componentsProps={{ root: { role: undefined } }}
        tabIndex={-1}
        disabled={isDisabled}
        className={classes.button}>
        <Thumb {...thumbProps} className={classes.thumb} />
        <Input
          type="checkbox"
          style={minimalInputStyles}
          {...getInputProps(inputProps)}
          className={classes.input}
        />
      </ButtonUnstyled>
    </Root>
  );
};

export default SwitchUnstyled;
