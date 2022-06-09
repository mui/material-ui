import * as React from 'react';
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
  } = props;

  const Root = component || components.Root || 'div';

  const TransitionComponent = components.Transition;

  const handleClickAway = (event: React.SyntheticEvent<any> | Event) => {
    if (onClose) {
      onClose(event, 'clickaway');
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway} {...ClickAwayListenerProps}>
      <Root {...componentsProps.root}>
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
