import React from 'react';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';

let ToolbarTitle = React.createClass({

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

    /**
     * The text to be displayed.
     */
    text: React.PropTypes.string,
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

ToolbarTitle = muiThemeable(ToolbarTitle);

export default ToolbarTitle;
