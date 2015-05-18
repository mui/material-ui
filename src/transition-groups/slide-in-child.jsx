var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var StylePropable = require('../mixins/style-propable');
var AutoPrefix = require('../styles/auto-prefix');
var Transitions = require('../styles/transitions');

var SlideInChild = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    //This callback is needed bacause the direction could change
    //when leaving the dom
    getLeaveDirection: React.PropTypes.func.isRequired
  },

  componentWillEnter: function(callback) {
    var style = React.findDOMNode(this).style;
    var x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    var y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(callback, 0);
  },

  componentDidEnter: function() {
    var style = React.findDOMNode(this).style;
    style.opacity = '1';
    AutoPrefix.set(style, 'transform', 'translate3d(0,0,0)');
  },

  componentWillLeave: function(callback) {
    var style = React.findDOMNode(this).style;
    var direction = this.props.getLeaveDirection();
    var x = direction === 'left' ? '-100%' :
      direction === 'right' ? '100%' : '0';
    var y = direction === 'up' ? '-100%' :
      direction === 'down' ? '100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(callback, 450);
  },

  render: function() {
    var {
      styles,
      ...other
    } = this.props;

    styles = this.mergeAndPrefix({
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: '0px',
      left: '0px',
      transition: Transitions.easeOut()
    }, this.props.style);

    return (
      <div {...other}
        style={styles}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = SlideInChild;
