import React from 'react';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

const Toolbar = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    /**
     * Can be a `ToolbarGroup` to render a group of related items.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root `div` element.
     */
    className: React.PropTypes.string,

    /**
     * Do not apply `desktopGutter` to the `Toolbar`.
     */
    noGutter: React.PropTypes.bool,

    /**
     * Override the inline-styles of the `Toolbar`'s root element.
     */
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      noGutter: false,
    };
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
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getTheme() {
    return this.state.muiTheme.toolbar;
  },

  getStyles() {
    return this.mergeStyles({
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      backgroundColor: this.getTheme().backgroundColor,
      height: this.getTheme().height,
      width: '100%',
      padding: this.props.noGutter ? 0 : '0px ' + this.state.muiTheme.rawTheme.spacing.desktopGutter + 'px',
    }, this.props.style);
  },

  render() {
    return (
      <div className={this.props.className} style={this.prepareStyles(this.getStyles())}>
        {this.props.children}
      </div>
    );
  },

});

export default Toolbar;
