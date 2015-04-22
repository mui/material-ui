var React = require('react');
var StylePropable = require('../mixins/style-propable');

var ToolbarTitle = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    text: React.PropTypes.string,
  },

  getTheme: function() {
    return this.context.theme.component.toolbar;
  },

  render: function() {

    var styles = this.mergeAndPrefix({
      paddingRight: this.context.theme.spacing.desktopGutterLess,
      lineHeight: this.getTheme().height + 'px',
      fontSize: this.getTheme().titleFontSize + 'px',
      display: 'inline-block',
      position: 'relative',
    });

    return (
      <span className={this.props.className} style={styles}>{this.props.text}</span>
    );
  }

});

module.exports = ToolbarTitle;
