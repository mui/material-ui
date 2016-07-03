import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import Transition from '../Transition';

const reflow = (elem) => elem.offsetHeight;

export const styleSheet = createStyleSheet('Collapse', (theme) => {
  return {
    container: {
      height: 0,
      overflow: 'hidden',
      transition: theme.transitions.create('height'),
    },
    entered: {
      height: 'auto',
      transitionDuration: 0,
    },
  };
});

export default class Collapse extends Component {
  static propTypes = {
    /**
     * The content node to be collapsed.
     */
    children: PropTypes.node,
    containerClassName: PropTypes.string,
    /**
     * Set to true to transition in
     */
    in: PropTypes.bool,
    /**
     * Set to 'auto' to automatically calculate transition time based on height
     */
    transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static defaultProps = {
    in: false,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  handleEnter = (element) => {
    element.style.height = 0;
  };

  handleEntering = (element) => {
    const {transitionDuration} = this.props;
    const wrapperHeight = this.wrapper.clientHeight;

    if (transitionDuration) {
      if (transitionDuration === 'auto') {
        element.style.transitionDuration = `${this.getTransitionDuration(wrapperHeight)}ms`;
      } else if (typeof transitionDuration === 'number') {
        element.style.transitionDuration = `${transitionDuration}ms`;
      } else {
        element.style.transitionDuration = transitionDuration;
      }
    }

    element.style.height = `${wrapperHeight}px`;
  };

  handleExit = (element) => {
    element.style.height = `${this.wrapper.clientHeight}px`;
    reflow(element);
  };

  handleExiting = (element) => {
    element.style.height = 0;
  };

  getTransitionDuration(wrapperHeight) {
    if (!wrapperHeight) {
      return 0;
    }
    const constant = wrapperHeight / 36;
    return Math.round(175 / constant + 25) * constant;
  }

  render() {
    const {
      children,
      containerClassName,
      transitionDuration, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    const containerClasses = ClassNames(classes.container, containerClassName);

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        enteredClassName={classes.entered}
        onExit={this.handleExit}
        onExiting={this.handleExiting}
        timeout={300}
        {...other}
      >
        <div className={containerClasses}>
          <div ref={(c) => this.wrapper = c}>
            {children}
          </div>
        </div>
      </Transition>
    );
  }
}
