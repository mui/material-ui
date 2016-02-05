import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ReactTransitionGroup from 'react-addons-transition-group';
import StylePropable from '../mixins/style-propable';
import Dom from '../utils/dom';
import CircleRipple from './circle-ripple';
import update from 'react-addons-update';

function push(array, obj) {
  const newObj = Array.isArray(obj) ? obj : [obj];
  return update(array, {$push: newObj});
}

function shift(array) {
  return update(array, {$splice: [[0, 1]]});
}

const TouchRipple = React.createClass({

  propTypes: {
    centerRipple: React.PropTypes.bool,
    children: React.PropTypes.node,
    color: React.PropTypes.string,

    /**
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
    StylePropable,
  ],

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

  start(e, isRippleTouchGenerated) {
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
        style={!this.props.centerRipple ? this._getRippleStyle(e) : {}}
        color={this.props.color}
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
      const mergedStyles = this.mergeStyles({
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
      }, style);

      rippleGroup = (
        <ReactTransitionGroup style={this.prepareStyles(mergedStyles)}>
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
        onTouchEnd={this._handleTouchEnd}
      >
        {rippleGroup}
        {children}
      </div>
    );
  },

});

export default TouchRipple;
