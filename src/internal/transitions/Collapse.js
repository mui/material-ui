import React, {Component, PropTypes} from 'react';
import {createStyleSheet} from 'stylishly';
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
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.node,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  handleEnter = (element) => {
    element.style.height = 0;
  };

  handleEntering = (element) => {
    element.style.height = `${this.wrapper.clientHeight}px`;
  };

  handleEntered = (element) => {
    element.style.height = 'auto';
  };

  handleExit = (element) => {
    element.style.height = `${this.wrapper.clientHeight}px`;
  };

  handleExiting = (element) => {
    reflow(element);
    element.style.height = 0;
  };

  render() {
    const {children, ...other} = this.props;
    const classes = this.context.styleManager.render(styleSheet);

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
        <div className={classes.container}>
          <div ref={(c) => this.wrapper = c}>
            {children}
          </div>
        </div>
      </Transition>
    );
  }
}
