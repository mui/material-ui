import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import autoPrefix from '../styles/auto-prefix';
import Transitions from '../styles/transitions';

const CircleRipple = React.createClass({

  propTypes: {
    aborted: React.PropTypes.bool,
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
      opacity: 0.1,
      aborted: false,
    };
  },

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  },

  componentWillAppear(callback) {
    this._initializeAnimation(callback);
  },

  componentWillEnter(callback) {
    this._initializeAnimation(callback);
  },

  componentDidAppear() {
    this._animate();
  },

  componentDidEnter() {
    this._animate();
  },

  componentWillLeave(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = 0;
    //If the animation is aborted, remove from the DOM immediately
    const removeAfter = this.props.aborted ? 0 : 2000;
    this.enterTimer = setTimeout(callback, removeAfter);
  },

  _animate() {
    const style = ReactDOM.findDOMNode(this).style;
    const transitionValue = `${Transitions.easeOut('2s', 'opacity')}, ${
      Transitions.easeOut('1s', 'transform')}`;
    autoPrefix.set(style, 'transition', transitionValue, this.props.muiTheme);
    autoPrefix.set(style, 'transform', 'scale(1)', this.props.muiTheme);
  },

  _initializeAnimation(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = this.props.opacity;
    autoPrefix.set(style, 'transform', 'scale(0)', this.props.muiTheme);
    this.leaveTimer = setTimeout(callback, 0);
  },

  render() {
    const {
      color,
      muiTheme: {
        prepareStyles,
      },
      opacity,
      style,
      ...other,
    } = this.props;

    const mergedStyles = Object.assign({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      backgroundColor: color,
    }, style);

    return (
      <div {...other} style={prepareStyles(mergedStyles)} />
    );
  },
});

export default CircleRipple;
