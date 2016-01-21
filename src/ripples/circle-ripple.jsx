import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import StylePropable from '../mixins/style-propable';
import autoPrefix from '../styles/auto-prefix';
import Transitions from '../styles/transitions';
import Colors from '../styles/colors';

const CircleRipple = React.createClass({

  propTypes: {
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

  getDefaultProps() {
    return {
      color: Colors.darkBlack,
      opacity: 0.16,
    };
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
    let style = ReactDOM.findDOMNode(this).style;
    style.opacity = 0;
    setTimeout(() => {
      if (this.isMounted()) callback();
    }, 2000);
  },

  _animate() {
    let style = ReactDOM.findDOMNode(this).style;
    const transitionValue = (
      Transitions.easeOut('2s', 'opacity') + ',' +
      Transitions.easeOut('1s', 'transform')
    );
    autoPrefix.set(style, 'transition', transitionValue, this.props.muiTheme);
    autoPrefix.set(style, 'transform', 'scale(1)', this.props.muiTheme);
  },

  _initializeAnimation(callback) {
    let style = ReactDOM.findDOMNode(this).style;
    style.opacity = this.props.opacity;
    autoPrefix.set(style, 'transform', 'scale(0)', this.props.muiTheme);
    setTimeout(() => {
      if (this.isMounted()) callback();
    }, 0);
  },

  render() {
    const {
      color,
      opacity,
      style,
      ...other,
    } = this.props;

    const mergedStyles = this.mergeStyles({
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      borderRadius: '50%',
      backgroundColor: color,
    }, style);

    return (
      <div {...other} style={this.prepareStyles(mergedStyles)} />
    );
  },
});

export default CircleRipple;
