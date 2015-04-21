var React = require('react');
var StylePropable = require('../mixins/style-propable');

var ToolbarSeparator = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  getTheme: function() {
    return this.context.theme.component.toolbar;
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  render: function() {

    var styles = this.m({
      backgroundColor: this.getTheme().separatorColor,
      display: 'inline-block',
      height: this.getSpacing().desktopGutterMore,
      marginLeft: this.getSpacing().desktopGutter,
      position: 'relative',
      top: ((this.getTheme().height - this.getSpacing().desktopGutterMore) / 2),
      width: 1,
    }, this.props.style);

    return (
      <span className={this.props.className} style={styles}/>
    );
  }

});

module.exports = ToolbarSeparator;
