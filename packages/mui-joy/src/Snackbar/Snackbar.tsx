'use client';
import * as React from 'react';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSnackbar } from '@mui/base/useSnackbar';
import useSlot from '../utils/useSlot';
import styled from '../styles/styled';
import { useThemeProps } from '../styles';
import { SnackbarProps } from './SnackbarProps';
import { getSnackbarUtilityClass } from './snackbarClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
    startDecorator: ['startDecorator'],
    endDecorator: ['endDecorator'],
  };

  return composeClasses(slots, getSnackbarUtilityClass, {});
};

const SnackbarRoot = styled('div')({});

const SnackbarStartDecorator = styled('span')({});

const SnackbarEndDecorator = styled('span')({});

const Snackbar = React.forwardRef(function Snackbar(inProps, ref) {
  const props = useThemeProps<typeof inProps & SnackbarProps>({
    props: inProps,
    name: 'JoySnackbar',
  });

  const { children, className, component, slots, slotProps, open, ...other } = props;

  const ownerState = { ...props };

  const classes = useUtilityClasses();

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
