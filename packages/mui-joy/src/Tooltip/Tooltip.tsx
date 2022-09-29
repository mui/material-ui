import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  appendOwnerState,
  PopperUnstyled,
  unstable_composeClasses as composeClasses,
} from '@mui/base';
import { OverridableComponent } from '@mui/types';
import {
  unstable_capitalize as capitalize,
  unstable_useControlled as useControlled,
  unstable_useEventCallback as useEventCallback,
  unstable_useForkRef as useForkRef,
  unstable_useId as useId,
  unstable_useIsFocusVisible as useIsFocusVisible,
} from '@mui/utils';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import tooltipClasses, { getTooltipUtilityClass } from './tooltipClasses';
import { TooltipProps, TooltipTypeMap } from './TooltipProps';

const useUtilityClasses = (ownerState: TooltipProps & { touch?: boolean }) => {
  const { disableInteractive, arrow, touch, placement, variant, color, size } = ownerState;

  const slots = {
    popper: ['popper', !disableInteractive && 'popperInteractive', arrow && 'popperArrow'],
    tooltip: [
      'tooltip',
      arrow && 'tooltipArrow',
      touch && 'touch',
      placement && `tooltipPlacement${capitalize(placement.split('-')[0])}`,
      size && `size${capitalize(size)}`,
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
    arrow: ['arrow'],
  };

  return composeClasses(slots, getTooltipUtilityClass, {});
};

const TooltipPopper = styled(PopperUnstyled, {
  name: 'JoyTooltip',
  slot: 'Popper',
  overridesResolver: (props, styles) => styles.popper,
})<{ ownerState: TooltipProps & { touch?: boolean } }>(({ ownerState, open }) => ({
  zIndex: 1500,
  pointerEvents: 'none', // disable jss-rtl plugin
  ...(!ownerState.disableInteractive && {
    pointerEvents: 'auto',
  }),
  ...(!open && {
    pointerEvents: 'none',
  }),
  ...(ownerState.arrow && {
    [`&[data-popper-placement*="bottom"] .${tooltipClasses.arrow}`]: {
      top: 0,
      marginTop: '-0.71em',
      '&::before': {
        transformOrigin: '0 100%',
      },
    },
    [`&[data-popper-placement*="top"] .${tooltipClasses.arrow}`]: {
      bottom: 0,
      marginBottom: '-0.71em',
      '&::before': {
        transformOrigin: '100% 0',
      },
    },
    [`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
      left: 0,
      marginLeft: '-0.71em',
      height: '1em',
      width: '0.71em',
      '&::before': {
        transformOrigin: '100% 100%',
      },
    },
    [`&[data-popper-placement*="left"] .${tooltipClasses.arrow}`]: {
      right: 0,
      marginRight: '-0.71em',
      height: '1em',
      width: '0.71em',
      '&::before': {
        transformOrigin: '0 0',
      },
    },
  }),
}));

const TooltipTooltip = styled('div', {
  name: 'JoyTooltip',
  slot: 'Tooltip',
  overridesResolver: (props, styles) => styles.tooltip,
})<{ ownerState: TooltipProps & { touch?: boolean } }>(({ theme, ownerState }) => ({
  '--Tooltip-radius': theme.vars.radius.sm,
  ...(ownerState.size === 'sm' && {
    '--Tooltip-padding': '0.25rem',
    '--Icon-fontSize': '1rem',
    fontSize: theme.vars.fontSize.xs,
    lineHeight: theme.vars.lineHeight.sm,
  }),
  ...(ownerState.size === 'md' && {
    '--Tooltip-padding': '0.5rem',
    '--Icon-fontSize': '1.125rem',
    fontSize: theme.vars.fontSize.sm,
    fontWeight: theme.vars.fontWeight.md,
    lineHeight: theme.vars.lineHeight.sm,
  }),
  ...(ownerState.size === 'lg' && {
    '--Tooltip-padding': '0.75rem',
    '--Icon-fontSize': '1.25rem',
    fontSize: theme.vars.fontSize.md,
    fontWeight: theme.vars.fontWeight.md,
    lineHeight: theme.vars.lineHeight.md,
  }),
  fontFamily: theme.vars.fontFamily.body,
  lineHeight: theme.vars.lineHeight.md,
  margin: 2,
  wordWrap: 'break-word',
  padding: `var(--Tooltip-padding)`,
  borderRadius: 'var(--Tooltip-radius)',
  ...(ownerState.arrow && {
    position: 'relative',
    margin: 0,
  }),
  [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: {
    transformOrigin: 'right center',
    marginRight: '14px',
    ...(ownerState.touch && {
      marginRight: '24px',
    }),
  },
  [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
    transformOrigin: 'left center',
    marginLeft: '14px',
    ...(ownerState.touch && {
      marginLeft: '24px',
    }),
  },
  [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: {
    transformOrigin: 'center bottom',
    marginBottom: '14px',
    ...(ownerState.touch && {
      marginBottom: '24px',
    }),
  },
  [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: {
    transformOrigin: 'center top',
    marginTop: '14px',
    ...(ownerState.touch && {
      marginTop: '24px',
    }),
  },
  ...theme.variants[ownerState.variant!]?.[ownerState.color!],
}));

const TooltipArrow = styled('span', {
  name: 'JoyTooltip',
  slot: 'Arrow',
  overridesResolver: (props, styles) => styles.arrow,
})<{ ownerState: TooltipProps }>(({ theme, ownerState }) => ({
  overflow: 'hidden',
  position: 'absolute',
  width: '1em',
  height: '0.71em' /* = width / sqrt(2) = (length of the hypotenuse) */,
  boxSizing: 'border-box',
  color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
  '&::before': {
    content: '""',
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: '100%',
    transform: 'rotate(45deg)',
  },
}));

let hystersisOpen = false;
let hystersisTimer: ReturnType<typeof setTimeout> | null = null;

export function testReset() {
  hystersisOpen = false;
  if (hystersisTimer) {
    clearTimeout(hystersisTimer);
  }
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
  handler: (event: React.FocusEvent<HTMLElement>) => void,
  eventHandler: (event: React.FocusEvent<HTMLElement>) => void,
) {
  return (event: React.FocusEvent<HTMLElement>) => {
    if (eventHandler) {
      eventHandler(event);
    }
    handler(event);
  };
}

const Tooltip = React.forwardRef(function Tooltip(inProps, ref) {
  const props = useThemeProps<typeof inProps & TooltipProps>({
    props: inProps,
    name: 'JoyTooltip',
  });

  const {
    children,
    className,
    arrow = false,
    components = {},
    componentsProps = {},
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
    placement = 'bottom',
    PopperComponent: PopperComponentProp,
    PopperProps = {},
    title,
    color = 'primary',
    variant = 'soft',
    size = 'md',
    ...other
  } = props;

  const [childNode, setChildNode] = React.useState<HTMLElement>();
  const [arrowRef, setArrowRef] = React.useState(null);
  const ignoreNonTouchEvents = React.useRef(false);

  const disableInteractive = disableInteractiveProp || followCursor;

  const closeTimer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined> =
    React.useRef();
  const enterTimer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined> =
    React.useRef();
  const leaveTimer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined> =
    React.useRef();
  const touchTimer: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined> =
    React.useRef();

  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open',
  });

  let open = openState;

  const id = useId(idProp);

  const prevUserSelect: React.MutableRefObject<string | undefined> = React.useRef();
  const stopTouchInteraction = React.useCallback(() => {
    if (prevUserSelect.current !== undefined) {
      (document.body.style as unknown as { WebkitUserSelect?: string }).WebkitUserSelect =
        prevUserSelect.current;
      prevUserSelect.current = undefined;
    }
    clearTimeout(touchTimer.current);
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(closeTimer.current);
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      stopTouchInteraction();
    };
  }, [stopTouchInteraction]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (hystersisTimer) {
      clearTimeout(hystersisTimer);
    }
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
    if (hystersisTimer) {
      clearTimeout(hystersisTimer);
    }
    hystersisTimer = setTimeout(() => {
      hystersisOpen = false;
    }, 800 + leaveDelay);
    setOpenState(false);

    if (onClose && open) {
      onClose(event);
    }

    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      ignoreNonTouchEvents.current = false;
    }, 150);
  });

  const handleEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
      return;
    }

    // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).
    if (childNode) {
      (childNode as HTMLElement).removeAttribute('title');
    }

    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    if (enterDelay || (hystersisOpen && enterNextDelay)) {
      enterTimer.current = setTimeout(
        () => {
          handleOpen(event);
        },
        hystersisOpen ? enterNextDelay : enterDelay,
      );
    } else {
      handleOpen(event);
    }
  };

  const handleLeave = (event: React.MouseEvent<HTMLElement>) => {
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveDelay);
  };

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();
  // We don't necessarily care about the focusVisible state (which is safe to access via ref anyway).
  // We just need to re-render the Tooltip if the focus-visible state changes.
  const [, setChildIsFocusVisible] = React.useState(false);
  const handleBlur = (event: React.FocusEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => {
    handleBlurVisible(event as React.FocusEvent<HTMLElement>);
    if (isFocusVisibleRef.current === false) {
      setChildIsFocusVisible(false);
      handleLeave(event as React.MouseEvent<HTMLElement>);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => {
    // Workaround for https://github.com/facebook/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    if (!childNode) {
      setChildNode(event.currentTarget);
    }

    handleFocusVisible(event as React.FocusEvent<HTMLElement>);
    if (isFocusVisibleRef.current === true) {
      setChildIsFocusVisible(true);
      handleEnter(event as React.MouseEvent<HTMLElement>);
    }
  };

  const detectTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    ignoreNonTouchEvents.current = true;

    const childrenProps = children.props;
    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };

  const handleMouseOver = handleEnter;
  const handleMouseLeave = handleLeave;

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    detectTouchStart(event);
    clearTimeout(leaveTimer.current);
    clearTimeout(closeTimer.current);
    stopTouchInteraction();

    prevUserSelect.current = (
      document.body.style as unknown as { WebkitUserSelect?: string }
    ).WebkitUserSelect;
    // Prevent iOS text selection on long-tap.
    (document.body.style as unknown as { WebkitUserSelect?: string }).WebkitUserSelect = 'none';

    touchTimer.current = setTimeout(() => {
      (document.body.style as unknown as { WebkitUserSelect?: string }).WebkitUserSelect =
        prevUserSelect.current;
      handleEnter(event as unknown as React.MouseEvent<HTMLElement>);
    }, enterTouchDelay);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    stopTouchInteraction();
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      handleClose(event);
    }, leaveTouchDelay);
  };

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleKeyDown(nativeEvent: KeyboardEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        handleClose(nativeEvent);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, open]);

  const handleUseRef = useForkRef(setChildNode, ref);
  const handleFocusRef = useForkRef(focusVisibleRef, handleUseRef);
  const handleRef = useForkRef(children.ref, handleFocusRef);

  // There is no point in displaying an empty tooltip.
  if (typeof title !== 'number' && !title) {
    open = false;
  }

  const positionRef = React.useRef({ x: 0, y: 0 });
  const popperRef = React.useRef();

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const childrenProps = children.props;
    if (childrenProps.onMouseMove) {
      childrenProps.onMouseMove(event);
    }

    positionRef.current = { x: event.clientX, y: event.clientY };

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

  const popperOptions = React.useMemo(() => {
    let tooltipModifiers = [
      {
        name: 'arrow',
        enabled: Boolean(arrowRef),
        options: {
          element: arrowRef,
          padding: 4,
        },
      },
    ];

    if (PopperProps.popperOptions?.modifiers) {
      tooltipModifiers = tooltipModifiers.concat(PopperProps.popperOptions.modifiers);
    }

    return {
      ...PopperProps.popperOptions,
      modifiers: tooltipModifiers,
    };
  }, [arrowRef, PopperProps]);

  const ownerState = {
    ...props,
    arrow,
    disableInteractive,
    placement,
    PopperComponentProp,
    touch: ignoreNonTouchEvents.current,
    color,
    variant,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const PopperComponent = components.Popper ?? TooltipPopper;
  const TooltipComponent = components.Tooltip ?? TooltipTooltip;
  const ArrowComponent = components.Arrow ?? TooltipArrow;

  const popperProps = appendOwnerState(
    PopperComponent,
    { ...PopperProps, ...componentsProps.popper },
    ownerState,
  );

  const tooltipProps = appendOwnerState(
    TooltipComponent,
    { ...componentsProps.tooltip },
    ownerState,
  );

  const tooltipArrowProps = appendOwnerState(
    ArrowComponent,
    { ...componentsProps.arrow },
    ownerState,
  );

  return (
    <React.Fragment>
      {React.isValidElement(children) && React.cloneElement(children, childrenProps)}
      <PopperComponent
        as={PopperComponentProp}
        placement={placement}
        anchorEl={
          followCursor
            ? {
                getBoundingClientRect: () => ({
                  top: positionRef.current.y,
                  left: positionRef.current.x,
                  right: positionRef.current.x,
                  bottom: positionRef.current.y,
                  width: 0,
                  height: 0,
                }),
              }
            : childNode
        }
        popperRef={popperRef}
        open={childNode ? open : false}
        id={id}
        {...interactiveWrapperListeners}
        {...popperProps}
        className={clsx(classes.popper, PopperProps?.className, componentsProps.popper?.className)}
        popperOptions={popperOptions}
      >
        <TooltipComponent
          {...tooltipProps}
          className={clsx(classes.tooltip, componentsProps.tooltip?.className)}
        >
          {title}
          {arrow ? (
            <ArrowComponent
              {...tooltipArrowProps}
              className={clsx(classes.arrow, componentsProps.arrow?.className)}
              ref={setArrowRef}
            />
          ) : null}
        </TooltipComponent>
      </PopperComponent>
    </React.Fragment>
  );
}) as OverridableComponent<TooltipTypeMap>;

Tooltip.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: PropTypes.bool,
  /**
   * Tooltip reference element.
   */
  children: PropTypes.any.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The components used for each slot inside the Tooltip.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Arrow: PropTypes.elementType,
    Popper: PropTypes.elementType,
    Tooltip: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Tooltip.
   * Note that `componentsProps.popper` prop values win over `PopperProps` if both are applied.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    arrow: PropTypes.object,
    popper: PropTypes.object,
    tooltip: PropTypes.object,
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: PropTypes.bool,
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
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: PropTypes.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: PropTypes.object,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['lg', 'md', 'sm']),
    PropTypes.string,
  ]),
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
   * The variant to use.
   * @default 'soft'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Tooltip;
