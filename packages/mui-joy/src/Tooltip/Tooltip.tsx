'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  unstable_capitalize as capitalize,
  unstable_useControlled as useControlled,
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  unstable_isFocusVisible as isFocusVisible,
  unstable_useId as useId,
  unstable_useTimeout as useTimeout,
  unstable_Timeout as Timeout,
  unstable_getReactNodeRef as getReactNodeRef,
} from '@mui/utils';
import { Popper, unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import useSlot from '../utils/useSlot';
import { getTooltipUtilityClass } from './tooltipClasses';
import { TooltipProps, TooltipOwnerState, TooltipTypeMap } from './TooltipProps';

const useUtilityClasses = (ownerState: TooltipOwnerState) => {
  const { arrow, variant, color, size, placement, touch } = ownerState;

  const slots = {
    root: [
      'root',
      arrow && 'tooltipArrow',
      touch && 'touch',
      size && `size${capitalize(size)}`,
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
      `tooltipPlacement${capitalize(placement!.split('-')[0])}`,
    ],
    arrow: ['arrow'],
  };

  return composeClasses(slots, getTooltipUtilityClass, {});
};

const TooltipRoot = styled('div', {
  name: 'JoyTooltip',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TooltipOwnerState }>(({ ownerState, theme }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    ...(ownerState.size === 'sm' && {
      '--Icon-fontSize': theme.vars.fontSize.md,
      '--Tooltip-arrowSize': '8px',
      padding: theme.spacing(0.25, 0.625),
    }),
    ...(ownerState.size === 'md' && {
      '--Icon-fontSize': theme.vars.fontSize.lg,
      '--Tooltip-arrowSize': '10px',
      padding: theme.spacing(0.5, 0.75),
    }),
    ...(ownerState.size === 'lg' && {
      '--Icon-fontSize': theme.vars.fontSize.xl,
      '--Tooltip-arrowSize': '12px',
      padding: theme.spacing(0.75, 1),
    }),
    zIndex: theme.vars.zIndex.tooltip,
    borderRadius: theme.vars.radius.sm,
    boxShadow: theme.shadow.sm,
    wordWrap: 'break-word',
    position: 'relative',
    ...(ownerState.disableInteractive && {
      pointerEvents: 'none',
    }),
    ...theme.typography[`body-${({ sm: 'xs', md: 'sm', lg: 'md' } as const)[ownerState.size!]}`],
    ...variantStyle,
    ...(!variantStyle.backgroundColor && {
      backgroundColor: theme.vars.palette.background.surface,
    }),
    '&::before': {
      // acts as a invisible connector between the element and the tooltip
      // so that the cursor can move to the tooltip without losing focus.
      content: '""',
      display: 'block',
      position: 'absolute',
      width: ownerState.placement?.match(/(top|bottom)/)
        ? '100%'
        : // 10px equals the default offset popper config
          'calc(10px + var(--variant-borderWidth, 0px))',
      height: ownerState.placement?.match(/(top|bottom)/)
        ? 'calc(10px + var(--variant-borderWidth, 0px))'
        : '100%',
    },
    '&[data-popper-placement*="bottom"]::before': {
      top: 0,
      left: 0,
      transform: 'translateY(-100%)',
    },
    '&[data-popper-placement*="left"]::before': {
      top: 0,
      right: 0,
      transform: 'translateX(100%)',
    },
    '&[data-popper-placement*="right"]::before': {
      top: 0,
      left: 0,
      transform: 'translateX(-100%)',
    },
    '&[data-popper-placement*="top"]::before': {
      bottom: 0,
      left: 0,
      transform: 'translateY(100%)',
    },
  };
});

const TooltipArrow = styled('span', {
  name: 'JoyTooltip',
  slot: 'Arrow',
  overridesResolver: (props, styles) => styles.arrow,
})<{ ownerState: TooltipOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[ownerState.variant!]?.[ownerState.color!];
  return {
    '--unstable_Tooltip-arrowRotation': 0,
    width: 'var(--Tooltip-arrowSize)',
    height: 'var(--Tooltip-arrowSize)',
    boxSizing: 'border-box',
    // use pseudo element because Popper controls the `transform` property of the arrow.
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: 0,
      height: 0,
      border: 'calc(var(--Tooltip-arrowSize) / 2) solid',
      borderLeftColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: variantStyle?.backgroundColor ?? theme.vars.palette.background.surface,
      borderRightColor: variantStyle?.backgroundColor ?? theme.vars.palette.background.surface,
      borderRadius: `0px 2px 0px 0px`,
      boxShadow: `var(--variant-borderWidth, 0px) calc(-1 * var(--variant-borderWidth, 0px)) 0px 0px ${variantStyle.borderColor}`,
      transformOrigin: 'center center',
      transform: 'rotate(calc(-45deg + 90deg * var(--unstable_Tooltip-arrowRotation)))',
    },
    '[data-popper-placement*="bottom"] &': {
      top: 'calc(0.5px + var(--Tooltip-arrowSize) * -1 / 2)', // 0.5px is for perfect overlap with the Tooltip
    },
    '[data-popper-placement*="top"] &': {
      '--unstable_Tooltip-arrowRotation': 2,
      bottom: 'calc(0.5px + var(--Tooltip-arrowSize) * -1 / 2)',
    },
    '[data-popper-placement*="left"] &': {
      '--unstable_Tooltip-arrowRotation': 1,
      right: 'calc(0.5px + var(--Tooltip-arrowSize) * -1 / 2)',
    },
    '[data-popper-placement*="right"] &': {
      '--unstable_Tooltip-arrowRotation': 3,
      left: 'calc(0.5px + var(--Tooltip-arrowSize) * -1 / 2)',
    },
  };
});

let hystersisOpen = false;
const hystersisTimer = new Timeout();
let cursorPosition = { x: 0, y: 0 };

export function testReset() {
  hystersisOpen = false;
  hystersisTimer.clear();
}

function composeMouseEventHandler(
  handler: (event: React.MouseEvent<HTMLElement>) => void,
  eventHandler: (event: React.MouseEvent<HTMLElement>) => void,
) {
  return (event: React.MouseEvent<HTMLElement>) => {
    if (eventHandler) {
      eventHandler(event);
    }
    handler(event);
  };
}

function composeFocusEventHandler(
  handler: (event: React.FocusEvent<HTMLElement>, ...params: any[]) => void,
  eventHandler: (event: React.FocusEvent<HTMLElement>, ...params: any[]) => void,
) {
  return (event: React.FocusEvent<HTMLElement>, ...params: any[]) => {
    if (eventHandler) {
      eventHandler(event, ...params);
    }
    handler(event, ...params);
  };
}
/**
 *
 * Demos:
 *
 * - [Tooltip](https://mui.com/joy-ui/react-tooltip/)
 *
 * API:
 *
 * - [Tooltip API](https://mui.com/joy-ui/api/tooltip/)
 */
const Tooltip = React.forwardRef(function Tooltip(inProps, ref) {
  const props = useThemeProps<typeof inProps & TooltipProps>({
    props: inProps,
    name: 'JoyTooltip',
  });

  const {
    children,
    className,
    component,
    arrow = false,
    describeChild = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableInteractive: disableInteractiveProp = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterNextDelay = 0,
    enterTouchDelay = 700,
    followCursor = false,
    id: idProp,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open: openProp,
    disablePortal,
    direction,
    keepMounted,
    modifiers: modifiersProp,
    placement = 'bottom',
    title,
    color = 'neutral',
    variant = 'solid',
    size = 'md',
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const [childNode, setChildNode] = React.useState<Element>();
  const [arrowRef, setArrowRef] = React.useState<HTMLSpanElement | null>(null);
  const ignoreNonTouchEvents = React.useRef(false);

  const disableInteractive = disableInteractiveProp || followCursor;

  const closeTimer = useTimeout();
  const enterTimer = useTimeout();
  const leaveTimer = useTimeout();
  const touchTimer = useTimeout();

  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open',
  });

  let open = openState;

  const id = useId(idProp);

  const prevUserSelect = React.useRef<string | undefined>(undefined);
  const stopTouchInteraction = useEventCallback(() => {
    if (prevUserSelect.current !== undefined) {
      // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- WebkitUserSelect is required outside the component
      (document.body.style as unknown as { WebkitUserSelect?: string }).WebkitUserSelect =
        prevUserSelect.current;
      prevUserSelect.current = undefined;
    }
    touchTimer.clear();
  });

  React.useEffect(() => stopTouchInteraction, [stopTouchInteraction]);

  const handleOpen = (event: React.SyntheticEvent<HTMLElement>) => {
    hystersisTimer.clear();
    hystersisOpen = true;

    // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.
    setOpenState(true);

    if (onOpen && !open) {
      onOpen(event);
    }
  };

  const handleClose = useEventCallback((event: React.SyntheticEvent | Event) => {
    hystersisTimer.start(800 + leaveDelay, () => {
      hystersisOpen = false;
    });
    setOpenState(false);

    if (onClose && open) {
      onClose(event);
    }

    closeTimer.start(150, () => {
      ignoreNonTouchEvents.current = false;
    });
  });

  const handleMouseOver = (event: React.SyntheticEvent<HTMLElement>) => {
    if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
      return;
    }

    // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).
    if (childNode) {
      (childNode as HTMLElement).removeAttribute('title');
    }

    enterTimer.clear();
    leaveTimer.clear();
    if (enterDelay || (hystersisOpen && enterNextDelay)) {
      enterTimer.start(hystersisOpen ? enterNextDelay : enterDelay, () => {
        handleOpen(event);
      });
    } else {
      handleOpen(event);
    }
  };

  const handleMouseLeave = (event: React.SyntheticEvent<HTMLElement>) => {
    enterTimer.clear();
    leaveTimer.start(leaveDelay, () => {
      handleClose(event);
    });
  };

  // We don't necessarily care about the focusVisible state (which is safe to access via ref anyway).
  // We just need to re-render the Tooltip if the focus-visible state changes.
  const [, setChildIsFocusVisible] = React.useState(false);
  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (!isFocusVisible(event.target)) {
      setChildIsFocusVisible(false);
      handleMouseLeave(event);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    // Workaround for https://github.com/facebook/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    if (!childNode) {
      setChildNode(event.currentTarget);
    }

    if (isFocusVisible(event.target)) {
      setChildIsFocusVisible(true);
      handleMouseOver(event);
    }
  };

  const detectTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    ignoreNonTouchEvents.current = true;

    const childrenProps = children.props;
    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    detectTouchStart(event);
    leaveTimer.clear();
    closeTimer.clear();
    stopTouchInteraction();

    prevUserSelect.current = (
      document.body.style as unknown as { WebkitUserSelect?: string }
    ).WebkitUserSelect;
    // Prevent iOS text selection on long-tap.
    (document.body.style as unknown as { WebkitUserSelect?: string }).WebkitUserSelect = 'none';

    touchTimer.start(enterTouchDelay, () => {
      (document.body.style as unknown as { WebkitUserSelect?: string }).WebkitUserSelect =
        prevUserSelect.current;
      handleMouseOver(event as unknown as React.MouseEvent<HTMLElement>);
    });
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    stopTouchInteraction();
    leaveTimer.start(leaveTouchDelay, () => {
      handleClose(event);
    });
  };

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleKeyDown(nativeEvent: KeyboardEvent) {
      if (nativeEvent.key === 'Escape') {
        handleClose(nativeEvent);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, open]);

  const handleUseRef = useForkRef(setChildNode, ref);
  const handleRef = useForkRef(getReactNodeRef(children), handleUseRef);

  // There is no point in displaying an empty tooltip.
  if (typeof title !== 'number' && !title) {
    open = false;
  }

  const popperRef = React.useRef(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const childrenProps = children.props;
    if (childrenProps.onMouseMove) {
      childrenProps.onMouseMove(event);
    }

    cursorPosition = { x: event.clientX, y: event.clientY };

    if (popperRef.current) {
      (popperRef.current as { update: () => void }).update();
    }
  };

  const nameOrDescProps: {
    title?: string | null;
    ['aria-describedby']?: string | null;
    ['aria-label']?: string | null;
    ['aria-labelledby']?: string | null;
  } = {};
  const titleIsString = typeof title === 'string';
  if (describeChild) {
    nameOrDescProps.title = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps['aria-describedby'] = open ? id : null;
  } else {
    nameOrDescProps['aria-label'] = titleIsString ? title : null;
    nameOrDescProps['aria-labelledby'] = open && !titleIsString ? id : null;
  }

  const childrenProps = {
    ...nameOrDescProps,
    ...other,
    component,
    ...children.props,
    className: clsx(className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef,
    ...(followCursor ? { onMouseMove: handleMouseMove } : {}),
  };

  const interactiveWrapperListeners: {
    onMouseOver?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  } = {};

  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }

  if (!disableHoverListener) {
    childrenProps.onMouseOver = composeMouseEventHandler(
      handleMouseOver,
      childrenProps.onMouseOver,
    );

    childrenProps.onMouseLeave = composeMouseEventHandler(
      handleMouseLeave,
      childrenProps.onMouseLeave,
    );

    if (!disableInteractive) {
      interactiveWrapperListeners.onMouseOver = handleMouseOver;
      interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
    }
  }

  if (!disableFocusListener) {
    childrenProps.onFocus = composeFocusEventHandler(handleFocus, childrenProps.onFocus);
    childrenProps.onBlur = composeFocusEventHandler(handleBlur, childrenProps.onBlur);

    if (!disableInteractive) {
      interactiveWrapperListeners.onFocus = handleFocus;
      interactiveWrapperListeners.onBlur = handleBlur;
    }
  }

  const ownerState = {
    ...props,
    arrow,
    disableInteractive,
    placement,
    touch: ignoreNonTouchEvents.current,
    color,
    variant,
    size,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const modifiers = React.useMemo(
    () => [
      {
        name: 'arrow',
        enabled: Boolean(arrowRef),
        options: {
          element: arrowRef,
          // https://popper.js.org/docs/v2/modifiers/arrow/#padding
          // make the arrow looks nice with the Tooltip's border radius
          padding: 6,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
      ...(modifiersProp || []),
    ],
    [arrowRef, modifiersProp],
  );

  const [SlotRoot, rootProps] = useSlot('root', {
    additionalProps: {
      id,
      popperRef,
      placement,
      anchorEl: followCursor
        ? {
            getBoundingClientRect: () =>
              ({
                top: cursorPosition.y,
                left: cursorPosition.x,
                right: cursorPosition.x,
                bottom: cursorPosition.y,
                width: 0,
                height: 0,
              }) as DOMRect,
          }
        : childNode,
      open: childNode ? open : false,
      disablePortal,
      keepMounted,
      direction,
      modifiers,
      ...interactiveWrapperListeners,
    },
    ref: null,
    className: classes.root,
    elementType: TooltipRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotArrow, arrowProps] = useSlot('arrow', {
    ref: setArrowRef,
    className: classes.arrow,
    elementType: TooltipArrow,
    externalForwardedProps,
    ownerState,
  });

  return (
    <React.Fragment>
      {React.isValidElement(children) && React.cloneElement(children, childrenProps)}
      <SlotRoot
        {...rootProps}
        {...(!props.slots?.root && {
          as: Popper,
          slots: {
            root: component || 'div',
          },
        })}
      >
        {title}
        {arrow ? <SlotArrow {...arrowProps} /> : null}
      </SlotRoot>
    </React.Fragment>
  );
}) as OverridableComponent<TooltipTypeMap>;

Tooltip.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: PropTypes.bool,
  /**
   * Tooltip reference element.
   */
  children: PropTypes.element.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: PropTypes.bool,
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: PropTypes.oneOf(['ltr', 'rtl']),
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: PropTypes.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: PropTypes.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: PropTypes.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: PropTypes.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: PropTypes.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: PropTypes.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: PropTypes.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: PropTypes.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: PropTypes.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: PropTypes.number,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.object,
      effect: PropTypes.func,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
      name: PropTypes.any,
      options: PropTypes.object,
      phase: PropTypes.oneOf([
        'afterMain',
        'afterRead',
        'afterWrite',
        'beforeMain',
        'beforeRead',
        'beforeWrite',
        'main',
        'read',
        'write',
      ]),
      requires: PropTypes.arrayOf(PropTypes.string),
      requiresIfExists: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
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
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    arrow: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    arrow: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: PropTypes.node,
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'solid'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default Tooltip;
