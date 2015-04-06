var React = require('react');
var StylePropable = require('../mixins/style-propable');
var CustomVariables = require('../styles/variables/custom-variables');

var ToolbarSeparator = React.createClass({

  mixins: [StylePropable],

  render: function() {

    var styles = this.mergeAndPrefix({
      backgroundColor: CustomVariables.toolbarSeparatorColor,
      display: 'inline-block',
      height: CustomVariables.spacing.desktopGutterMore,
      marginLeft: CustomVariables.spacing.desktopGutter,
      position: 'relative',
      top: ((CustomVariables.toolbarHeight - CustomVariables.spacing.desktopGutterMore) / 2),
      width: 1,
    });

    return (
      <span className={this.props.className} style={styles}/>
    );
  }

});

module.exports = ToolbarSeparator;
