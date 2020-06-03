import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import withStyles from '../styles/withStyles';
import { duration } from '../styles/transitions';
import { getTransitionProps } from '../transitions/utils';
import useTheme from '../styles/useTheme';
import { useForkRef } from '../utils';

export const styles = (theme) => ({
  /* Styles applied to the container element. */
  container: {
    height: 0,
    overflow: 'hidden',
    transition: theme.transitions.create('height'),
  },
  /* Styles applied to the container element when the transition has entered. */
  entered: {
    height: 'auto',
    overflow: 'visible',
  },
  /* Styles applied to the container element when the transition has exited and `collapsedHeight` != 0px. */
  hidden: {
    visibility: 'hidden',
  },
  /* Styles applied to the outer wrapper element. */
  wrapper: {
    // Hack to get children with a negative margin to not falsify the height computation.
    display: 'flex',
  },
  /* Styles applied to the inner wrapper element. */
  wrapperInner: {
    width: '100%',
  },
});

/**
 * The Collapse transition is used by the
 * [Vertical Stepper](/components/steppers/#vertical-stepper) StepContent component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
const Collapse = React.forwardRef(function Collapse(props, ref) {
  const {
    children,
    classes,
    className,
    collapsedHeight: collapsedHeightProp = '0px',
    component: Component = 'div',
    disableStrictModeCompat = false,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style,
    timeout = duration.standard,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition,
    ...other
  } = props;
  const theme = useTheme();
  const timer = React.useRef();
  const wrapperRef = React.useRef(null);
  const autoTransitionDuration = React.useRef();
  const collapsedHeight =
    typeof collapsedHeightProp === 'number' ? `${collapsedHeightProp}px` : collapsedHeightProp;

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const enableStrictModeCompat = theme.unstable_strictMode && !disableStrictModeCompat;
  const nodeRef = React.useRef(null);
  const handleRef = useForkRef(ref, enableStrictModeCompat ? nodeRef : undefined);

  const normalizedTransitionCallback = (callback) => (nodeOrAppearing, maybeAppearing) => {
    if (callback) {
      const [node, isAppearing] = enableStrictModeCompat
        ? [nodeRef.current, nodeOrAppearing]
        : [nodeOrAppearing, maybeAppearing];

      // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
      if (isAppearing === undefined) {
        callback(node);
      } else {
        callback(node, isAppearing);
      }
    }
  };

  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    node.style.height = collapsedHeight;

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });

  const handleEntering = normalizedTransitionCallback((node, isAppearing) => {
    const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;

    const { duration: transitionDuration } = getTransitionProps(
      { style, timeout },
      {
        mode: 'enter',
      },
    );

    if (timeout === 'auto') {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration =
        typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;
    }

    node.style.height = `${wrapperHeight}px`;

    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });

  const handleEntered = normalizedTransitionCallback((node, isAppearing) => {
    node.style.height = 'auto';

    if (onEntered) {
      onEntered(node, isAppearing);
    }
  });

  const handleExit = normalizedTransitionCallback((node) => {
    const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;
    node.style.height = `${wrapperHeight}px`;

    if (onExit) {
      onExit(node);
    }
  });

  const handleExited = normalizedTransitionCallback(onExited);

  const handleExiting = normalizedTransitionCallback((node) => {
    const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;

    const { duration: transitionDuration } = getTransitionProps(
      { style, timeout },
      {
        mode: 'exit',
      },
    );

    if (timeout === 'auto') {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
      node.style.transitionDuration = `${duration2}ms`;
      autoTransitionDuration.current = duration2;
    } else {
      node.style.transitionDuration =
        typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;
    }

    node.style.height = collapsedHeight;

    if (onExiting) {
      onExiting(node);
    }
  });

  const addEndListener = (nodeOrNext, maybeNext) => {
    const next = enableStrictModeCompat ? nodeOrNext : maybeNext;
    if (timeout === 'auto') {
      timer.current = setTimeout(next, autoTransitionDuration.current || 0);
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
      addEndListener={addEndListener}
      nodeRef={enableStrictModeCompat ? nodeRef : undefined}
      timeout={timeout === 'auto' ? null : timeout}
      {...other}
    >
      {(state, childProps) => (
        <Component
          className={clsx(
            classes.container,
            {
              [classes.entered]: state === 'entered',
              [classes.hidden]: state === 'exited' && !inProp && collapsedHeight === '0px',
            },
            className,
          )}
          style={{
            minHeight: collapsedHeight,
            ...style,
          }}
          ref={handleRef}
          {...childProps}
        >
          <div className={classes.wrapper} ref={wrapperRef}>
            <div className={classes.wrapperInner}>{children}</div>
          </div>
        </Component>
      )}
    </TransitionComponent>
  );
});

Collapse.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content node to be collapsed.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The height of the container when collapsed.
   */
  collapsedHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * Enable this prop if you encounter 'Function components cannot be given refs',
   * use `unstable_createStrictModeTheme`,
   * and can't forward the ref in the passed `Component`.
   */
  disableStrictModeCompat: PropTypes.bool,
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
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
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

Collapse.muiSupportAuto = true;

export default withStyles(styles, { name: 'MuiCollapse' })(Collapse);
