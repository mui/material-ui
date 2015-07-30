const React = require('react');
const PureRenderMixin = React.addons.PureRenderMixin;
const StylePropable = require('../mixins/style-propable');
const Dom = require('../utils/dom');
const ImmutabilityHelper = require('../utils/immutability-helper');
const CircleRipple = require('./circle-ripple');


const TouchRipple = React.createClass({

  mixins: [PureRenderMixin, StylePropable],

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

    const {
      children,
      style,
    } = this.props;

    const mergedStyles = this.mergeAndPrefix({
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      overflow: 'hidden',
    }, style);

    return (
      <div
        onMouseUp={this._handleMouseUp}
        onMouseDown={this._handleMouseDown}
        onMouseLeave={this._handleMouseLeave}
        onTouchStart={this._handleTouchStart}
        onTouchEnd={this._handleTouchEnd}>
        <div style={mergedStyles}>
          {this._getRippleElements()}
        </div>
        {children}
      </div>
    );
  },

  start(e, isRippleTouchGenerated) {
    let ripples = this.state.ripples;

    //Do nothing if we're starting a click-event-generated ripple
    //while having touch-generated ripples
    if (!isRippleTouchGenerated) {
      for (let i = 0; i < ripples.length; i++) {
        if (ripples[i].touchGenerated) return;
      }
    }

    //Start the next unstarted ripple
    for (let i = 0; i < ripples.length; i++) {
      const ripple = ripples[i];

      if (!ripple.started) {
        ripples = ImmutabilityHelper.mergeItem(ripples, i, {
          started: true,
          touchGenerated: isRippleTouchGenerated,
          style: !this.props.centerRipple ? this._getRippleStyle(e) : {},
        });
        break;
      }
    }

    //Add an unstarted ripple at the end
    ripples = ImmutabilityHelper.push(ripples, {
      key: ripples[ripples.length-1].key + 1,
      started: false,
      ending: false,
    });

    //Re-render
    this.setState({
      ripples: ripples,
    });
  },

  end() {

    //End the the next un-ended ripple
    let ripples = this.state.ripples;
    for (let i = 0; i < ripples.length; i++) {
      const ripple = ripples[i];

      if (ripple.started && !ripple.ending) {
        const newRipples = ImmutabilityHelper.mergeItem(ripples, i, {
          ending: true,
        });

        this.setState({
          ripples: newRipples,
        });

        //Wait 2 seconds and remove the ripple from DOM
        setTimeout(this._removeRipple, 2000);

        break;
      }
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
    const el = React.findDOMNode(this);
    const elHeight = el.offsetHeight;
    const elWidth = el.offsetWidth;
    const offset = Dom.offset(el);
    const isTouchEvent = e.touches && e.touches.length;
    const pageX = isTouchEvent ? e.touches[0].pageX : e.pageX;
    const pageY = isTouchEvent ? e.touches[0].pageY : e.pageY;
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
        <CircleRipple
          key={ripple.key}
          started={ripple.started}
          ending={ripple.ending}
          style={ripple.style}
          color={this.props.color}
          opacity={this.props.opacity} />
      );
    });
  },

  _removeRipple() {
    if (this.isMounted()) {
      const currentRipples = this.state.ripples;
      this.setState({
        ripples: ImmutabilityHelper.shift(currentRipples),
      });
    }
  },

});

module.exports = TouchRipple;
