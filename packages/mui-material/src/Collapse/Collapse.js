'use client';
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import useTimeout from '@mui/utils/useTimeout';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import composeClasses from '@mui/utils/composeClasses';
import { styled, useTheme } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { duration } from '../styles/createTransitions';
import { getTransitionProps } from '../transitions/utils';
import { useForkRef } from '../utils';
import { getCollapseUtilityClass } from './collapseClasses';

const useUtilityClasses = (ownerState) => {
  const { orientation, classes } = ownerState;

  const slots = {
    root: ['root', `${orientation}`],
    entered: ['entered'],
    hidden: ['hidden'],
    wrapper: ['wrapper', `${orientation}`],
    wrapperInner: ['wrapperInner', `${orientation}`],
  };

  return composeClasses(slots, getCollapseUtilityClass, classes);
};

const CollapseRoot = styled('div', {
  name: 'MuiCollapse',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.orientation],
      ownerState.state === 'entered' && styles.entered,
      ownerState.state === 'exited' &&
        !ownerState.in &&
        ownerState.collapsedSize === '0px' &&
        styles.hidden,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    height: 0,
    overflow: 'hidden',
    transition: theme.transitions.create('height'),
    variants: [
      {
        props: {
          orientation: 'horizontal',
        },
        style: {
          height: 'auto',
          width: 0,
          transition: theme.transitions.create('width'),
        },
      },
      {
        props: {
          state: 'entered',
        },
        style: {
          height: 'auto',
          overflow: 'visible',
        },
      },
      {
        props: {
          state: 'entered',
          orientation: 'horizontal',
        },
        style: {
          width: 'auto',
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.state === 'exited' && !ownerState.in && ownerState.collapsedSize === '0px',
        style: {
          visibility: 'hidden',
        },
      },
    ],
  })),
);

const CollapseWrapper = styled('div', {
  name: 'MuiCollapse',
  slot: 'Wrapper',
  overridesResolver: (props, styles) => styles.wrapper,
})({
  // Hack to get children with a negative margin to not falsify the height computation.
  display: 'flex',
  width: '100%',
  variants: [
    {
      props: {
        orientation: 'horizontal',
      },
      style: {
        width: 'auto',
        height: '100%',
      },
    },
  ],
});

const CollapseWrapperInner = styled('div', {
  name: 'MuiCollapse',
  slot: 'WrapperInner',
  overridesResolver: (props, styles) => styles.wrapperInner,
})({
  width: '100%',
  variants: [
    {
      props: {
        orientation: 'horizontal',
      },
      style: {
        width: 'auto',
        height: '100%',
      },
    },
  ],
});

/**
 * The Collapse transition is used by the
 * [Vertical Stepper](/material-ui/react-stepper/#vertical-stepper) StepContent component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
const Collapse = React.forwardRef(function Collapse(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiCollapse' });
  const {
    addEndListener,
    children,
    className,
    collapsedSize: collapsedSizeProp = '0px',
    component,
    easing,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    orientation = 'vertical',
    style,
    timeout = duration.standard,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition,
    ...other
  } = props;

  const ownerState = {
    ...props,
    orientation,
    collapsedSize: collapsedSizeProp,
  };

  const classes = useUtilityClasses(ownerState);

  const theme = useTheme();
  const timer = useTimeout();
  const wrapperRef = React.useRef(null);
  const autoTransitionDuration = React.useRef();
  const collapsedSize =
    typeof collapsedSizeProp === 'number' ? `${collapsedSizeProp}px` : collapsedSizeProp;
  const isHorizontal = orientation === 'horizontal';
  const size = isHorizontal ? 'width' : 'height';

  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(ref, nodeRef);

  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;

      // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
      if (maybeIsAppearing === undefined) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };

  const getWrapperSize = () =>
    wrapperRef.current ? wrapperRef.current[isHorizontal ? 'clientWidth' : 'clientHeight'] : 0;

  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    if (wrapperRef.current && isHorizontal) {
      // Set absolute position to get the size of collapsed content
      wrapperRef.current.style.position = 'absolute';
    }
    node.style[size] = collapsedSize;

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });

  const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
    const wrapperSize = getWrapperSize();

    if (wrapperRef.current && isHorizontal) {
      // After the size is read reset the position back to default
      wrapperRef.current.style.position = '';
    }

    const { duration: transitionDuration, easing: transitionTimingFunction } = getTransitionProps(
      { style, timeout, easing },
      {
        mode: 'enter',
      },
    );

    if (timeout === 'auto') {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration =
        typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;
    }

    node.style[size] = `${wrapperSize}px`;
    node.style.transitionTimingFunction = transitionTimingFunction;

    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });

  const handleEntered = normalizedTransitionCallback((node, isAppearing) => {
    node.style[size] = 'auto';

    if (onEntered) {
      onEntered(node, isAppearing);
    }
  });

  const handleExit = normalizedTransitionCallback((node) => {
    node.style[size] = `${getWrapperSize()}px`;

    if (onExit) {
      onExit(node);
    }
  });

  const handleExited = normalizedTransitionCallback(onExited);

  const handleExiting = normalizedTransitionCallback((node) => {
    const wrapperSize = getWrapperSize();
    const { duration: transitionDuration, easing: transitionTimingFunction } = getTransitionProps(
      { style, timeout, easing },
      {
        mode: 'exit',
      },
    );

    if (timeout === 'auto') {
      // TODO: rename getAutoHeightDuration to something more generic (width support)
      // Actually it just calculates animation duration based on size
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperSize);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration =
        typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;
    }

    node.style[size] = collapsedSize;
    node.style.transitionTimingFunction = transitionTimingFunction;

    if (onExiting) {
      onExiting(node);
    }
  });

  const handleAddEndListener = (next) => {
    if (timeout === 'auto') {
      timer.start(autoTransitionDuration.current || 0, next);
    }
    if (addEndListener) {
      // Old call signature before `react-transition-group` implemented `nodeRef`
      addEndListener(nodeRef.current, next);
    }
  };

  return (
    <TransitionComponent
      in={inProp}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
      onExit={handleExit}
      onExited={handleExited}
      onExiting={handleExiting}
      addEndListener={handleAddEndListener}
      nodeRef={nodeRef}
      timeout={timeout === 'auto' ? null : timeout}
      {...other}
    >
      {(state, childProps) => (
        <CollapseRoot
          as={component}
          className={clsx(
            classes.root,
            {
              [classes.entered]: state === 'entered',
              [classes.hidden]: state === 'exited' && !inProp && collapsedSize === '0px',
            },
            className,
          )}
          style={{
            [isHorizontal ? 'minWidth' : 'minHeight']: collapsedSize,
            ...style,
          }}
          ref={handleRef}
          {...childProps}
          // `ownerState` is set after `childProps` to override any existing `ownerState` property in `childProps`
          // that might have been forwarded from the Transition component.
          ownerState={{ ...ownerState, state }}
        >
          <CollapseWrapper
            ownerState={{ ...ownerState, state }}
            className={classes.wrapper}
            ref={wrapperRef}
          >
            <CollapseWrapperInner
              ownerState={{ ...ownerState, state }}
              className={classes.wrapperInner}
            >
              {children}
            </CollapseWrapperInner>
          </CollapseWrapper>
        </CollapseRoot>
      )}
    </TransitionComponent>
  );
});

Collapse.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: PropTypes.func,
  /**
   * The content node to be collapsed.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The width (horizontal) or height (vertical) of the container when collapsed.
   * @default '0px'
   */
  collapsedSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: PropTypes.oneOfType([
    PropTypes.shape({
      enter: PropTypes.string,
      exit: PropTypes.string,
    }),
    PropTypes.string,
  ]),
  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntered: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  onExited: PropTypes.func,
  /**
   * @ignore
   */
  onExiting: PropTypes.func,
  /**
   * The transition orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default duration.standard
   */
  timeout: PropTypes.oneOfType([
    PropTypes.oneOf(['auto']),
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

if (Collapse) {
  Collapse.muiSupportAuto = true;
}

export default Collapse;
