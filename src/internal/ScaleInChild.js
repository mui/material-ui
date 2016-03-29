import React from 'react';
import ReactDOM from 'react-dom';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';

const ScaleInChild = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    enterDelay: React.PropTypes.number,
    maxScale: React.PropTypes.number,
    minScale: React.PropTypes.number,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object.isRequired,
  },

  getDefaultProps: function() {
    return {
      enterDelay: 0,
      maxScale: 1,
      minScale: 0,
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

    style.opacity = '0';
    autoPrefix.set(style, 'transform', `scale(${this.props.minScale})`);

    this.leaveTimer = setTimeout(callback, 450);
  },

  _animate() {
    const style = ReactDOM.findDOMNode(this).style;

    style.opacity = '1';
    autoPrefix.set(style, 'transform', `scale(${this.props.maxScale})`);
  },

  _initializeAnimation(callback) {
    const style = ReactDOM.findDOMNode(this).style;

    style.opacity = '0';
    autoPrefix.set(style, 'transform', 'scale(0)');

    this.enterTimer = setTimeout(callback, this.props.enterDelay);
  },

  render() {
    const {
      children,
      enterDelay, // eslint-disable-line no-unused-vars
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    const mergedRootStyles = Object.assign({}, {
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      transition: transitions.easeOut(null, ['transform', 'opacity']),
    }, style);

    return (
      <div {...other} style={prepareStyles(mergedRootStyles)}>
        {children}
      </div>
    );
  },
});

export default ScaleInChild;
