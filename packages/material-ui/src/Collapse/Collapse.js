import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import withStyles from '../styles/withStyles';
import { duration } from '../styles/transitions';
import { getTransitionProps } from '../transitions/utils';

export const styles = theme => ({
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
    collapsedHeight = '0px',
    component: Component = 'div',
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExiting,
    style,
    theme,
    timeout = duration.standard,
    ...other
  } = props;
  const timer = React.useRef();
  const wrapperRef = React.useRef(null);
  const autoTransitionDuration = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleEnter = node => {
    node.style.height = collapsedHeight;

    if (onEnter) {
      onEnter(node);
    }
  };

  const handleEntering = node => {
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
      onEntering(node);
    }
  };

  const handleEntered = node => {
    node.style.height = 'auto';

    if (onEntered) {
      onEntered(node);
    }
  };

  const handleExit = node => {
    const wrapperHeight = wrapperRef.current ? wrapperRef.current.clientHeight : 0;
    node.style.height = `${wrapperHeight}px`;

    if (onExit) {
      onExit(node);
    }
  };

  const handleExiting = node => {
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
  };

  const addEndListener = (_, next) => {
    if (timeout === 'auto') {
      timer.current = setTimeout(next, autoTransitionDuration.current || 0);
    }
  };

  return (
    <Transition
      in={inProp}
      onEnter={handleEnter}
      onEntered={handleEntered}
      onEntering={handleEntering}
      onExit={handleExit}
      onExiting={handleExiting}
      addEndListener={addEndListener}
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
          ref={ref}
          {...childProps}
        >
          <div className={classes.wrapper} ref={wrapperRef}>
            <div className={classes.wrapperInner}>{children}</div>
          </div>
        </Component>
      )}
    </Transition>
  );
});

Collapse.propTypes = {
  /**
   * The content node to be collapsed.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The height of the container when collapsed.
   */
  collapsedHeight: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
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
  onExiting: PropTypes.func,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    PropTypes.oneOf(['auto']),
  ]),
};

Collapse.muiSupportAuto = true;

export default withStyles(styles, {
  withTheme: true,
  name: 'MuiCollapse',
})(Collapse);
