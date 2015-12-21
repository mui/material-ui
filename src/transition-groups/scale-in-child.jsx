import React from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import StylePropable from '../mixins/style-propable';
import AutoPrefix from '../styles/auto-prefix';
import Transitions from '../styles/transitions';
import muiThemeable from '../muiThemeable';

let ScaleInChild = React.createClass({

  mixins: [PureRenderMixin, StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    children: React.PropTypes.node,
    enterDelay: React.PropTypes.number,
    maxScale: React.PropTypes.number,
    minScale: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      enterDelay: 0,
      maxScale: 1,
      minScale: 0,
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

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'scale(' + this.props.minScale + ')');

    setTimeout(() => {
      if (this.isMounted()) callback();
    }, 450);
  },

  render() {
    const {
      children,
      enterDelay,
      style,
      ...other,
    } = this.props;

    const mergedRootStyles = this.prepareStyles({
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      transition: Transitions.easeOut(null, ['transform', 'opacity']),
    }, style);

    return (
      <div {...other} style={mergedRootStyles}>
        {children}
      </div>
    );
  },

  _animate() {
    let style = ReactDOM.findDOMNode(this).style;

    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'scale(' + this.props.maxScale + ')');
  },

  _initializeAnimation(callback) {
    let style = ReactDOM.findDOMNode(this).style;

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'scale(0)');

    setTimeout(() => {
      if (this.isMounted()) callback();
    }, this.props.enterDelay);
  },

});

ScaleInChild = muiThemeable(ScaleInChild);

export default ScaleInChild;
