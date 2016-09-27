import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import FloatingActionButton from '../FloatingActionButton';
import autoPrefix from '../utils/autoPrefix';
import {extendChildren} from '../utils/childUtils';

/*
From
 https://material.google.com/components/buttons-floating-action-button.html#buttons-floating-action-button-behavior

Disappearing
 Icon keep the same proportion of root element
 7 frames ~233ms - FAB dissapear

Appearing
 9 frames ~300ms for all animation
 7 frames ~233ms for FAB itself,
 6 frames ~200ms for inner icon
 Icon start appearing after 3 frames ~100ms
*/

/*
From
  https://material.google.com/motion/duration-easing.html#duration-easing-common-durations

  150ms for desktop
  230ms for mobile
*/
const ANIMATION_LENGTH = 150;
const ICON_ANIMATION_START_TIME = 3 / 7 * ANIMATION_LENGTH;

// Deceleration curve (“Easing out”)
//   from https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
const appearTransition = `transform ${ANIMATION_LENGTH}ms cubic-bezier(0.0, 0.0, 0.2, 1) 0ms`;
const iconAppearTransition = `transform ${ANIMATION_LENGTH}ms cubic-bezier(0.0, 0.0, 0.2, 1)` +
  `${ICON_ANIMATION_START_TIME}ms`;


// Acceleration curve (“Easing in”)
//   from https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
const disappearTransition = `transform ${ANIMATION_LENGTH}ms cubic-bezier(0.4, 0.0, 1, 1) 0ms`;

const initialTransformStyle = {
  transform: 'scale(0)',
  transition: 'all 0s ease 0s',
};

const appearTransformStyle = {
  transform: 'scale(1)',
  transition: appearTransition,
};

const iconAppearTransformStyle = {
  transform: 'scale(1)',
  transition: iconAppearTransition,
};

const disappearTransformStyle = {
  transform: 'scale(0)',
  transition: disappearTransition,
};

// TICK in ms. The period the animation start after set initial style properties
const TICK = 0;

function applyStyle(element, style) {
  const elementStyle = ReactDOM.findDOMNode(element).style;
  autoPrefix.set(elementStyle, 'transition', style.transition);
  autoPrefix.set(elementStyle, 'transform', style.transform);
}

export default class AnimatedFAB extends React.Component {
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  static propTypes = {
    /**
     * This is what displayed inside the floating action button; for example, a SVG Icon.
     */
    children: PropTypes.node,
    /**
     * Callback function called after disappear animation will be finished.
     */
    onDidLeave: PropTypes.func,
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  componentWillAppear(callback) {
    this.componentWillEnter(callback);
  }

  componentWillEnter(callback) {
    const start = () => {
      applyStyle(this, appearTransformStyle);
      applyStyle(this.refs.child, iconAppearTransformStyle);
      this.timer = setTimeout(callback, ICON_ANIMATION_START_TIME + ANIMATION_LENGTH);
    };

    // prepare
    applyStyle(this, initialTransformStyle);
    applyStyle(this.refs.child, initialTransformStyle);
    setTimeout(start, TICK);
  }

  componentWillLeave(callback) {
    applyStyle(this, disappearTransformStyle);
    this.timer = setTimeout(callback, ANIMATION_LENGTH);
  }

  componentDidLeave() {
    if (this.props.onDidLeave) {
      this.props.onDidLeave();
    }
  }

  render() {
    const {
      onDidLeave, // eslint-disable-line no-unused-vars
      ...others,
    } = this.props;

    const children = extendChildren(this.props.children, {
      ref: 'child',
    })[0];

    return (
      <FloatingActionButton
        {...others}
      >
        {children}
      </FloatingActionButton>
    );
  }
}
