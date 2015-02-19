var React = require('react');
var Transitions = require('./styles/mixins/transitions.js');
var StylePropable = require('./mixins/style-propable.js');
var Colors = require('./styles/colors.js')


var InkBar = React.createClass({
  
  propTypes: {
    position: React.PropTypes.string
  },
  
  mixins: [StylePropable],

  render: function() {

    var styles = this.mergeStyles({
      left: this.props.left,
      width: this.props.width,
      bottom: '0',
      display: 'block',
      backgroundColor: Colors.yellowA200,
      height: '2px',
      marginTop: '-2px',
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