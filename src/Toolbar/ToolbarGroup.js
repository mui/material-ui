import React, {Component, PropTypes} from 'react';

function getStyles(props, context) {
  const {
    firstChild,
    lastChild,
  } = props;

  const {
    baseTheme,
    button,
    toolbar,
  } = context.muiTheme;

  const marginHorizontal = baseTheme.spacing.desktopGutter;
  const marginVertical = (toolbar.height - button.height) / 2;

  const styles = {
    root: {
      position: 'relative',
      marginLeft: firstChild ? -marginHorizontal : undefined,
      marginRight: lastChild ? -marginHorizontal : undefined,
      display: 'flex',
      justifyContent: 'space-between',
    },
    dropDownMenu: {
      root: {
        color: toolbar.color, // removes hover color change, we want to keep it
        marginRight: baseTheme.spacing.desktopGutter,
        flex: 1,
        whiteSpace: 'nowrap',
      },
      controlBg: {
        backgroundColor: toolbar.menuHoverColor,
        borderRadius: 0,
      },
      underline: {
        display: 'none',
      },
    },
    button: {
      margin: `${marginVertical}px ${marginHorizontal}px`,
      position: 'relative',
    },
    icon: {
      root: {
        cursor: 'pointer',
        lineHeight: `${toolbar.height}px`,
        paddingLeft: baseTheme.spacing.desktopGutter,
      },
    },
    span: {
      color: toolbar.iconColor,
      lineHeight: `${toolbar.height}px`,
    },
  };

  return styles;
}

class ToolbarGroup extends Component {
  static propTypes = {
    /**
     * Can be any node or number of nodes.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Set this to true for if the `ToolbarGroup` is the first child of `Toolbar`
     * to prevent setting the left gap.
     */
    firstChild: PropTypes.bool,
    /**
     * Set this to true for if the `ToolbarGroup` is the last child of `Toolbar`
     * to prevent setting the right gap.
     */
    lastChild: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    firstChild: false,
    lastChild: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  handleMouseLeaveFontIcon(style) {
    return (event) => {
      event.target.style.zIndex = 'auto';
      event.target.style.color = style.root.color;
    };
  }

  render() {
    const {
      children,
      className,
      firstChild, // eslint-disable-line no-unused-vars
      lastChild, // eslint-disable-line no-unused-vars
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    const newChildren = React.Children.map(children, (currentChild) => {
      if (!currentChild) {
        return null;
      }
      if (!currentChild.type) {
        return currentChild;
      }
      switch (currentChild.type.muiName) {
        case 'DropDownMenu' :
          return React.cloneElement(currentChild, {
            style: Object.assign({}, styles.dropDownMenu.root, currentChild.props.style),
            underlineStyle: styles.dropDownMenu.underline,
          });
        case 'RaisedButton' :
        case 'FlatButton' :
          return React.cloneElement(currentChild, {
            style: Object.assign({}, styles.button, currentChild.props.style),
          });
        case 'FontIcon' :
          return React.cloneElement(currentChild, {
            style: Object.assign({}, styles.icon.root, currentChild.props.style),
            color: currentChild.props.color || this.context.muiTheme.toolbar.iconColor,
            hoverColor: currentChild.props.hoverColor || this.context.muiTheme.toolbar.hoverColor,
          });
        case 'ToolbarSeparator' :
        case 'ToolbarTitle' :
          return React.cloneElement(currentChild, {
            style: Object.assign({}, styles.span, currentChild.props.style),
          });
        default:
          return currentChild;
      }
    }, this);

    return (
      <div {...other} className={className} style={prepareStyles(Object.assign({}, styles.root, style))}>
        {newChildren}
      </div>
    );
  }
}

export default ToolbarGroup;
