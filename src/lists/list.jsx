let React = require('react/addons');
let PropTypes = require('../utils/prop-types');
let StylePropable = require('../mixins/style-propable');
let Typography = require('../styles/typography');
let Paper = require('../paper');


let List = React.createClass({

  mixins: [StylePropable],

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
    let {
      insetSubheader,
      style,
      subheader,
      subheaderStyle,
      zDepth,
      ...other,
    } = this.props;

    let styles = {
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

    let mergedRootStyles = this.mergeStyles(styles.root, style);
    let mergedSubheaderStyles = this.mergeAndPrefix(styles.subheader, subheaderStyle);

    let subheaderElement = subheader ? (
      <div style={mergedSubheaderStyles}>{subheader}</div>
    ) : null;

    return (
      <Paper
        {...other}
        style={mergedRootStyles}
        zDepth={zDepth}>
        {subheaderElement}
        {this.props.children}
      </Paper>
    );
  },
});

module.exports = List;
