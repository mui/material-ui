let React = require('react/addons');
let StylePropable = require('../mixins/style-propable');
let Typography = require('../styles/typography');

let List = React.createClass({

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

    let {
      insetSubheader,
      style,
      subheader,
      subheaderStyle,
      ...other
    } = this.props;

    let styles = {
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

    let mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    let mergedSubheaderStyles = this.mergeAndPrefix(styles.subheader, subheaderStyle);

    let subheaderElement = subheader ? (
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
