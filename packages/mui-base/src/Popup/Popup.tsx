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
 *
 * Demos:
 *
 * - [Popup](https://mui.com/base-ui/react-popup/)
 *
 * API:
 *
 * - [Popup API](https://mui.com/base-ui/react-popup/components-api/#popup)
 */
const Popup = React.forwardRef(function Popup<RootComponentType extends React.ElementType>(
  props: PopupProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const {
    anchor: anchorProp,
    children,
    container,
    disablePortal = false,
    keepMounted = false,
    middleware,
    offset: offsetProp = 0,
    open = false,
    placement = 'bottom',
    slotProps = {},
    slots = {},
    strategy = 'absolute',
    withTransition = false,
    ...other
  } = props;

  const { refs, elements, floatingStyles, update } = useFloating({
    elements: {
      reference: resolveAnchor(anchorProp),
    },
    open,
    middleware: middleware ?? [offset(offsetProp ?? 0), flip()],
    placement,
    strategy,
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
    disablePortal,
    keepMounted,
    offset,
    open,
    placement,
    strategy,
    withTransition,
  };

  const display = !open && keepMounted && (!withTransition || exited) ? 'none' : undefined;

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
      style: { ...floatingStyles, display },
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
   * An HTML element, [virtual element](https://floating-ui.com/docs/virtual-elements),
   * or a function that returns either.
   * It's used to set the position of the popup.
   */
  anchor: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * @ignore
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.number,
    PropTypes.shape({
      '__@iterator@96': PropTypes.func.isRequired,
    }),
    PropTypes.string,
    PropTypes.bool,
  ]),
  /**
   * An HTML element or function that returns one. The container will have the portal children appended to it.
   * By default, it uses the body of the top-level document object, so it's `document.body` in these cases.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * If `true`, the popup will be rendered where it is defined, without the use of portals.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * If `true`, the popup will exist in the DOM even if it's closed.
   * Its visibility will be controlled by the `display` CSS property.
   *
   * Otherwise, a closed popup will be removed from the DOM.
   *
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Collection of Floating UI middleware to use when positioning the popup.
   * If not provided, the [`offset`](https://floating-ui.com/docs/offset)
   * and [`flip`](https://floating-ui.com/docs/flip) functions will be used.
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
   * This prop is ignored when custom `middleware` is provided.
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
   * If `true`, the popup is visible.
   *
   * @default false
   */
  open: PropTypes.bool,
  /**
   * Determines where to place the popup relative to the trigger element.
   *
   * @default 'bottom'
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
   * The props used for each slot inside the Popup.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Popup.
   * Either a string to use a HTML element or a component.
   *
   * @default {}
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
  /**
   * If `true`, the popup will support open and close animations.
   * In such a case, a function form of `children` must be used and `onEnter` and `onExited`
   * callback functions must be called when the respective transitions or animations finish.
   *
   * @default false
   */
  withTransition: PropTypes.bool,
} as any;

export default Popup;
