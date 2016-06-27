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
     * Can be used, for instance, to render a letter inside the avatar.
     */
    children: PropTypes.node,
    in: PropTypes.bool,
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
    reflow(element);
  };

  handleExiting = (element) => {
    element.style.height = 0;
  };

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
