let React = require('react');
let StylePropable = require('../mixins/style-propable');
let Dom = require('../utils/dom');
let RippleCircle = require('./circle-ripple');


let TouchRipple = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    centerRipple: React.PropTypes.bool,
    color: React.PropTypes.string,
    opacity: React.PropTypes.number,
  },

  getInitialState() {
    return {
      ripples: [{
        key: 0,
        started: false,
        ending: false,
      }],
    };
  },

  render() {
    let styles = this.mergeAndPrefix({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden',
    }, this.props.style);

    return (
      <div
        onMouseUp={this._handleMouseUp}
        onMouseDown={this._handleMouseDown}
        onMouseLeave={this._handleMouseLeave}
        onTouchStart={this._handleTouchStart}
        onTouchEnd={this._handleTouchEnd}>
        <div style={styles}>
          {this._getRippleElements()}
        </div>
        {this.props.children}
      </div>
    );
  },

  start(e, isRippleTouchGenerated) {
    let ripples = this.state.ripples;
    let nextKey = ripples[ripples.length-1].key + 1;
    let style = !this.props.centerRipple ? this._getRippleStyle(e) : {};
    let ripple;

    //Do nothing if we're starting a click-event-generated ripple
    //while having touch-generated ripples
    if (!isRippleTouchGenerated) {
      for (let i = 0; i < ripples.length; i++) {
        if (ripples[i].touchGenerated) return;
      }
    }

    //Start the next unstarted ripple
    for (let i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (!ripple.started) {
        ripple.started = true;
        ripple.touchGenerated = isRippleTouchGenerated;
        ripple.style = style;
        break;
      }
    }

    //Add an unstarted ripple at the end
    ripples.push({
      key: nextKey,
      started: false,
      ending: false,
    });

    //Re-render
    this.setState({
      ripples: ripples,
    });
  },

  end() {
    let ripples = this.state.ripples;
    let ripple;
    let endingRipple;

    //End the the next un-ended ripple
    for (let i = 0; i < ripples.length; i++) {
      ripple = ripples[i];
      if (ripple.started && !ripple.ending) {
        ripple.ending = true;
        endingRipple = ripple;
        break;
      }
    }

    //Only update if a ripple was found
    if (endingRipple) {
      //Re-render
      this.setState({
        ripples: ripples,
      });

      //Wait 2 seconds and remove the ripple from DOM
      setTimeout(() => {
        ripples.shift();
        if (this.isMounted()) {
          this.setState({
            ripples: ripples,
          });
        }
      }, 2000);
    }
  },

  _handleMouseDown(e) {
    //only listen to left clicks
    if (e.button === 0) this.start(e, false);
  },

  _handleMouseUp() {
    this.end();
  },

  _handleMouseLeave() {
    this.end();
  },

  _handleTouchStart(e) {
    this.start(e, true);
  },

  _handleTouchEnd() {
    this.end();
  },

  _getRippleStyle(e) {
    let style = {};
    let el = React.findDOMNode(this);
    let elHeight = el.offsetHeight;
    let elWidth = el.offsetWidth;
    let offset = Dom.offset(el);
    let isTouchEvent = e.touches && e.touches.length;
    let pageX = isTouchEvent ? e.touches[0].pageX : e.pageX;
    let pageY = isTouchEvent ? e.touches[0].pageY : e.pageY;
    let pointerX = pageX - offset.left;
    let pointerY = pageY - offset.top;
    let topLeftDiag = this._calcDiag(pointerX, pointerY);
    let topRightDiag = this._calcDiag(elWidth - pointerX, pointerY);
    let botRightDiag = this._calcDiag(elWidth - pointerX, elHeight - pointerY);
    let botLeftDiag = this._calcDiag(pointerX, elHeight - pointerY);
    let rippleRadius = Math.max(
      topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
    );
    let rippleSize = rippleRadius * 2;
    let left = pointerX - rippleRadius;
    let top = pointerY - rippleRadius;

    style.height = rippleSize + 'px';
    style.width = rippleSize + 'px';
    style.top = top + 'px';
    style.left = left + 'px';

    return style;
  },

  _calcDiag(a, b) {
    return Math.sqrt((a * a) + (b * b));
  },

  _getRippleElements() {
    return this.state.ripples.map((ripple) => {
      return (
        <RippleCircle
          key={ripple.key}
          started={ripple.started}
          ending={ripple.ending}
          style={ripple.style}
          color={this.props.color}
          opacity={this.props.opacity} />
      );
    });
  },

});

module.exports = TouchRipple;
