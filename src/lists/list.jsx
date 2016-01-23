import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from '../utils/prop-types';
import StylePropable from '../mixins/style-propable';
import Paper from '../paper';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';
import Subheader from '../Subheader';

const List = React.createClass({

  propTypes: {
    /**
     * These are usually ListItems that are passed to
     * be part of the list.
     */
    children: React.PropTypes.node,

    /**
     * If true, the subheader will be indented by 72px.
     */
    insetSubheader: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The subheader string that will be displayed at the top of the list.
     */
    subheader: React.PropTypes.node,

    /**
     * The style object to override subheader styles.
     */
    subheaderStyle: React.PropTypes.object,

    /**
     * The zDepth prop passed to the Paper element inside list.
     */
    zDepth: PropTypes.zDepth,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    PureRenderMixin,
    StylePropable,
  ],

  getDefaultProps() {
    return {
      insetSubheader: false,
      zDepth: 0,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
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
    };

    return (
      <Paper
        {...other}
        style={this.mergeStyles(styles.root, style)}
        zDepth={zDepth}
      >
        {subheader ? <Subheader inset={insetSubheader} style={subheaderStyle}>{subheader}</Subheader> : null}
        {children}
      </Paper>
    );
  },
});

export default List;
