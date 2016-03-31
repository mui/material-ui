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

class ToolbarTitle extends React.Component {
  static muiName = 'ToolbarTitle';

  static propTypes = {
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
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

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
  }
}

export default ToolbarTitle;
