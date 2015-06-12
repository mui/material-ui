var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Typography = require('../styles/typography');

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

  getSpacing: function() {
    return this.context.muiTheme.spacing;
  },

  getTheme: function () {
    return this.context.muiTheme.component.appBar;
  },

  getStyles: function() {
    var styles = {
      zIndex: 5,
      width: '100%',
      minHeight: this.getTheme().height,
      backgroundColor: this.getTheme().color,
      padding: this.props.noGutter ? 0 : '0px ' + this.context.muiTheme.spacing.desktopGutter + 'px'
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
