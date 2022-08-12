import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import ClickAwayListener from '../ClickAwayListener';
import {
  SnackbarUnstyledOwnerState,
  SnackbarUnstyledProps,
  SnackbarUnstyledRootSlotProps,
  SnackbarUnstyledTypeMap,
  SnackbarUnstyledClickAwayListenerSlotProps,
} from './SnackbarUnstyled.types';
import composeClasses from '../composeClasses';
import { getSnackbarUnstyledUtilityClass } from './snackbarUnstyledClasses';
import useSnackbar from './useSnackbar';
import { useSlotProps, WithOptionalOwnerState } from '../utils';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getSnackbarUnstyledUtilityClass, undefined);
};
/**
 *
 * Demos:
 *
 * - [Snackbar](https://mui.com/base/react-snackbar/)
 *
 * API:
 *
 * - [SnackbarUnstyled API](https://mui.com/base/api/snackbar-unstyled/)
 */
const SnackbarUnstyled = React.forwardRef(function SnackbarUnstyled(
  props: SnackbarUnstyledProps,
  ref: React.ForwardedRef<any>,
) {
  const {
    autoHideDuration = null,
    children,
    component,
    components = {},
    componentsProps = {},
    disableWindowBlurListener = false,
    exited = true,
    onBlur,
    onClose,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
    ...other
  } = props;

  const classes = useUtilityClasses();

  const { getRootProps, onClickAway } = useSnackbar({
    autoHideDuration,
    disableWindowBlurListener,
    onClose,
    open,
    resumeHideDuration,
    ref,
  });

  const ownerState: SnackbarUnstyledOwnerState = props;

  const Root = component || components.Root || 'div';

  const rootProps: WithOptionalOwnerState<SnackbarUnstyledRootSlotProps> = useSlotProps({
    elementType: Root,
    getSlotProps: getRootProps,
    externalForwardedProps: other,
    externalSlotProps: componentsProps.root,
    additionalProps: {
      ref,
    },
    ownerState,
    className: classes.root,
  });

  const clickAwayListenerProps: WithOptionalOwnerState<
    Omit<SnackbarUnstyledClickAwayListenerSlotProps, 'children'>
  > = useSlotProps({
    elementType: ClickAwayListener,
    externalSlotProps: componentsProps.clickAwayListener,
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
}) as OverridableComponent<SnackbarUnstyledTypeMap>;

SnackbarUnstyled.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the Snackbar.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Snackbar.
   * @default {}
   */
  componentsProps: PropTypes.shape({
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
   * @ignore
   */
  onBlur: PropTypes.func,
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
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onMouseEnter: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
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
} as any;

export default SnackbarUnstyled;
