import React, {Component, PropTypes} from 'react';

function getStyles(props, context) {
  const {
    baseTheme,
    toolbar,
  } = context.muiTheme;

  return {
    root: {
      backgroundColor: toolbar.separatorColor,
      display: 'inline-block',
      height: baseTheme.spacing.desktopGutterMore,
      marginLeft: baseTheme.spacing.desktopGutter,
      position: 'relative',
      top: ((toolbar.height - baseTheme.spacing.desktopGutterMore) / 2),
      width: 1,
    },
  };
}

class ToolbarSeparator extends Component {
  static muiName = 'ToolbarSeparator';

  static propTypes = {
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      className,
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <span {...other} className={className} style={prepareStyles(Object.assign({}, styles.root, style))} />
    );
  }
}

export default ToolbarSeparator;
