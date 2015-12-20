import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from '../utils/prop-types';
import StylePropable from '../mixins/style-propable';
import Typography from '../styles/typography';
import Paper from '../paper';
import muiThemeable from '../muiThemeable';

let List = React.createClass({

  mixins: [
    PureRenderMixin,
    StylePropable,
  ],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    children: React.PropTypes.node,
    insetSubheader: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    subheader: React.PropTypes.node,
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
      const mergedSubheaderStyles = this.prepareStyles(styles.subheader, subheaderStyle);
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

List = muiThemeable(List);

export default List;
