import * as React from 'react';
import {
  Middleware,
  OffsetOptions,
  Strategy,
  Placement,
  autoUpdate,
  flip,
  offset,
  useFloating,
  VirtualElement,
} from '@floating-ui/react-dom';
import {
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import composeClasses from '../composeClasses';
import Portal, { PortalProps } from '../Portal';
import { SlotComponentProps, useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { getPopupUtilityClass } from './popupClasses';

interface PopupRootSlotOverrides {}

interface PopupSettings {
  /**
   * Collection of Floating UI middleware to use when positioning the popup.
   * If not provided, an offset and flip functions will be used.
   *
   * @see https://floating-ui.com/docs/computePosition#middleware
   */
  middleware?: Array<Middleware | null | undefined | false>;
  /**
   * Distance between a popup and the trigger element.
   *
   * @default 0
   * @see https://floating-ui.com/docs/offset
   */
  offset?: OffsetOptions;
  /**
   * Determines where to place the popup relative to the trigger element.
   *
   * @default 'bottom-start'
   * @see https://floating-ui.com/docs/computePosition#placement
   */
  placement?: Placement;
  /**
   * The type of CSS position property to use (absolute or fixed).
   *
   * @default 'absolute'
   * @see https://floating-ui.com/docs/computePosition#strategy
   */
  strategy?: Strategy;
}

function useUtilityClasses(ownerState: PopupOwnerState) {
  const { open } = ownerState;

  const slots = {
    root: ['root', open && 'open'],
  };

  return composeClasses(slots, useClassNamesOverride(getPopupUtilityClass));
}

export interface PopupProps extends PopupSettings {
  anchor?: VirtualElement | HTMLElement | (() => HTMLElement) | (() => VirtualElement) | null;
  children?: React.ReactNode;
  container?: PortalProps['container'];
  disablePortal?: boolean;
  keepMounted?: boolean;
  open?: boolean;
  slots?: {
    root?: React.ElementType;
  };
  slotProps?: {
    root?: SlotComponentProps<'div', PopupRootSlotOverrides, PopupProps>;
  };
}

export interface PopupOwnerState extends PopupProps {
  // isMounted: boolean;
  // transitionStatus: 'unmounted' | 'initial' | 'open' | 'close';
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

const Popup = React.forwardRef(function Popup(
  props: PopupProps,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const {
    anchor: anchorProp,
    children,
    container,
    disablePortal,
    open,
    middleware,
    keepMounted,
    offset: offsetProp,
    placement,
    strategy,
    slots = {},
    slotProps = {},
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

  const shouldRender = open || keepMounted;

  if (!shouldRender) {
    return null;
  }

  return (
    <Portal disablePortal={disablePortal} container={container}>
      <Root {...rootProps}>{children}</Root>
    </Portal>
  );
});

export default Popup;
