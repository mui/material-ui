import React from 'react';

function getStyles(props, context) {
  const {
    baseTheme,
    toolbar,
  } = context.muiTheme;

  return {
    root: {
      paddingRight: baseTheme.spacing.desktopGutterLess,
      lineHeight: `${toolbar.height}px`,
      fontSize: toolbar.titleFontSize,
      position: 'relative',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
  };
}

const ToolbarTitle = React.createClass({

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

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  render() {
    const {
      className,
      style,
      text,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <span {...other} className={className} style={prepareStyles(Object.assign({}, styles.root, style))}>
        {text}
      </span>
    );
  },

});

export default ToolbarTitle;
