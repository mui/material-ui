// @flow
import React, {Component, PropTypes, Element} from 'react';
import {createStyleSheet} from 'stylishly';
import ClassNames from 'classnames';
import shallowEqual from 'recompose/shallowEqual';
import Transition from '../internal/Transition';

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
      transitionDuration: '0ms',
    },
  };
});

type DefaultProps = {
  in: boolean,
  transitionDuration: number|string,
}

type Props = {
  /**
   * The content node to be collapsed.
   */
  children?: Element<any>,
  /**
   * Class name passed to the wrapping container
   * required for holding+measuring the expanding content
   */
  containerClassName?: string,
  /**
   * Set to true to transition in
   */
  in: boolean,
  /**
   * Callback fired before the component is entering
   */
  onEnter?: TransitionHandler,
  /**
   * Callback fired when the component is entering
   */
  onEntering?: TransitionHandler,
  /**
   * Callback fired when the component has entered
   */
  onEntered?: TransitionHandler, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the component is exiting
   */
  onExit?: TransitionHandler,
  /**
   * Callback fired when the component is exiting
   */
  onExiting?: TransitionHandler,
  /**
   * Callback fired when the component has exited
   */
  onExited?: TransitionHandler, // eslint-disable-line react/sort-prop-types
  /**
   * Set to 'auto' to automatically calculate transition time based on height
   */
  transitionDuration: number|string,
};

export default class Collapse extends Component<DefaultProps, Props, void> {
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  static defaultProps:DefaultProps = {
    in: false,
    transitionDuration: 300,
  };

  shouldComponentUpdate(nextProps: Props, nextState: void) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  wrapper:HTMLElement;
  props:Props;

  handleEnter:TransitionHandler = (element) => {
    element.style.height = '0px';
    if (this.props.onEnter) {
      this.props.onEnter();
    }
  };

  handleEntered:TransitionHandler = () => {
    if (this.props.onEntered) {
      this.props.onEntered();
    }
  };

  handleEntering:TransitionHandler = (element) => {
    const {transitionDuration} = this.props;
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;

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

    if (this.props.onEntering) {
      this.props.onEntering();
    }
  };

  handleExit:TransitionHandler = (element) => {
    const wrapperHeight = this.wrapper ? this.wrapper.clientHeight : 0;
    element.style.height = `${wrapperHeight}px`;
    reflow(element);
    if (this.props.onExit) {
      this.props.onExit();
    }
  };

  handleExiting:TransitionHandler = (element) => {
    element.style.height = '0px';
    if (this.props.onExiting) {
      this.props.onExiting();
    }
  };

  getTransitionDuration(wrapperHeight: number): number {
    if (!wrapperHeight) {
      return 0;
    }
    const constant = wrapperHeight / 36;
    return Math.round(175 / constant + 25) * constant;
  }

  render(): Element<any> {
    const {
      children,
      containerClassName,
      onEnter, // eslint-disable-line no-unused-vars
      onEntering, // eslint-disable-line no-unused-vars
      onExit, // eslint-disable-line no-unused-vars
      onExiting, // eslint-disable-line no-unused-vars
      transitionDuration, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, {group: 'mui'});

    const containerClasses = ClassNames(classes.container, containerClassName);

    return (
      <Transition
        transitionAppear={true}
        onEntering={this.handleEntering}
        onEnter={this.handleEnter}
        onEntered={this.handleEntered}
        enteredClassName={classes.entered}
        onExiting={this.handleExiting}
        onExit={this.handleExit}
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
