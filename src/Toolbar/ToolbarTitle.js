import React, {Component, PropTypes} from 'react';

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

class ToolbarTitle extends Component {
  static muiName = 'ToolbarTitle';

  static propTypes = {
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The text to be displayed.
     */
    text: PropTypes.string,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
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
