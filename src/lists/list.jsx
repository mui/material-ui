import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from '../utils/prop-types';
import StylePropable from '../mixins/style-propable';
import Typography from '../styles/typography';
import Paper from '../paper';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const List = React.createClass({

  mixins: [
    PureRenderMixin,
    StylePropable,
  ],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
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

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getDefaultProps() {
    return {
      zDepth: 0,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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

export default List;
