let React = require('react');
let Transitions = require('./styles/transitions');
let StylePropable = require('./mixins/style-propable');


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
    let palette = this.context.muiTheme.palette;

    let styles = this.mergeAndPrefix({
      left: this.props.left,
      width: this.props.width,
      bottom: 0,
      display: 'block',
      backgroundColor: palette.accent1Color,
      height: 2,
      marginTop: -2,
      position: 'relative',
      transition: Transitions.easeOut('1s', 'left'),
    }, this.props.style);

    return (
      <div style={styles}>
        &nbsp;
      </div>
    );
  },

});

module.exports = InkBar;
