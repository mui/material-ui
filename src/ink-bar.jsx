let React = require('react');
let Transitions = require('./styles/transitions');
let StylePropable = require('./mixins/style-propable');
let Colors = require('./styles/colors');

let InkBar = React.createClass({

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    left: React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired,
  },

  mixins: [StylePropable],

  render() {
    let styles = this.mergeAndPrefix({
      left: this.props.left,
      width: this.props.width,
      bottom: 0,
      display: 'block',
      backgroundColor: Colors.yellow200,
      height: 2,
      marginTop: -2,
      position: 'relative',
      transition: Transitions.easeOut('1s', 'left'),
    });

    return (
      <div style={styles}>
        &nbsp;
      </div>
    );
  },

});

module.exports = InkBar;
