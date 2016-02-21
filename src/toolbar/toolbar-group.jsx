import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    firstChild,
    float,
    lastChild,
  } = props;

  const {
    baseTheme,
    button,
    toolbar,
  } = state.muiTheme;

  const marginHorizontal = baseTheme.spacing.desktopGutter;
  const marginVertical = (toolbar.height - button.height) / 2;

  const styles = {
    root: {
      float,
      position: 'relative',
      marginLeft: firstChild ? -marginHorizontal : undefined,
      marginRight: lastChild ? -marginHorizontal : undefined,
    },
    dropDownMenu: {
      root: {
        float: 'left',
        color: toolbar.color, // removes hover color change, we want to keep it
        display: 'inline-block',
        marginRight: baseTheme.spacing.desktopGutter,
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
      float: 'left',
      margin: `${marginVertical}px ${marginHorizontal}px`,
      position: 'relative',
    },
    icon: {
      root: {
        float: 'left',
        cursor: 'pointer',
        color: toolbar.iconColor,
        lineHeight: `${toolbar.height}px`,
        paddingLeft: baseTheme.spacing.desktopGutter,
      },
      hover: {
        color: toolbar.hoverColor,
      },
    },
    span: {
      float: 'left',
      color: toolbar.iconColor,
      lineHeight: `${toolbar.height}px`,
    },
  };

  return styles;
}

const ToolbarGroup = React.createClass({
  propTypes: {
    /**
     * Can be any node or number of nodes.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Set this to true for if the `ToolbarGroup` is the first child of `Toolbar`
     * to prevent setting the left gap.
     */
    firstChild: React.PropTypes.bool,

    /**
     * Determines the side the `ToolbarGroup` will snap to. Either 'left' or 'right'.
     */
    float: React.PropTypes.oneOf(['left', 'right']),

    /**
     * Set this to true for if the `ToolbarGroup` is the last child of `Toolbar`
     * to prevent setting the right gap.
     */
    lastChild: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      firstChild: false,
      float: 'left',
      lastChild: false,
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

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  _handleMouseEnterFontIcon: (style) => (event) => {
    event.target.style.zIndex = style.hover.zIndex;
    event.target.style.color = style.hover.color;
  },

  _handleMouseLeaveFontIcon: (style) => (event) => {
    event.target.style.zIndex = 'auto';
    event.target.style.color = style.root.color;
  },

  render() {
    const {
      children,
      className,
      style,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    const newChildren = React.Children.map(children, (currentChild) => {
      if (!currentChild) {
        return null;
      }
      if (!currentChild.type) {
        return currentChild;
      }
      switch (currentChild.type.displayName) {
        case 'DropDownMenu' :
          return React.cloneElement(currentChild, {
            style: Object.assign({}, styles.dropDownMenu.root, currentChild.props.style),
            styleControlBg: styles.dropDownMenu.controlBg,
            styleUnderline: styles.dropDownMenu.underline,
          });
        case 'RaisedButton' :
        case 'FlatButton' :
          return React.cloneElement(currentChild, {
            style: Object.assign({}, styles.button, currentChild.props.style),
          });
        case 'FontIcon' :
          return React.cloneElement(currentChild, {
            style: Object.assign({}, styles.icon.root, currentChild.props.style),
            onMouseEnter: this._handleMouseEnterFontIcon(styles.icon),
            onMouseLeave: this._handleMouseLeaveFontIcon(styles.icon),
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
  },
});

export default ToolbarGroup;
