// @flow weak

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import shallowEqual from 'recompose/shallowEqual';
import { createStyleSheet } from 'jss-theme-reactor';
import classNames from 'classnames';
import Ripple, { styleSheet as rippleStyleSheet } from './Ripple';

export const styleSheet = createStyleSheet('TouchRipple', () => ({
  root: {
    display: 'block',
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: 'inherit',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    pointerEvents: 'none',
    zIndex: 0,
  },
}), { index: 5 });

export default class TouchRipple extends Component {
  static propTypes = {
    center: PropTypes.bool,
    className: PropTypes.string,
  };

  static contextTypes = {
    theme: PropTypes.object.isRequired,
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    nextKey: 0,
    ripples: [],
  };

  componentWillMount() {
    // Pre-render the ripple styles
    this.context.styleManager.render(rippleStyleSheet);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState) ||
      !shallowEqual(this.context.theme, nextContext.theme)
    );
  }

  lastRipple = null;
  ignoringMouseDown = false;

  pulsate = () => {
    this.start({}, { pulsate: true });
  };

  start = (event = {}, options = {}, cb) => {
    const {
      pulsate = false,
      center = this.props.center || options.pulsate,
    } = options;

    if (event.type === 'mousedown' && this.ignoringMouseDown) {
      this.ignoringMouseDown = false;
      return;
    }

    if (event.type === 'touchstart') {
      this.ignoringMouseDown = true;
    }

    let ripples = this.state.ripples;

    const elem = ReactDOM.findDOMNode(this);
    const rect = elem ? elem.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    };

    // Get the size of the ripple
    let rippleX;
    let rippleY;
    let rippleSize;

    if (
      center ||
      (event.clientX === 0 && event.clientY === 0) ||
      (!event.clientX && !event.touches)
    ) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const clientX = event.clientX ? event.clientX : event.touches[0].clientX;
      const clientY = event.clientY ? event.clientY : event.touches[0].clientY;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }

    if (center) {
      // rippleSize = (rect.width + rect.height) / 2;
      rippleSize = Math.sqrt(((2 * Math.pow(rect.width, 2)) + Math.pow(rect.height, 2)) / 3);
    } else {
      const sizeX = (Math.max(Math.abs((elem ? elem.clientWidth : 0) - rippleX), rippleX) * 2) + 2;
      const sizeY = (Math.max(Math.abs((elem ? elem.clientHeight : 0) - rippleY), rippleY) * 2) + 2;
      rippleSize = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
    }

    // Add a ripple to the ripples array
    ripples = [...ripples, (
      <Ripple
        ref={(c) => { this.lastRipple = c; }}
        key={this.state.nextKey}
        center={center}
        event={event}
        pulsate={pulsate}
        rippleX={rippleX}
        rippleY={rippleY}
        rippleSize={rippleSize}
      />
    )];

    this.setState({
      nextKey: this.state.nextKey + 1,
      ripples,
    }, cb);
  };

  stop = (event, cb) => {
    const { ripples } = this.state;
    if (ripples && ripples.length) {
      this.setState({
        ripples: ripples.slice(1),
      }, cb);
    }
  };

  render() {
    const {
      center, // eslint-disable-line no-unused-vars
      className,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);

    return (
      <ReactTransitionGroup
        component="span"
        transitionEnterTimeout={550}
        transitionLeaveTimeout={550}
        className={classNames(classes.root, className)}
        {...other}
      >
        {this.state.ripples}
      </ReactTransitionGroup>
    );
  }
}
