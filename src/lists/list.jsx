var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');
var Typography = require('../styles/typography');

var List = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    insetSubheader: React.PropTypes.bool,
    subheader: React.PropTypes.string,
    subheaderStyle: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {

    var {
      insetSubheader,
      style,
      subheader,
      subheaderStyle,
      ...other
    } = this.props;

    var styles = {
      root: {
        padding: 0,
        paddingBottom: 8,
        paddingTop: subheader ? 0 : 8
      },

      subheader: {
        color: Typography.textLightBlack,
        fontSize: 14,
        fontWeight: Typography.fontWeightMedium,
        lineHeight: '48px',
        paddingLeft: insetSubheader ? 72 : 16
      }
    };

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    var mergedSubheaderStyles = this.mergeAndPrefix(styles.subheader, subheaderStyle);

    var subheaderElement = subheader ? (
      <div style={mergedSubheaderStyles}>{subheader}</div>
    ) : null;

    return (
      <div
        {...other}
        style={mergedRootStyles}>
        {subheaderElement}
        {this.props.children}
      </div>
    );
  }
});

module.exports = List;