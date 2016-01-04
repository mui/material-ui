import React from 'react';
import Colors from '../styles/colors';
import StylePropable from '../mixins/style-propable';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ThemeManager from '../styles/theme-manager';

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
     * to prevent setting the right gap.
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

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getDefaultProps() {
    return {
      firstChild: false,
      float: 'left',
      lastChild: false,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
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
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getTheme() {
    return this.state.muiTheme.toolbar;
  },

  getSpacing() {
    return this.state.muiTheme.rawTheme.spacing;
  },

  getStyles() {
    const {
      firstChild,
      float,
      lastChild,
    } = this.props;

    const marginHorizontal = this.getSpacing().desktopGutter;
    const marginVertical = (this.getTheme().height - this.state.muiTheme.button.height) / 2;
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
          color: Colors.lightBlack, // removes hover color change, we want to keep it
          display: 'inline-block',
          marginRight: this.getSpacing().desktopGutter,
        },
        controlBg: {
          backgroundColor: this.getTheme().menuHoverColor,
          borderRadius: 0,
        },
        underline: {
          display: 'none',
        },
      },
      button: {
        float: 'left',
        margin: marginVertical + 'px ' + marginHorizontal + 'px',
        position: 'relative',
      },
      icon: {
        root: {
          float: 'left',
          cursor: 'pointer',
          color: this.getTheme().iconColor,
          lineHeight: this.getTheme().height + 'px',
          paddingLeft: this.getSpacing().desktopGutter,
        },
        hover: {
          color: Colors.darkBlack,
        },
      },
      span: {
        float: 'left',
        color: this.getTheme().iconColor,
        lineHeight: this.getTheme().height + 'px',
      },
    };

    return styles;
  },

  _handleMouseEnterDropDownMenu(e) {
    e.target.style.zIndex = this.getStyles().icon.hover.zIndex;
    e.target.style.color = this.getStyles().icon.hover.color;
  },

  _handleMouseLeaveDropDownMenu(e) {
    e.target.style.zIndex = 'auto';
    e.target.style.color = this.getStyles().icon.root.color;
  },

  _handleMouseEnterFontIcon(e) {
    e.target.style.zIndex = this.getStyles().icon.hover.zIndex;
    e.target.style.color = this.getStyles().icon.hover.color;
  },

  _handleMouseLeaveFontIcon(e) {
    e.target.style.zIndex = 'auto';
    e.target.style.color = this.getStyles().icon.root.color;
  },

  render() {
    const {
      children,
      className,
      style,
      ...other,
    } = this.props;

    const styles = this.getStyles();
    const newChildren = React.Children.map(children, currentChild => {
      if (!currentChild) {
        return null;
      }
      if (!currentChild.type) {
        return currentChild;
      }
      switch (currentChild.type.displayName) {
        case 'DropDownMenu' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles(styles.dropDownMenu.root, currentChild.props.style),
            styleControlBg: styles.dropDownMenu.controlBg,
            styleUnderline: styles.dropDownMenu.underline,
          });
        case 'DropDownIcon' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles({float: 'left'}, currentChild.props.style),
            iconStyle: styles.icon.root,
            onMouseEnter: this._handleMouseEnterDropDownMenu,
            onMouseLeave: this._handleMouseLeaveDropDownMenu,
          });
        case 'RaisedButton' :
        case 'FlatButton' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles(styles.button, currentChild.props.style),
          });
        case 'FontIcon' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles(styles.icon.root, currentChild.props.style),
            onMouseEnter: this._handleMouseEnterFontIcon,
            onMouseLeave: this._handleMouseLeaveFontIcon,
          });
        case 'ToolbarSeparator' :
        case 'ToolbarTitle' :
          return React.cloneElement(currentChild, {
            style: this.mergeStyles(styles.span, currentChild.props.style),
          });
        default:
          return currentChild;
      }
    }, this);

    return (
      <div {...other} className={className} style={this.prepareStyles(styles.root, style)}>
        {newChildren}
      </div>
    );
  },
});

export default ToolbarGroup;
