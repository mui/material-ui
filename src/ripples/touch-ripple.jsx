const React = require('react');
const ReactDOM = require('react-dom');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const ReactTransitionGroup = require('react-addons-transition-group');
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
    style: React.PropTypes.object,
  },

  getInitialState() {
    return {
      //This prop allows us to only render the ReactTransitionGroup
      //on the first click of the component, making the inital
      //render faster
      hasRipples: false,
      nextKey: 0,
      ripples: [],
    };
  },

  render() {

    const {
      children,
      style,
    } = this.props;

    const {
      hasRipples,
      ripples,
    } = this.state;

    let rippleGroup;
    if (hasRipples) {
      const mergedStyles = this.mergeAndPrefix({
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
      }, style);

      rippleGroup = (
        <ReactTransitionGroup style={mergedStyles}>
          {ripples}
        </ReactTransitionGroup>
      );
    }

    return (
      <div
        onMouseUp={this._handleMouseUp}
        onMouseDown={this._handleMouseDown}
        onMouseLeave={this._handleMouseLeave}
        onTouchStart={this._handleTouchStart}
        onTouchEnd={this._handleTouchEnd}>
        {rippleGroup}
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
        if (ripples[i].props.touchGenerated) return;
      }
    }

    //Add a ripple to the ripples array
    ripples = ImmutabilityHelper.push(ripples, (
      <CircleRipple
        key={this.state.nextKey}
        style={!this.props.centerRipple ? this._getRippleStyle(e) : {}}
        color={this.props.color}
        opacity={this.props.opacity}
        touchGenerated={isRippleTouchGenerated} />
    ));

    this.setState({
      hasRipples: true,
      nextKey: this.state.nextKey + 1,
      ripples: ripples,
    });
  },

  end() {
    const currentRipples = this.state.ripples;
    this.setState({
      ripples: ImmutabilityHelper.shift(currentRipples),
    });
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
    const el = ReactDOM.findDOMNode(this);
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

});

module.exports = TouchRipple;
