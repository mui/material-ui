import * as React from 'react';
import PropTypes from 'prop-types';
import { autoUpdate, flip, offset, useFloating, VirtualElement } from '@floating-ui/react-dom';
import {
  HTMLElementType,
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import composeClasses from '../composeClasses';
import Portal from '../Portal';
import { useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { getPopupUtilityClass } from './popupClasses';
import { PopupChildrenProps, PopupOwnerState, PopupProps } from './Popup.types';

function useUtilityClasses(ownerState: PopupOwnerState) {
  const { open } = ownerState;

  const slots = {
    root: ['root', open && 'open'],
  };

  return composeClasses(slots, useClassNamesOverride(getPopupUtilityClass));
}

function resolveAnchor(
  anchor:
    | VirtualElement
    | (() => VirtualElement)
    | HTMLElement
    | (() => HTMLElement)
    | null
    | undefined,
): HTMLElement | VirtualElement | null | undefined {
  return typeof anchor === 'function' ? anchor() : anchor;
}

/**
 * @ignore - do not document.
 */
const Popup = React.forwardRef(function Popup<RootComponentType extends React.ElementType>(
  props: PopupProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const {
    anchor: anchorProp,
    children,
    container,
    disablePortal,
    open = false,
    middleware,
    keepMounted,
    offset: offsetProp,
    placement = 'bottom',
    strategy,
    slots = {},
    slotProps = {},
    withTransition,
    ...other
  } = props;

  const { refs, elements, floatingStyles, update } = useFloating({
    elements: {
      reference: resolveAnchor(anchorProp),
    },
    open,
    middleware: middleware ?? [offset(offsetProp ?? 0), flip()],
    placement: placement ?? 'bottom-start',
    strategy: strategy ?? 'absolute',
    whileElementsMounted: !keepMounted ? autoUpdate : undefined,
  });

  const handleRef = useForkRef(refs.setFloating, forwardedRef);
  const [exited, setExited] = React.useState(true);

  const handleEntering = () => {
    setExited(false);
  };

  const handleExited = () => {
    setExited(true);
  };

  useEnhancedEffect(() => {
    if (keepMounted && open && elements.reference && elements.floating) {
      const cleanup = autoUpdate(elements.reference, elements.floating, update);
      return cleanup;
    }

    return undefined;
  }, [keepMounted, open, elements, update]);

  const ownerState: PopupOwnerState = {
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  const Root = slots?.root ?? 'div';
  const rootProps = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root,
    additionalProps: {
      ref: handleRef,
      style: floatingStyles,
    },
  });

  const shouldRender = open || keepMounted || (withTransition && !exited);

  if (!shouldRender) {
    return null;
  }

  const childProps: PopupChildrenProps = {
    placement,
    in: open,
    onEnter: handleEntering,
    onExited: handleExited,
  };

  return (
    <Portal disablePortal={disablePortal} container={container}>
      <Root {...rootProps}>{typeof children === 'function' ? children(childProps) : children}</Root>
    </Portal>
  );
});

Popup.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  anchor: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * @ignore
   */
  disablePortal: PropTypes.bool,
  /**
   * @ignore
   */
  keepMounted: PropTypes.bool,
  /**
   * Collection of Floating UI middleware to use when positioning the popup.
   * If not provided, an offset and flip functions will be used.
   *
   * @see https://floating-ui.com/docs/computePosition#middleware
   */
  middleware: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.oneOf([false]),
      PropTypes.shape({
        fn: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        options: PropTypes.any,
      }),
    ]),
  ),
  /**
   * Distance between a popup and the trigger element.
   *
   * @default 0
   * @see https://floating-ui.com/docs/offset
   */
  offset: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.number,
    PropTypes.shape({
      alignmentAxis: PropTypes.number,
      crossAxis: PropTypes.number,
      mainAxis: PropTypes.number,
    }),
  ]),
  /**
   * @ignore
   */
  open: PropTypes.bool,
  /**
   * Determines where to place the popup relative to the trigger element.
   *
   * @default 'bottom-start'
   * @see https://floating-ui.com/docs/computePosition#placement
   */
  placement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * @ignore
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * @ignore
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * The type of CSS position property to use (absolute or fixed).
   *
   * @default 'absolute'
   * @see https://floating-ui.com/docs/computePosition#strategy
   */
  strategy: PropTypes.oneOf(['absolute', 'fixed']),
} as any;

export default Popup;
