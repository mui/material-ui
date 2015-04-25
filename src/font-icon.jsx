var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Spacing = require('./styles/spacing');

var FontIcon = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      isHovered: false,
    };
  },

  getTheme: function() {
    return this.context.theme.palette;
  },

  getStyles: function() {
    var styles = {
      position: 'relative',
      fontSize: Spacing.iconSize + 'px',
      display: 'inline-block',
      userSelect: 'none'  
    };
    if (!styles.color && !this.props.className) {
      styles.color = this.getTheme().textColor;
    }
    return styles;
  },

  render: function() {
    var {
      style,
      ...other
    } = this.props;

    return (
      <span {...other} 
        style={this.mergeAndPrefix(
          this.getStyles(),
          this.props.style)} />
    );
  }
});

module.exports = FontIcon;
