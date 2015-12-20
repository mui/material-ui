import React from 'react';
import Colors from '../styles/colors';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';

let ToolbarGroup = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

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

  getDefaultProps() {
    return {
      firstChild: false,
      float: 'left',
      lastChild: false,
    };
  },

  getTheme() {
    return this.props._muiTheme.toolbar;
  },

  getSpacing() {
    return this.props._muiTheme.baseTheme.spacing;
  },

  getStyles() {
    const {
      firstChild,
      float,
      lastChild,
    } = this.props;

    const marginHorizontal = this.getSpacing().desktopGutter;
    const marginVertical = (this.getTheme().height - this.props._muiTheme.button.height) / 2;
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
});

ToolbarGroup = muiThemeable(ToolbarGroup);

export default ToolbarGroup;
