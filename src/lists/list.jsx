var React = require('react/addons');
var StylePropable = require('../mixins/style-propable');
var Typography = require('../styles/typography');

var List = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    bottomDividerStyle: React.PropTypes.object,
    insetBottomDivider: React.PropTypes.bool,
    insetSubheader: React.PropTypes.bool,
    showBottomDivider: React.PropTypes.bool,
    subheader: React.PropTypes.string,
    subheaderStyle: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
    };
  },

  render: function() {

    var {
      bottomDividerStyle,
      insetBottomDivider,
      insetSubheader,
      showBottomDivider,
      style,
      subheader,
      subheaderStyle,
      ...other
    } = this.props;

    var styles = {
      root: {
        padding: 0,
        paddingBottom: showBottomDivider ? 0 : 8,
        paddingTop: subheader ? 0 : 8
      },

      subheader: {
        color: Typography.textLightBlack,
        fontSize: 14,
        fontWeight: Typography.fontWeightMedium,
        lineHeight: '48px',
        paddingLeft: insetSubheader ? 72 : 16
      },

      bottomDivider: {
        margin: 0,
        marginTop: 7,
        marginLeft: insetBottomDivider ? 72 : 0,
        height: 1,
        border: 'none',
        backgroundColor: this.context.muiTheme.palette.borderColor
      }
    };

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    var mergedSubheaderStyles = this.mergeAndPrefix(styles.subheader, subheaderStyle);
    var mergedBottomDividerStyles = this.mergeAndPrefix(styles.bottomDivider, bottomDividerStyle);

    var subheaderElement = subheader ? (
      <div style={mergedSubheaderStyles}>{subheader}</div>
    ) : null;
    var bottomDividerElement = showBottomDivider ? (
      <hr style={mergedBottomDividerStyles} />
    ) : null;

    return (
      <div
        {...other}
        style={mergedRootStyles}>
        {subheaderElement}
        {this.props.children}
        {bottomDividerElement}
      </div>
    );
  }
});

module.exports = List;