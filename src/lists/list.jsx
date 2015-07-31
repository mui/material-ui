const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
const PropTypes = require('../utils/prop-types');
const StylePropable = require('../mixins/style-propable');
const Typography = require('../styles/typography');
const Paper = require('../paper');


const List = React.createClass({

  mixins: [PureRenderMixin, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    insetSubheader: React.PropTypes.bool,
    subheader: React.PropTypes.string,
    subheaderStyle: React.PropTypes.object,
    zDepth: PropTypes.zDepth,
  },

  getDefaultProps() {
    return {
      zDepth: 0,
    };
  },

  render() {
    const {
      children,
      insetSubheader,
      style,
      subheader,
      subheaderStyle,
      zDepth,
      ...other,
    } = this.props;

    const styles = {
      root: {
        padding: 0,
        paddingBottom: 8,
        paddingTop: subheader ? 0 : 8,
      },

      subheader: {
        color: Typography.textLightBlack,
        fontSize: 14,
        fontWeight: Typography.fontWeightMedium,
        lineHeight: '48px',
        paddingLeft: insetSubheader ? 72 : 16,
      },
    };

    let subheaderElement;
    if (subheader) {
      const mergedSubheaderStyles = this.mergeAndPrefix(styles.subheader, subheaderStyle);
      subheaderElement = <div style={mergedSubheaderStyles}>{subheader}</div>;
    }

    return (
      <Paper
        {...other}
        style={this.mergeStyles(styles.root, style)}
        zDepth={zDepth}>
        {subheaderElement}
        {children}
      </Paper>
    );
  },
});

module.exports = List;
