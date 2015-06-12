var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Typography = require('../styles/typography');
var IconButton = require('../icon-button');
var NavigationMenu = require('../svg-icons/navigation-menu');
var Paper = require('../paper');

var AppBar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    zDepth: React.PropTypes.number,
  },

  getDefaultProps: function() {
    return {
      zDepth: 1
    }
  },

  getStyles: function() {
    var spacing = this.context.muiTheme.spacing;
    var themeVariables = this.context.muiTheme.component.appBar;
    var styles = {
      zIndex: 5,
      width: '100%',
      minHeight: themeVariables.height,
      backgroundColor: themeVariables.color,
      paddingLeft: spacing.desktopGutter,
      paddingRight: spacing.desktopGutter
    };
    return styles;
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <Paper
        rounded={false}
        className={this.props.className}
        style={this.mergeAndPrefix(this.getStyles(), this.props.style)}
        zDepth={this.props.zDepth}>
          {this.props.children}
      </Paper>
    );
  }
  
});

module.exports = AppBar;
