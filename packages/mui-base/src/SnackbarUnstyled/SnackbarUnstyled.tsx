import * as React from 'react';
import clsx from 'clsx';
import ClickAwayListener from '../ClickAwayListener';
import { SnackbarUnstyledProps } from './SnackbarUnstyled.types';

const SnackbarUnstyled = (props: SnackbarUnstyledProps) => {
  const {
    children,
    ClickAwayListenerProps,
    component,
    components = {},
    componentsProps = {},
    onClose,
    className,
    ...other
  } = props;

  const Root = component || components.Root || 'div';

  const TransitionComponent = components.Transition;

  const rootProps = {
    ...other,
    ...componentsProps.root,
    className: clsx(className, componentsProps.root?.className),
  };

  const handleClickAway = (event: React.SyntheticEvent<any> | Event) => {
    if (onClose) {
      onClose(event, 'clickaway');
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway} {...ClickAwayListenerProps}>
      <Root {...rootProps}>
        {TransitionComponent ? (
          <TransitionComponent {...componentsProps.transition}>{children}</TransitionComponent>
        ) : (
          children
        )}
      </Root>
    </ClickAwayListener>
  );
};

export default SnackbarUnstyled;
