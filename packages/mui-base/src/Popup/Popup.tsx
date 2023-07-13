import * as React from 'react';
import { autoUpdate, flip, offset, useFloating, VirtualElement } from '@floating-ui/react-dom';
import {
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_useForkRef as useForkRef,
} from '@mui/utils';
import composeClasses from '../composeClasses';
import Portal from '../Portal';
import { useSlotProps } from '../utils';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { getPopupUtilityClass } from './popupClasses';
import { PopupOwnerState, PopupProps } from './Popup.types';

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

const Popup = React.forwardRef(function Popup<RootComponentType extends React.ElementType>(
  props: PopupProps<RootComponentType>,
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
