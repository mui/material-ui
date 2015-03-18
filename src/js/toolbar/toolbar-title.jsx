var React = require('react');
var StylePropable = require('../mixins/style-propable');
var CustomVariables = require('../styles/variables/custom-variables');

var ToolbarTitle = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    text: React.PropTypes.string,
  },

  render: function() {

    var styles = this.mergeAndPrefix({
      paddingRight: CustomVariables.spacing.desktopGutterLess,
      lineHeight: CustomVariables.toolbarHeight + 'px',
      fontSize: CustomVariables.toolbarTitleFontSize + 'px',
      display: 'inline-block',
      position: 'relative',
    });

    return (
      <span className={this.props.className} style={styles}>{this.props.text}</span>
    );
  }

});

module.exports = ToolbarTitle;
