let React = require('react');
let Transitions = require('./styles/transitions');
let StylePropable = require('./mixins/style-propable');


let InkBar = React.createClass({

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    color: React.PropTypes.string,
    left: React.PropTypes.string.isRequired,
    width: React.PropTypes.string.isRequired,
  },

  mixins: [StylePropable],

  render() {
    let {
      color,
      left,
      width,
      style,
      ...other,
    } = this.props;

    let colorStyle = color ? {backgroundColor: color} : undefined;
    let styles = this.mergeAndPrefix({
      left: left,
      width: width,
      bottom: 0,
      display: 'block',
      backgroundColor: this.context.muiTheme.component.inkBar.backgroundColor,
      height: 2,
      marginTop: -2,
      position: 'relative',
      transition: Transitions.easeOut('1s', 'left'),
    }, this.props.style, colorStyle);

    return (
      <div style={styles}>
        &nbsp;
      </div>
    );
  },

});

module.exports = InkBar;
