import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import {createStyleSheet} from 'stylishly/lib/styleSheet';
import ClassNames from 'classnames';
import Ripple from './Ripple';

export const styleSheet = createStyleSheet('TouchRipple', () => ({
  root: {
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    zIndex: 0,
  },
}));

export default class TouchRipple extends Component {
  static propTypes = {
    center: PropTypes.bool,
    className: PropTypes.string,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  state = {
    nextKey: 0,
    ripples: [],
  };

  ignoringMouseDown = false;

  start = (event) => {
    if (event.type === 'mousedown' && this.ignoringMouseDown) {
      this.ignoringMouseDown = false;
      return;
    }

    if (event.type === 'touchstart') {
      this.ignoringMouseDown = true;
    }

    let ripples = this.state.ripples;

    const elem = ReactDOM.findDOMNode(this);
    const rect = elem.getBoundingClientRect();

    // Get the size of the ripple
    let rippleX;
    let rippleY;
    let rippleSize;

    // Check if we are handling a keyboard click.
    if (event.clientX === 0 && event.clientY === 0 || this.props.center) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      const clientX = event.clientX ? event.clientX : event.touches[0].clientX;
      const clientY = event.clientY ? event.clientY : event.touches[0].clientY;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }

    if (this.props.center) {
      rippleSize = (rect.width + rect.height) / 2;
    } else {
      const sizeX = Math.max(Math.abs(elem.clientWidth - rippleX), rippleX) * 2 + 2;
      const sizeY = Math.max(Math.abs(elem.clientHeight - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
    }

    // Add a ripple to the ripples array
    ripples = [...ripples, (
      <Ripple
        key={this.state.nextKey}
        center={this.props.center}
        event={event}
        rippleX={rippleX}
        rippleY={rippleY}
        rippleSize={rippleSize}
      />
    )];

    this.setState({
      nextKey: this.state.nextKey + 1,
      ripples: ripples,
    });
  };

  stop = () => {
    const {ripples} = this.state;
    if (ripples && ripples.length) {
      this.setState({
        ripples: ripples.slice(1),
      });
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
        className={ClassNames(classes.root, className)}
        {...other}
      >
        {this.state.ripples}
      </ReactTransitionGroup>
    );
  }
}
