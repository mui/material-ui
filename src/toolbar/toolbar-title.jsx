import React from 'react';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const ToolbarTitle = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The text to be displayed.
     */
    text: React.PropTypes.string,
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

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getTheme() {
    return this.state.muiTheme.toolbar;
  },

  getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  getStyles() {
    return {
      root: {
        paddingRight: this.getSpacing().desktopGutterLess,
        lineHeight: this.getTheme().height + 'px',
        fontSize: this.getTheme().titleFontSize + 'px',
        display: 'inline-block',
        position: 'relative',
      },
    };
  },

  render() {
    const {
      className,
      style,
      text,
      ...other,
    } = this.props;

    const styles = this.getStyles();

    return (
      <span {...other} className={className} style={this.prepareStyles(styles.root, style)}>
        {text}
      </span>
    );
  },

});

export default ToolbarTitle;
