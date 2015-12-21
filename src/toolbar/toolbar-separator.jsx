import React from 'react';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';

let ToolbarSeparator = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
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
        backgroundColor: this.getTheme().separatorColor,
        display: 'inline-block',
        height: this.getSpacing().desktopGutterMore,
        marginLeft: this.getSpacing().desktopGutter,
        position: 'relative',
        top: ((this.getTheme().height - this.getSpacing().desktopGutterMore) / 2),
        width: 1,
      },
    };
  },

  render() {

    const {
      className,
      style,
      ...other,
    } = this.props;

    const styles = this.getStyles();

    return (
      <span {...other} className={className} style={this.prepareStyles(styles.root, style)}/>
    );
  },

});

ToolbarSeparator = muiThemeable(ToolbarSeparator);

export default ToolbarSeparator;
