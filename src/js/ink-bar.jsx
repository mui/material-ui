var React = require('react');
var Transitions = require('./styles/mixins/transitions.js');

var InkBar = React.createClass({
  
  propTypes: {
    position: React.PropTypes.string
  },

  render: function() {

    var styles = {
      'left': this.props.left,
      'width': this.props.width,
      'bottom': '0',
      'display': 'block',
      'backgroundColor': this.props.inkBarColor || 'yellow',
      'height': '2px',
      'marginTop': '-2px',
      'position': 'relative',
      'transition': Transitions.easeOut('1s', 'left')
    };

    return (
      <div style={styles}>
        &nbsp;
      </div>
    );
  }

});

module.exports = InkBar;