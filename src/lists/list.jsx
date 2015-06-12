var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');

var List = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    insetBottomDivider: React.PropTypes.bool,
    padTop: React.PropTypes.bool,
    showBottomDivider: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {

    var {
      insetBottomDivider,
      padTop,
      showBottomDivider,
      style,
      ...other
    } = this.props;

    var mergedStyles = this.mergeAndPrefix({
      padding: 0,
      paddingBottom: showBottomDivider ? 7 : 8,
      paddingTop: padTop ? 8 : 0,
      borderBottom: showBottomDivider ?
        'solid 1px ' + this.context.muiTheme.palette.borderColor : null
    }, style);

    return (
      <div
        {...other}
        style={mergedStyles}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = List;