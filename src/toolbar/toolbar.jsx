import React from 'react';
import StylePropable from '../mixins/style-propable';
import getMuiTheme from '../styles/getMuiTheme';

const Toolbar = React.createClass({

  propTypes: {
    /**
     * Can be a `ToolbarGroup` to render a group of related items.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Do not apply `desktopGutter` to the `Toolbar`.
     */
    noGutter: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },
  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      noGutter: false,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
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

  getTheme() {
    return this.state.muiTheme.toolbar;
  },

  getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  getStyles() {
    return {
      root: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        backgroundColor: this.getTheme().backgroundColor,
        height: this.getTheme().height,
        width: '100%',
        padding: this.props.noGutter ? 0 : '0px ' + this.getSpacing().desktopGutter + 'px',
      },
    };
  },

  render() {
    const {
      children,
      className,
      style,
      ...other,
    } = this.props;

    const styles = this.getStyles();

    return (
      <div {...other} className={className} style={this.prepareStyles(styles.root, style)}>
        {children}
      </div>
    );
  },

});

export default Toolbar;
