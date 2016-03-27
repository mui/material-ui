import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactTransitionGroup from 'react-addons-transition-group';
import Dom from '../utils/dom';
import CircleRipple from './CircleRipple';
import update from 'react-addons-update';

function push(array, obj) {
  const newObj = Array.isArray(obj) ? obj : [obj];
  return update(array, {$push: newObj});
}

function shift(array) {
  //Remove the first element in the array using React immutability helpers
  return update(array, {$splice: [[0, 1]]});
}

const TouchRipple = React.createClass({

  propTypes: {
    abortOnScroll: React.PropTypes.bool,
    centerRipple: React.PropTypes.bool,
    children: React.PropTypes.node,
    color: React.PropTypes.string,

    /**
     * @ignore
     * The material-ui theme applied to this component.
     */
    muiTheme: React.PropTypes.object.isRequired,

    opacity: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
  ],

  getDefaultProps() {
    return {
      abortOnScroll: true,
    };
  },

  getInitialState() {
    //Touch start produces a mouse down event for compat reasons. To avoid
    //showing ripples twice we skip showing a ripple for the first mouse down
    //after a touch start. Note we don't store ignoreNextMouseDown in this.state
    //to avoid re-rendering when we change it
    this._ignoreNextMouseDown = false;

    return {
      //This prop allows us to only render the ReactTransitionGroup
      //on the first click of the component, making the inital
      //render faster
      hasRipples: false,
      nextKey: 0,
      ripples: [],
    };
  },

  start(event, isRippleTouchGenerated) {
    const theme = this.props.muiTheme.ripple;

    if (this._ignoreNextMouseDown && !isRippleTouchGenerated) {
      this._ignoreNextMouseDown = false;
      return;
    }

    let ripples = this.state.ripples;

    //Add a ripple to the ripples array
    ripples = push(ripples, (
      <CircleRipple
        key={this.state.nextKey}
        muiTheme={this.props.muiTheme}
        style={!this.props.centerRipple ? this._getRippleStyle(event) : {}}
        color={this.props.color || theme.color}
        opacity={this.props.opacity}
        touchGenerated={isRippleTouchGenerated}
      />
    ));

    this._ignoreNextMouseDown = isRippleTouchGenerated;
    this.setState({
      hasRipples: true,
      nextKey: this.state.nextKey + 1,
      ripples: ripples,
    });
  },

  end() {
    const currentRipples = this.state.ripples;
    this.setState({
      ripples: shift(currentRipples),
    });
    if (this.props.abortOnScroll) {
      this._stopListeningForScrollAbort();
    }
  },

  handleMouseDown(event) {
    //only listen to left clicks
    if (event.button === 0) {
      this.start(event, false);
    }
  },

  handleMouseUp() {
    this.end();
  },

  handleMouseLeave() {
    this.end();
  },

  handleTouchStart(event) {
    event.stopPropagation();
    //If the user is swiping (not just tapping), save the position so we can
    //abort ripples if the user appears to be scrolling
    if (this.props.abortOnScroll && event.touches) {
      this._startListeningForScrollAbort(event);
      this._startTime = Date.now();
    }
    this.start(event, true);
  },

  handleTouchEnd() {
    this.end();
  },

  //Check if the user seems to be scrolling and abort the animation if so
  _handleTouchMove(event) {
    //Stop trying to abort if we're already 300ms into the animation
    const timeSinceStart = Math.abs(Date.now() - this._startTime);
    if (timeSinceStart > 300) {
      this._stopListeningForScrollAbort();
      return;
    }

    //If the user is scrolling...
    const deltaY = Math.abs(event.touches[0].clientY - this._firstTouchY);
    const deltaX = Math.abs(event.touches[0].clientX - this._firstTouchX);
    //Call it a scroll after an arbitrary 6px (feels reasonable in testing)
    if (deltaY > 6 || deltaX > 6) {
      let currentRipples = this.state.ripples;
      const ripple = currentRipples[0];
      //This clone will replace the ripple in ReactTransitionGroup with a
      //version that will disappear immediately when removed from the DOM
      const abortedRipple = React.cloneElement(ripple, {aborted: true});
      //Remove the old ripple and replace it with the new updated one
      currentRipples = shift(currentRipples);
      currentRipples = push(currentRipples, abortedRipple);
      this.setState({ripples: currentRipples}, () => {
        //Call end after we've set the ripple to abort otherwise the setState
        //in end() merges with this and the ripple abort fails
        this.end();
      });
    }
  },

  _startListeningForScrollAbort(event) {
    this._firstTouchY = event.touches[0].clientY;
    this._firstTouchX = event.touches[0].clientX;
    //Note that when scolling Chrome throttles this event to every 200ms
    //Also note we don't listen for scroll events directly as there's no general
    //way to cover cases like scrolling within containers on the page
    document.body.addEventListener('touchmove', this._handleTouchMove);
  },

  _stopListeningForScrollAbort() {
    document.body.removeEventListener('touchmove', this._handleTouchMove);
  },

  _getRippleStyle(event) {
    const style = {};
    const el = ReactDOM.findDOMNode(this);
    const elHeight = el.offsetHeight;
    const elWidth = el.offsetWidth;
    const offset = Dom.offset(el);
    const isTouchEvent = event.touches && event.touches.length;
    const pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
    const pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;
    const pointerX = pageX - offset.left;
    const pointerY = pageY - offset.top;
    const topLeftDiag = this._calcDiag(pointerX, pointerY);
    const topRightDiag = this._calcDiag(elWidth - pointerX, pointerY);
    const botRightDiag = this._calcDiag(elWidth - pointerX, elHeight - pointerY);
    const botLeftDiag = this._calcDiag(pointerX, elHeight - pointerY);
    const rippleRadius = Math.max(
      topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
    );
    const rippleSize = rippleRadius * 2;
    const left = pointerX - rippleRadius;
    const top = pointerY - rippleRadius;

    style.height = `${rippleSize}px`;
    style.width = `${rippleSize}px`;
    style.top = `${top}px`;
    style.left = `${left}px`;

    return style;
  },

  _calcDiag(a, b) {
    return Math.sqrt((a * a) + (b * b));
  },


  render() {
    const {
      children,
      muiTheme: {
        prepareStyles,
      },
      style,
    } = this.props;

    const {
      hasRipples,
      ripples,
    } = this.state;

    let rippleGroup;
    if (hasRipples) {
      const mergedStyles = Object.assign({
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
      }, style);

      rippleGroup = (
        <ReactTransitionGroup style={prepareStyles(mergedStyles)}>
          {ripples}
        </ReactTransitionGroup>
      );
    }

    return (
      <div
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        {rippleGroup}
        {children}
      </div>
    );
  },

});

export default TouchRipple;
