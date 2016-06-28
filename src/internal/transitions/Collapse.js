import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import Transition from 'react-overlays/lib/Transition';

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
    },
  };
});

export default class Collapse extends Component {
  static propTypes = {
    /**
     * Set to true to automatically calculate transition time based on height
     */
    autoDuration: PropTypes.bool,
    /**
     * The content node to be collapsed.
     */
    children: PropTypes.node,
    /**
     * Set to true to transition in
     */
    in: PropTypes.bool,
  };

  static defaultProps = {
    autoDuration: false,
    in: false,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  handleEnter = (element) => {
    element.style.height = 0;
  };

  handleEntering = (element) => {
    const {autoDuration} = this.props;
    const wrapperHeight = this.wrapper.clientHeight;
    if (autoDuration) {
      element.style.transitionDuration = `${this.getTransitionDuration(wrapperHeight)}ms`;
    }
    element.style.height = `${wrapperHeight}px`;
  };

  handleEntered = (element) => {
    element.style.height = 'auto';
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
    const {children, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet);

    const containerClassname = ClassNames({
      [classes.container]: true,
      [classes.entered]: this.props.in,
    });

    return (
      <Transition
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExiting={this.handleExiting}
        timeout={300}
        {...other}
      >
        <div className={containerClassname}>
          <div ref={(c) => this.wrapper = c}>
            {children}
          </div>
        </div>
      </Transition>
    );
  }
}
