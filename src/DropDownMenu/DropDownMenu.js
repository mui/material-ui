import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import { Menu, MenuItem } from '../Menu';
import ClearFix from '../internal/ClearFix';
//import PopoverAnimationVertical from '../Popover/PopoverAnimationVertical';
const anchorOrigin = {
  vertical: 'top',
  horizontal: 'left',
};
const styleSheet = createStyleSheet('SimpleMenu', () => ({
  menu: {},
  content: {
    margin: 0,
  },
}));
function getStyles(props, context) {
  const { disabled } = props;
  const { palette, typography, transitions, accent } = context.theme;
  const spacing = {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 46,
  }
  return {
    control: {
      cursor: disabled ? 'not-allowed' : 'pointer',
    },
    icon: {
      fill: accent,
      position: 'absolute',
      right: spacing.desktopGutterLess,
      top: 15,
    },
    label: {
      color: disabled ? palette.text.disabled : palette.text.primary,
      lineHeight: 2,
      opacity: 1,
      position: 'relative',
      bottom: 0
    },
    labelWhenOpen: {
      opacity: 0
    },
    root: {
      display: 'inline-block',
      fontSize: spacing.desktopDropDownMenuFontSize,
      height: spacing.desktopSubheaderHeight,
      fontFamily: typography.fontFamily,
      outline: 'none',
      position: 'relative',
      transition: transitions.create(),
    },
    rootWhenOpen: {
      opacity: 1,
    },
    underline: {
      borderTop: `solid 1px ${accent}`,
      bottom: 1,
      left: 0,
      margin: `-1px ${spacing.desktopGutter}px`,
      right: 0,
      position: 'absolute',
    },
  };
}
class DropDownMenu extends Component {
  static muiName = 'DropDownMenu';
  // The nested styles for drop-down-menu are modified by toolbar and possibly
  // other user components, so it will give full access to its js styles rather
  // than just the parent.
  static propTypes = {
    /**
     * If true, the popover will apply transitions when
     * it gets added to the DOM.
     */
    animated: PropTypes.bool,
    /**
     * Override the default animation component used.
     */
    animation: PropTypes.func,
    /**
     * The width will automatically be set according to the items inside the menu.
     * To control this width in css instead, set this prop to `false`.
     */
    autoWidth: PropTypes.bool,
    /**
     * The `MenuItem`s to populate the `Menu` with. If the `MenuItems` have the
     * prop `label` that value will be used to render the representation of that
     * item within the field.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Disables the menu.
     */
    disabled: PropTypes.bool,
    /**
     * Overrides the styles of icon element.
     */
    iconStyle: PropTypes.object,
    /**
     * Overrides the styles of label when the `DropDownMenu` is inactive.
     */
    labelStyle: PropTypes.object,
    /**
     * The style object to use to override underlying list style.
     */
    listStyle: PropTypes.object,
    /**
     * The maximum height of the `Menu` when it is displayed.
     */
    maxHeight: PropTypes.number,
    /**
     * Overrides the styles of `Menu` when the `DropDownMenu` is displayed.
     */
    menuStyle: PropTypes.object,
    /**
     * Callback function fired when a menu item is clicked, other than the one currently selected.
     *
     * @param {object} event TouchTap event targeting the menu item that was clicked.
     * @param {number} key The index of the clicked menu item in the `children` collection.
     * @param {any} payload The `value` prop of the clicked menu item.
     */
    onChange: PropTypes.func,
    /**
     * Set to true to have the `DropDownMenu` automatically open on mount.
     */
    openImmediately: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Overrides the inline-styles of the underline.
     */
    underlineStyle: PropTypes.object,
    /**
     * The value that is currently selected.
     */
    value: PropTypes.any,
  };
  static defaultProps = {
    animated: true,
    autoWidth: true,
    disabled: false,
    openImmediately: false,
    maxHeight: 500,
  };
  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
    //  muiTheme: PropTypes.object.isRequired,
  };
  state = {
    open: false,
  };
  
  componentDidMount() {
    if (this.props.autoWidth) {
      this.setWidth();
    }
    if (this.props.openImmediately) {
      // TODO: Temporary fix to make openImmediately work with popover.
      /* eslint-disable react/no-did-mount-set-state */
      setTimeout(() => this.setState({ open: true, anchorEl: this.refs.root }));
      setTimeout(() => this.setState({
        open: true,
        anchorEl: this.refs.root,
      }), 0);
      /* eslint-enable react/no-did-mount-set-state */
    }
  }
  
  componentWillReceiveProps() {
    if (this.props.autoWidth) {
      this.setWidth();
    }
  }
  
  /**
   * This method is deprecated but still here because the TextField
   * need it in order to work. TODO: That will be addressed later.
   */
  getInputNode() {
    const root = this.refs.root;
    root.focus = () => {
      if (!this.props.disabled) {
        this.setState({
          open: !this.state.open,
          anchorEl: this.refs.root,
        });
      }
    };
    return root;
  }
  
  setWidth() {
    const el = this.refs.root;
    if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
      el.style.width = 'auto';
    }
  }
  
  handleTouchTapControl = (event) => {
    console.log("tap")
    event.preventDefault();
    if (!this.props.disabled) {
      this.setState({
        open: !this.state.open,
        anchorEl: this.refs.root,
      });
    }
  };
  handleRequestCloseMenu = () => {
    this.setState({
      open: false,
      anchorEl: null,
    });
  };
  handleItemTouchTap = (event, child, index) => {
    event.persist();
    this.setState({
      open: false,
    }, () => {
      if (this.props.onChange) {
        if (child.props)
          this.props.onChange(event, index, child.props.value);
        else
          this.props.onChange(event, index, child);
      }
    });
  };
  
  render() {
    const {
      animated,
      animation,
      autoWidth,
      children,
      className,
      iconStyle,
      labelStyle,
      listStyle,
      maxHeight,
      menuStyle: menuStyleProp,
      openImmediately, // eslint-disable-line no-unused-vars
      style,
      underlineStyle,
      value,
      ...other
    } = this.props;
    const {
      anchorEl,
      open,
    } = this.state;
    const classes = this.context.styleManager.render(styleSheet);
    const styleManager = this.context.styleManager;
    const { prepareInline } = styleManager;
    const styles = getStyles(this.props, styleManager);
    let displayValue = '';
    if (value) {
      React.Children.forEach(children, (child) => {
        if (child && value === child.props.value) {
          // This will need to be improved (in case primaryText is a node)
          displayValue = child.props.label || child.props.primaryText;
        }
      });
    }
    let menuStyle;
    if (anchorEl && !autoWidth) {
      menuStyle = Object.assign({
        width: anchorEl.clientWidth,
      }, menuStyleProp);
    } else {
      menuStyle = menuStyleProp;
    }
    let index = 0;
    return (
      <div
        {...other}
        ref="root"
        className={className}
        style={prepareInline(Object.assign({}, styles.root, open && styles.rootWhenOpen, style))}
      >
        <div
          style={prepareInline(Object.assign({}, styles.label, open && styles.labelWhenOpen, labelStyle))}
          onClick={this.handleTouchTapControl}
        >
          {displayValue}
          <i className="absolute fa fa-caret-down bottom-0 right-0"/>
        </div>
        <Menu
          anchorOrigin={anchorOrigin}
          anchorEl={anchorEl}
          open={open}
          className={classes.menu}
          onRequestClose={this.handleRequestCloseMenu}
          style={menuStyle}
          listStyle={listStyle}
        >
          {
            children.map((child) => {
              console.log(child);
              const func = (event) => {
                return this.handleItemTouchTap(event, child, index);
              }
              index++;
              if (child && child.props) {
                let val = child.props.label || child.props.primaryText;
                console.log(val)
                // This will need to be improved (in case primaryText is a node)
                return <MenuItem key={"fk" + index} onClick={func}
                                 selected={displayValue ? (displayValue === child) : false}>{val}</MenuItem>;
              } else {
                return <MenuItem key={"fk" + index} onClick={func}
                                 selected={displayValue ? (displayValue === child) : false}>{child}</MenuItem>;
              }
            })
          }
        </Menu>
      </div>
    );
  }
}
export default DropDownMenu;
