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
    className: React.PropTypes.string,
    hoverColor: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      hovered: false,
    };
  },

  getStyles: function() {
    var theme = this.context.muiTheme.palette;
    var styles = {
      position: 'relative',
      fontSize: Spacing.iconSize + 'px',
      display: 'inline-block',
      userSelect: 'none',
      transition: Transitions.easeOut()
    };

    if (!styles.color && !this.props.className) {
      styles.color = theme.textColor;
    }

    return styles;
  },

  render: function() {
    var {
      onMouseOut,
      onMouseOver,
      style,
      ...other
    } = this.props;
    var hoverStyle = this.props.hoverColor ? {color: this.props.hoverColor} : {};

    return (
      <span
        {...other}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        style={this.mergeAndPrefix(
          this.getStyles(),
          this.props.style,
          this.state.hovered && hoverStyle)} />
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
