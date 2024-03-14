'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { ClickAwayListener } from '../ClickAwayListener';
import {
  SnackbarOwnerState,
  SnackbarProps,
  SnackbarRootSlotProps,
  SnackbarTypeMap,
  SnackbarClickAwayListenerSlotProps,
} from './Snackbar.types';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { getSnackbarUtilityClass } from './snackbarClasses';
import { useSnackbar } from '../useSnackbar';
import { PolymorphicComponent, useSlotProps, WithOptionalOwnerState } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, useClassNamesOverride(getSnackbarUtilityClass));
};
/**
 *
 * Demos:
 *
 * - [Snackbar](https://mui.com/base-ui/react-snackbar/)
 * - [Snackbar](https://mui.com/joy-ui/react-snackbar/)
 * - [Snackbar](https://mui.com/material-ui/react-snackbar/)
 *
 * API:
 *
 * - [Snackbar API](https://mui.com/base-ui/react-snackbar/components-api/#snackbar)
 */
const Snackbar = React.forwardRef(function Snackbar<RootComponentType extends React.ElementType>(
  props: SnackbarProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const {
    autoHideDuration = null,
    children,
    disableWindowBlurListener = false,
    exited = true,
    onBlur,
    onClose,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const classes = useUtilityClasses();

  const { getRootProps, onClickAway } = useSnackbar({
    ...props,
    autoHideDuration,
    disableWindowBlurListener,
    onClose,
    open,
    resumeHideDuration,
  });

  const ownerState: SnackbarOwnerState = props;

  const Root = slots.root || 'div';

  const rootProps: WithOptionalOwnerState<SnackbarRootSlotProps> = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      ref: forwardedRef,
    },
    ownerState,
    className: classes.root,
  });

  const clickAwayListenerProps: WithOptionalOwnerState<
    Omit<SnackbarClickAwayListenerSlotProps, 'children'>
  > = useSlotProps({
    elementType: ClickAwayListener,
    externalSlotProps: slotProps.clickAwayListener,
    additionalProps: {
      onClickAway,
    },
    ownerState,
  });

  // ClickAwayListener doesn't support ownerState
  delete clickAwayListenerProps.ownerState;

  // So that we only render active snackbars.
  if (!open && exited) {
    return null;
  }

  return (
    <ClickAwayListener {...clickAwayListenerProps}>
      <Root {...rootProps}>{children}</Root>
    </ClickAwayListener>
  );
}) as PolymorphicComponent<SnackbarTypeMap>;

Snackbar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration: PropTypes.number,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener: PropTypes.bool,
  /**
   * The prop used to handle exited transition and unmount the component.
   * @default true
   */
  exited: PropTypes.bool,
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration: PropTypes.number,
  /**
   * The props used for each slot inside the Snackbar.
   * @default {}
   */
  slotProps: PropTypes.shape({
    clickAwayListener: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        children: PropTypes.element.isRequired,
        disableReactTree: PropTypes.bool,
        mouseEvent: PropTypes.oneOf([
          'onClick',
          'onMouseDown',
          'onMouseUp',
          'onPointerDown',
          'onPointerUp',
          false,
        ]),
        onClickAway: PropTypes.func,
        touchEvent: PropTypes.oneOf(['onTouchEnd', 'onTouchStart', false]),
      }),
    ]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Snackbar.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
} as any;

export { Snackbar };
