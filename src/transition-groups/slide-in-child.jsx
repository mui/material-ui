let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let AutoPrefix = require('../styles/auto-prefix');
let Transitions = require('../styles/transitions');


let SlideInChild = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    enterDelay: React.PropTypes.number,
    //This callback is needed bacause
    //the direction could change when leaving the dom
    getLeaveDirection: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function() {
    return {
      enterDelay: 0,
    };
  },

  componentWillEnter(callback) {
    let style = React.findDOMNode(this).style;
    let x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    let y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(() => {
      if (this.isMounted()) callback();
    }.bind(this), this.props.enterDelay);
  },

  componentDidEnter() {
    let style = React.findDOMNode(this).style;
    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'translate3d(0,0,0)');
  },

  componentWillLeave(callback) {
    let style = React.findDOMNode(this).style;
    let direction = this.props.getLeaveDirection();
    let x = direction === 'left' ? '-100%' :
      direction === 'right' ? '100%' : '0';
    let y = direction === 'up' ? '-100%' :
      direction === 'down' ? '100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(() => {
      if (this.isMounted()) callback();
    }.bind(this), 450);
  },

  render() {
    let {
      children,
      enterDelay,
      getLeaveDirection,
      style,
      ...other,
    } = this.props;

    let mergedRootStyles = this.mergeAndPrefix({
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

module.exports = SlideInChild;
