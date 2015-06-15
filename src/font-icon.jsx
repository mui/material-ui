var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Spacing = require('./styles/spacing');
var Transitions = require('./styles/transitions');

var FontIcon = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      hovered: false
    };
  },

  render: function() {
    var {
      color,
      hoverColor,
      onMouseOut,
      onMouseOver,
      style,
      ...other
    } = this.props;

    var offColor = color ? color: this.context.muiTheme.palette.textColor;
    var onColor = hoverColor ? hoverColor : offColor;

    var mergedStyles = this.mergeAndPrefix({
      position: 'relative',
      fontSize: Spacing.iconSize,
      display: 'inline-block',
      userSelect: 'none',
      transition: Transitions.easeOut(),
      color: this.state.hovered ? onColor : offColor
    }, style);

    return (
      <span
        {...other}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        style={mergedStyles} />
    );
  },

  _handleMouseOut: function(e) {
    this.setState({hovered: false});
    if (this.props.onMouseOut) {
      this.props.onMouseOut(e);
    }
  },

  _handleMouseOver: function(e) {
    this.setState({hovered: true});
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }
  }
});

module.exports = FontIcon;
