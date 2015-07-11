let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let AutoPrefix = require('../styles/auto-prefix');
let Transitions = require('../styles/transitions');


let SlideInChild = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    //This callback is needed bacause the direction could change
    //when leaving the dom
    getLeaveDirection: React.PropTypes.func.isRequired,
  },

  componentWillEnter(callback) {
    let style = React.findDOMNode(this).style;
    let x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    let y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';

    style.opacity = '0';
    AutoPrefix.set(style, 'transform', 'translate3d(' + x + ',' + y + ',0)');

    setTimeout(callback, 0);
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

    setTimeout(callback, 450);
  },

  render() {
    let {
      styles,
      ...other,
    } = this.props;

    styles = this.mergeAndPrefix({
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      transition: Transitions.easeOut(),
    }, this.props.style);

    return (
      <div {...other}
        style={styles}>
        {this.props.children}
      </div>
    );
  },

});

module.exports = SlideInChild;
