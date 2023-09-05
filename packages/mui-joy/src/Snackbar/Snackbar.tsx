'use client';
import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSnackbar } from '@mui/base/useSnackbar';
import { unstable_capitalize as capitalize } from '@mui/utils';
import useSlot from '../utils/useSlot';
import styled from '../styles/styled';
import { useThemeProps } from '../styles';
import { SnackbarProps, SnackbarOwnerState } from './SnackbarProps';
import { getSnackbarUtilityClass } from './snackbarClasses';

const useUtilityClasses = (ownerState: SnackbarOwnerState) => {
  const { variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      size && `size${capitalize(size)}`,
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getSnackbarUtilityClass, {});
};

const SnackbarRoot = styled('div')({});

const SnackbarStartDecorator = styled('span', {
  name: 'JoySnackbar',
  slot: 'StartDecorator',
  overridesResolver: (props, styles) => styles.startDecorator,
})({
  display: 'inherit',
  flex: 'none',
});

const SnackbarEndDecorator = styled('span', {
  name: 'JoySnackbar',
  slot: 'EndDecorator',
  overridesResolver: (props, styles) => styles.endDecorator,
})({
  display: 'inherit',
  flex: 'none',
  marginLeft: 'auto',
});

const Snackbar = React.forwardRef(function Snackbar(inProps, ref) {
  const props = useThemeProps<typeof inProps & SnackbarProps>({
    props: inProps,
    name: 'JoySnackbar',
  });

  const {
    anchorOrigin: { vertical, horizontal } = { vertical: 'bottom', horizontal: 'left' },
    autoHideDuration = null,
    color = 'neutral',
    children,
    className,
    component,
    disableWindowBlurListener = false,
    onBlur,
    onClose,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
    size = 'md',
    slots,
    slotProps,
    variant = 'outlined',
    ...other
  } = props;

  const ownerState = {
    ...props,
    anchorOrigin: { vertical, horizontal },
    autoHideDuration,
    color,
    disableWindowBlurListener,
    size,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const { getRootProps } = useSnackbar({ ...ownerState });

  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: SnackbarRoot,
    externalForwardedProps,
    getSlotProps: getRootProps,
    ownerState,
  });

  const [SlotStartDecorator, startDecoratorProps] = useSlot('startDecorator', {
    className: classes.startDecorator,
    elementType: SnackbarStartDecorator,
    externalForwardedProps,
    ownerState,
  });

  const [SlotEndDecorator, endDecoratorProps] = useSlot('endDecorator', {
    className: classes.endDecorator,
    elementType: SnackbarEndDecorator,
    externalForwardedProps,
    ownerState,
  });

  if (!open) {
    return null;
  }

  return (
    <SlotRoot {...rootProps}>
      {
        <React.Fragment>
          {slots?.startDecorator && (
            <SlotStartDecorator {...startDecoratorProps}>
              {slots?.startDecorator as React.ReactNode}
            </SlotStartDecorator>
          )}

          {children}
          {slots?.endDecorator && (
            <SlotEndDecorator {...endDecoratorProps}>
              {slots?.endDecorator as React.ReactNode}
            </SlotEndDecorator>
          )}
        </React.Fragment>
      }
    </SlotRoot>
  );
});

export default Snackbar;
