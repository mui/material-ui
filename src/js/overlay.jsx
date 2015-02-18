var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var Colors = require('./styles/colors');

var Overlay = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    show: React.PropTypes.bool
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
  }

});

module.exports = Overlay;