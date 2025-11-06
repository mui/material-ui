'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  VirtualElement,
} from '@floating-ui/react-dom';
import {
  HTMLElementType,
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '../composeClasses';
import { Portal } from '../Portal';
import { useSlotProps, WithOptionalOwnerState, PolymorphicComponent } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { getPopupUtilityClass } from './popupClasses';
import { PopupOwnerState, PopupProps, PopupRootSlotProps, PopupTypeMap } from './Popup.types';
import { useTransitionTrigger, TransitionContext } from '../useTransition';
import { PopupContext, PopupContextValue } from './PopupContext';

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
    ...other
  } = props;

  const {
    refs,
    elements,
    floatingStyles,
    update,
    placement: finalPlacement,
  } = useFloating({
    elements: {
      reference: resolveAnchor(anchorProp),
    },
    open,
    middleware: middleware ?? [offset(offsetProp ?? 0), flip(), shift()],
    placement,
    strategy,
    whileElementsMounted: !keepMounted ? autoUpdate : undefined,
  });

  const handleRef = useForkRef(refs.setFloating, forwardedRef);

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
    finalPlacement,
    strategy,
  };

  const { contextValue, hasExited: hasTransitionExited } = useTransitionTrigger(open);

  const visibility = keepMounted && hasTransitionExited ? 'hidden' : undefined;
  const classes = useUtilityClasses(ownerState);

  const Root = slots?.root ?? 'div';
  const rootProps: WithOptionalOwnerState<PopupRootSlotProps> = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    ownerState,
    className: classes.root,
    additionalProps: {
      ref: handleRef,
      role: 'tooltip',
      style: { ...floatingStyles, visibility },
    },
  });

  const popupContextValue: PopupContextValue = React.useMemo(
    () => ({
      placement: finalPlacement,
    }),
    [finalPlacement],
  );

  const shouldRender = keepMounted || !hasTransitionExited;
  if (!shouldRender) {
    return null;
  }

  return (
    <Portal disablePortal={disablePortal} container={container}>
      <PopupContext.Provider value={popupContextValue}>
        <TransitionContext.Provider value={contextValue}>
          <Root {...rootProps}>{children}</Root>
        </TransitionContext.Provider>
      </PopupContext.Provider>
    </Portal>
  );
}) as PolymorphicComponent<PopupTypeMap>;

Popup.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
  children: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.node,
    PropTypes.func,
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
   * Its visibility will be controlled by the `visibility` CSS property.
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
} as any;

export { Popup };
