var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var Colors = require('./styles/colors');

var Overlay = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    show: React.PropTypes.bool,
    autoLockScrolling: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      autoLockScrolling: true
    };
  },
  
  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.autoLockScrolling) (this.props.show) ? this._preventScrolling() : this._allowScrolling();
  },

  render: function() {

    var {
      show,
      style,
      ...other
    } = this.props;

    var styles = {
      position: 'fixed',
      height: '100%',
      width: '100%',
      zIndex: 9,
      top: 0,
      left: '-100%',
      backgroundColor: Colors.transparent,
      transition:
        Transitions.easeOut('0ms', 'left', '400ms') + ',' +
        Transitions.easeOut('400ms', 'backgroundColor')
    };

    if (this.props.show) {
      styles = this.mergeStyles(styles, {
        left: 0,
        backgroundColor: Colors.lightBlack,
        transition:
          Transitions.easeOut('0ms', 'left') + ',' +
          Transitions.easeOut('400ms', 'backgroundColor')
      });
    }

    styles = this.mergeAndPrefix(styles);

    return (
      <div {...other} style={styles} />
    );
  },
  
  preventScrolling: function() {
    if (!this.props.autoLockScrolling) this._preventScrolling();
  },
  
  allowScrolling: function() {
    if (!this.props.autoLockScrolling) this._allowScrolling();
  },
  
  _preventScrolling: function() {
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
  },
  
  _allowScrolling: function() {
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = '';
  }

});

module.exports = Overlay;