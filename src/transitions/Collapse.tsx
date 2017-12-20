// @inheritedComponent Transition

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import withStyles from '../styles/withStyles';
import { duration } from '../styles/transitions';
import { StyleRulesCallback, Theme, WithStyles } from '../styles';
import { StandardProps } from '../MuiProps';
import { TransitionDuration, TransitionProps } from './transition';
import { Omit } from 'type-zoo';

export interface CollapseProps extends Omit<TransitionProps, 'timeout'> {
  children?: React.ReactNode;
  collapsedHeight?: string;
  component?: string | React.ComponentType<CollapseProps>;
  containerProps?: object;
  theme?: Theme;
  timeout?: TransitionDuration | 'auto';
}

export type CollapseClassKey = 'container' | 'entered' | 'wrapper' | 'wrapperInner';
export const CollapseStyles: StyleRulesCallback<CollapseClassKey> = ({ transitions }) => ({
  container: {
    height: 0,
    overflow: 'hidden',
    transition: transitions.create('height'),
  },
  entered: {
    height: 'auto',
  },
  wrapper: {
    // Hack to get children with a negative margin to not falsify the height computation.
    display: 'flex',
  },
  wrapperInner: {
    width: '100%',
  },
});

class Collapse extends React.Component<CollapseProps & WithStyles<CollapseClassKey>> {
  static defaultProps = {
    appear: false,
    collapsedHeight: '0px',
    component: 'div',
    timeout: duration.standard,
  };

  wrapper: HTMLElement = null;
  autoTransitionDuration: number = undefined;

  handleEnter = (node: HTMLElement, isAppearing: boolean) => {
    node.style.height = this.props.collapsedHeight;

    if (this.props.onEnter) {
      this.props.onEnter(node, isAppearing);
    }
  };

  handleEntering = (node: HTMLElement, isAppearing: boolean) => {
    const { timeout, theme } = this.props;
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;

    if (timeout === 'auto') {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
      node.style.transitionDuration = `${duration2}ms`;
      this.autoTransitionDuration = duration2;
    } else if (typeof timeout === 'number') {
      node.style.transitionDuration = `${timeout}ms`;
    } else if (timeout && typeof timeout.enter === 'number') {
      node.style.transitionDuration = `${timeout.enter}ms`;
    } else {
      // The propType will warn in this case.
    }

    node.style.height = `${wrapperHeight}px`;

    if (this.props.onEntering) {
      this.props.onEntering(node, isAppearing);
    }
  };

  handleEntered = (node: HTMLElement) => {
    node.style.height = 'auto';

    if (this.props.onEntered) {
      this.props.onEntered(node, true);
    }
  };

  handleExit = (node: HTMLElement) => {
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;
    node.style.height = `${wrapperHeight}px`;

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  handleExiting = (node: HTMLElement) => {
    const { timeout, theme } = this.props;
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;

    if (timeout === 'auto') {
      const duration2 = theme.transitions.getAutoHeightDuration(wrapperHeight);
      node.style.transitionDuration = `${duration2}ms`;
      this.autoTransitionDuration = duration2;
    } else if (typeof timeout === 'number') {
      node.style.transitionDuration = `${timeout}ms`;
    } else if (timeout && typeof timeout.exit === 'number') {
      node.style.transitionDuration = `${timeout.exit}ms`;
    } else {
      // The propType will warn in this case.
    }

    node.style.height = this.props.collapsedHeight;

    if (this.props.onExiting) {
      this.props.onExiting(node);
    }
  };

  addEndListener = (node: HTMLElement, next: Function) => {
    if (this.props.timeout === 'auto') {
      setTimeout(next, this.autoTransitionDuration || 0);
    }
  };

  render() {
    const {
      appear,
      children,
      classes,
      className,
      collapsedHeight,
      component: ComponentProp,
      containerProps,
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
        appear={appear}
        onEntering={this.handleEntering}
        onEnter={this.handleEnter}
        onEntered={this.handleEntered}
        onExiting={this.handleExiting}
        onExit={this.handleExit}
        addEndListener={this.addEndListener}
        timeout={timeout === 'auto' ? null : timeout}
        {...other}
      >
        {(state: any, otherInner: any) => {
          return (
            <ComponentProp
              className={classNames(
                classes.container,
                {
                  [classes.entered]: state === 'entered',
                },
                className,
              )}
              style={{
                ...style,
                minHeight: collapsedHeight,
              }}
              {...otherInner}
            >
              <div
                className={classes.wrapper}
                ref={node => {
                  this.wrapper = node;
                }}
              >
                <div className={classes.wrapperInner}>{children}</div>
              </div>
            </ComponentProp>
          );
        }}
      </Transition>
    );
  }
}

(Collapse as any).propTypes = {
  /**
   * @ignore
   */
  appear: PropTypes.bool,
  /**
   * The content node to be collapsed.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
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
   * The default value is a `button`.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Properties applied to the `Collapse` container.
   */
  containerProps: PropTypes.object,
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

export default withStyles<CollapseClassKey>(CollapseStyles, {
  withTheme: true,
  name: 'MuiCollapse',
})(Collapse);
