// @inheritedComponent Transition

import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
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
 * [Vertical Stepper](/demos/steppers/#vertical-stepper) StepContent component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
class Collapse extends React.Component {
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleEnter = node => {
    node.style.height = this.props.collapsedHeight;

    if (this.props.onEnter) {
      this.props.onEnter(node);
    }
  };

  handleEntering = node => {
    const { timeout, theme } = this.props;
    const wrapperHeight = this.wrapperRef ? this.wrapperRef.clientHeight : 0;

    const { duration: transitionDuration } = getTransitionProps(this.props, {
      mode: 'enter',
    });

    if (timeout === 'auto') {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
      node.style.transitionDuration = `${duration2}ms`;
      this.autoTransitionDuration = duration2;
    } else {
      node.style.transitionDuration =
        typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;
    }

    node.style.height = `${wrapperHeight}px`;

    if (this.props.onEntering) {
      this.props.onEntering(node);
    }
  };

  handleEntered = node => {
    node.style.height = 'auto';

    if (this.props.onEntered) {
      this.props.onEntered(node);
    }
  };

  handleExit = node => {
    const wrapperHeight = this.wrapperRef ? this.wrapperRef.clientHeight : 0;
    node.style.height = `${wrapperHeight}px`;

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  handleExiting = node => {
    const { timeout, theme } = this.props;
    const wrapperHeight = this.wrapperRef ? this.wrapperRef.clientHeight : 0;

    const { duration: transitionDuration } = getTransitionProps(this.props, {
      mode: 'exit',
    });

    if (timeout === 'auto') {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
      node.style.transitionDuration = `${duration2}ms`;
      this.autoTransitionDuration = duration2;
    } else {
      node.style.transitionDuration =
        typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;
    }

    node.style.height = this.props.collapsedHeight;

    if (this.props.onExiting) {
      this.props.onExiting(node);
    }
  };

  addEndListener = (_, next) => {
    if (this.props.timeout === 'auto') {
      this.timer = setTimeout(next, this.autoTransitionDuration || 0);
    }
  };

  render() {
    const {
      children,
      classes,
      className,
      collapsedHeight,
      component: Component,
      in: inProp,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExiting,
      style,
      theme,
      timeout,
      ...other
    } = this.props;

    return (
      <Transition
        in={inProp}
        onEnter={this.handleEnter}
        onEntered={this.handleEntered}
        onEntering={this.handleEntering}
        onExit={this.handleExit}
        onExiting={this.handleExiting}
        addEndListener={this.addEndListener}
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
            {...childProps}
          >
            <div
              className={classes.wrapper}
              ref={ref => {
                this.wrapperRef = ref;
              }}
            >
              <div className={classes.wrapperInner}>{children}</div>
            </div>
          </Component>
        )}
      </Transition>
    );
  }
}

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

Collapse.defaultProps = {
  collapsedHeight: '0px',
  component: 'div',
  timeout: duration.standard,
};

Collapse.muiSupportAuto = true;

export default withStyles(styles, {
  withTheme: true,
  name: 'MuiCollapse',
})(Collapse);
