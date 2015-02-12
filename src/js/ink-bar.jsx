var React = require('react');
var Transitions = require('./styles/mixins/transitions.js');
var StylePropable = require('./mixins/style-propable.js');


var InkBar = React.createClass({
  
  propTypes: {
    position: React.PropTypes.string
  },
  
  mixins: [StylePropable],

  render: function() {

    var styles = this.mergePropStyles({
      left: this.props.left,
      width: this.props.width,
      bottom: '0',
      display: 'block',
      'background-color': 'yellow',
      height: '2px',
      'margin-top': '-2px',
      position: 'relative',
      transition: Transitions.easeOut('1s', 'left')
    });

    return (
      <div style={styles}>
        &nbsp;
      </div>
    );
  }

});

module.exports = InkBar;