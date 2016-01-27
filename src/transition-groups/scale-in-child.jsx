import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import StylePropable from '../mixins/style-propable';
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

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
    StylePropable,
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

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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

    style.opacity = '0';
    autoPrefix.set(style, 'transform', 'scale(' + this.props.minScale + ')', this.state.muiTheme);

    setTimeout(() => {
      if (this.isMounted()) callback();
    }, 450);
  },

  _animate() {
    let style = ReactDOM.findDOMNode(this).style;

    style.opacity = '1';
    autoPrefix.set(style, 'transform', 'scale(' + this.props.maxScale + ')', this.state.muiTheme);
  },

  _initializeAnimation(callback) {
    let style = ReactDOM.findDOMNode(this).style;

    style.opacity = '0';
    autoPrefix.set(style, 'transform', 'scale(0)', this.state.muiTheme);

    setTimeout(() => {
      if (this.isMounted()) callback();
    }, this.props.enterDelay);
  },

  render() {
    const {
      children,
      enterDelay,
      style,
      ...other,
    } = this.props;

    const mergedRootStyles = this.mergeStyles({
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      transition: Transitions.easeOut(null, ['transform', 'opacity']),
    }, style);

    return (
      <div {...other} style={this.prepareStyles(mergedRootStyles)}>
        {children}
      </div>
    );
  },
});

export default ScaleInChild;
