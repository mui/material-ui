import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from '../mixins/style-propable';
import AutoPrefix from '../styles/auto-prefix';
import Transitions from '../styles/transitions';
import muiThemeable from '../muiThemeable';

let SlideInChild = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

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

  getDefaultProps: function() {
    return {
      enterDelay: 0,
    };
  },

  componentWillEnter(callback) {
    let style = ReactDOM.findDOMNode(this).style;
    let x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    let y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(() => {
      if (this.isMounted()) callback();
    }, this.props.enterDelay);
  },

  componentDidEnter() {
    let style = ReactDOM.findDOMNode(this).style;
    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'translate3d(0,0,0)');
  },

  componentWillLeave(callback) {
    let style = ReactDOM.findDOMNode(this).style;
    let direction = this.props.getLeaveDirection();
    let x = direction === 'left' ? '-100%' :
      direction === 'right' ? '100%' : '0';
    let y = direction === 'up' ? '-100%' :
      direction === 'down' ? '100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

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

    let mergedRootStyles = this.prepareStyles({
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

});

SlideInChild = muiThemeable(SlideInChild);

export default SlideInChild;
