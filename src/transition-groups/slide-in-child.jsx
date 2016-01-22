import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from '../mixins/style-propable';
import autoPrefix from '../styles/auto-prefix';
import Transitions from '../styles/transitions';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';


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

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps: function() {
    return {
      enterDelay: 0,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
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

  componentWillEnter(callback) {
    let style = ReactDOM.findDOMNode(this).style;
    let x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    let y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';

    style.opacity = '0';
    autoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)', this.state.muiTheme);

    setTimeout(() => {
      if (this.isMounted()) callback();
    }, this.props.enterDelay);
  },

  componentDidEnter() {
    let style = ReactDOM.findDOMNode(this).style;
    style.opacity = '1';
    autoPrefix.set(style, 'transform', 'translate3d(0,0,0)', this.state.muiTheme);
  },

  componentWillLeave(callback) {
    let style = ReactDOM.findDOMNode(this).style;
    let direction = this.props.getLeaveDirection();
    let x = direction === 'left' ? '-100%' :
      direction === 'right' ? '100%' : '0';
    let y = direction === 'up' ? '-100%' :
      direction === 'down' ? '100%' : '0';

    style.opacity = '0';
    autoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)', this.state.muiTheme);

    setTimeout(() => {
      if (this.isMounted()) callback();
    }, 450);
  },

  render() {
    let {
      children,
      enterDelay,
      getLeaveDirection,
      style,
      ...other,
    } = this.props;

    let mergedRootStyles = this.mergeStyles({
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

export default SlideInChild;
