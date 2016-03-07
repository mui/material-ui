import React from 'react';
import ReactDOM from 'react-dom';
import autoPrefix from '../styles/auto-prefix';
import Transitions from '../styles/transitions';
import getMuiTheme from '../styles/getMuiTheme';

const SlideInChild = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    direction: React.PropTypes.string,
    enterDelay: React.PropTypes.number,
    //This callback is needed bacause
    //the direction could change when leaving the dom
    getLeaveDirection: React.PropTypes.func.isRequired,

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

  getDefaultProps: function() {
    return {
      enterDelay: 0,
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

  componentWillEnter(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    const x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    const y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';

    style.opacity = '0';
    autoPrefix.set(style, 'transform', `translate3d(${x}, ${y}, 0)`, this.state.muiTheme);

    this.enterTimer = setTimeout(callback, this.props.enterDelay);
  },

  componentDidEnter() {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = '1';
    autoPrefix.set(style, 'transform', 'translate3d(0,0,0)', this.state.muiTheme);
  },

  componentWillLeave(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    const direction = this.props.getLeaveDirection();
    const x = direction === 'left' ? '-100%' :
      direction === 'right' ? '100%' : '0';
    const y = direction === 'up' ? '-100%' :
      direction === 'down' ? '100%' : '0';

    style.opacity = '0';
    autoPrefix.set(style, 'transform', `translate3d(${x}, ${y}, 0)`, this.state.muiTheme);

    this.leaveTimer = setTimeout(callback, 450);
  },

  render() {
    const {
      children,
      enterDelay,
      getLeaveDirection,
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

export default SlideInChild;
