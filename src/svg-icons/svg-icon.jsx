var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');

var SvgIcon = React.createClass({

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
      root: {
        display: 'inline-block',
        height: '24px',
        width: '24px',
        userSelect: 'none',
        fill: this.getTheme().textColor
      },
      rootWhenHovered: {

      }
    };
    return styles;
  },

  render: function() {

    var {
      viewBox,
      style,
      ...other
    } = this.props;

    return (
      <svg
        {...other}
        viewBox="0 0 24 24"
        style={this.mergeAndPrefix(
          this.getStyles().root, 
          this.props.style)}>
            {this.props.children}
      </svg>
    );
  }
});

module.exports = SvgIcon;
