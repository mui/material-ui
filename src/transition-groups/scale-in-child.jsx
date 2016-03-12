import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import autoPrefix from '../styles/auto-prefix';
import Transitions from '../styles/transitions';
import getMuiTheme from '../styles/getMuiTheme';

const ScaleInChild = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    enterDelay: React.PropTypes.number,
    maxScale: React.PropTypes.number,
    minScale: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
  ],

  getDefaultProps: function() {
    return {
      enterDelay: 0,
      maxScale: 1,
      minScale: 0,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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

    style.opacity = '0';
    autoPrefix.set(style, 'transform', `scale(${this.props.minScale})`, this.state.muiTheme);

    this.leaveTimer = setTimeout(callback, 450);
  },

  _animate() {
    const style = ReactDOM.findDOMNode(this).style;

    style.opacity = '1';
    autoPrefix.set(style, 'transform', `scale(${this.props.maxScale})`, this.state.muiTheme);
  },

  _initializeAnimation(callback) {
    const style = ReactDOM.findDOMNode(this).style;

    style.opacity = '0';
    autoPrefix.set(style, 'transform', 'scale(0)', this.state.muiTheme);

    this.enterTimer = setTimeout(callback, this.props.enterDelay);
  },

  render() {
    const {
      children,
      enterDelay,
      style,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const mergedRootStyles = Object.assign({}, {
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      transition: Transitions.easeOut(null, ['transform', 'opacity']),
    }, style);

    return (
      <div {...other} style={prepareStyles(mergedRootStyles)}>
        {children}
      </div>
    );
  },
});

export default ScaleInChild;
