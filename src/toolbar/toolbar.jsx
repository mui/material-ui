import React from 'react';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';

let Toolbar = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

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

  getDefaultProps() {
    return {
      noGutter: false,
    };
  },

  getTheme() {
    return this.props._muiTheme.toolbar;
  },

  getSpacing() {
    return this.props._muiTheme.baseTheme.spacing;
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

Toolbar = muiThemeable(Toolbar);

export default Toolbar;
