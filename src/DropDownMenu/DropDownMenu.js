import React from 'react';
import transitions from '../styles/transitions';
import DropDownArrow from '../svg-icons/navigation/arrow-drop-down';
import Menu from '../Menu/Menu';
import ClearFix from '../internal/ClearFix';
import getMuiTheme from '../styles/getMuiTheme';
import Popover from '../Popover/Popover';
import PopoverAnimationFromTop from '../Popover/PopoverAnimationVertical';

const anchorOrigin = {
  vertical: 'top',
  horizontal: 'left',
};

const DropDownMenu = React.createClass({

  // The nested styles for drop-down-menu are modified by toolbar and possibly
  // other user components, so it will give full access to its js styles rather
  // than just the parent.
  propTypes: {
    /**
     * The width will automatically be set according to the items inside the menu.
     * To control this width in css instead, set this prop to false.
     */
    autoWidth: React.PropTypes.bool,

    /**
     * The `MenuItem`s to populate the `Menu` with. If the `MenuItems` have the
     * prop `label` that value will be used to render the representation of that
     * item within the field.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Disables the menu.
     */
    disabled: React.PropTypes.bool,

    /**
     * Overrides the styles of icon element.
     */
    iconStyle: React.PropTypes.object,

    /**
     * Overrides the styles of label when the `DropDownMenu` is inactive.
     */
    labelStyle: React.PropTypes.object,

    /**
     * The style object to use to override underlying list style.
     */
    listStyle: React.PropTypes.object,

    /**
     * The maximum height of the `Menu` when it is displayed.
     */
    maxHeight: React.PropTypes.number,

    /**
     * Overrides the styles of `Menu` when the `DropDownMenu` is displayed.
     */
    menuStyle: React.PropTypes.object,

    /**
     * Callback function fired when a menu item is clicked, other than the one currently selected.
     *
     * @param {object} event TouchTap event targeting the menu item that was clicked.
     * @param {number} key The index of the clicked menu item in the `children` collection.
     * @param {any} payload The `value` prop of the clicked menu item.
     */
    onChange: React.PropTypes.func,

    /**
     * Set to true to have the `DropDownMenu` automatically open on mount.
     */
    openImmediately: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * Overrides the inline-styles of the underline.
     */
    underlineStyle: React.PropTypes.object,

    /**
     * The value that is currently selected.
     */
    value: React.PropTypes.any,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      autoWidth: true,
      disabled: false,
      openImmediately: false,
      maxHeight: 500,
    };
  },

  getInitialState() {
    return {
      open: false,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
    if (this.props.openImmediately) {
      /*eslint-disable react/no-did-mount-set-state */
      // Temorary fix to make openImmediately work with popover.
      setTimeout(() => this.setState({open: true, anchorEl: this.refs.root}));
      /*eslint-enable react/no-did-mount-set-state */
    }
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    if (this.props.autoWidth) {
      this._setWidth();
    }
  },

  getStyles() {
    const {disabled} = this.props;
    const spacing = this.state.muiTheme.rawTheme.spacing;
    const palette = this.state.muiTheme.rawTheme.palette;
    const accentColor = this.state.muiTheme.dropDownMenu.accentColor;
    return {
      control: {
        cursor: disabled ? 'not-allowed' : 'pointer',
        height: '100%',
        position: 'relative',
        width: '100%',
      },
      icon: {
        fill: accentColor,
        position: 'absolute',
        right: spacing.desktopGutterLess,
        top: ((spacing.desktopToolbarHeight - 24) / 2),
      },
      label: {
        color: disabled ? palette.disabledColor : palette.textColor,
        lineHeight: `${spacing.desktopToolbarHeight}px`,
        opacity: 1,
        position: 'relative',
        paddingLeft: spacing.desktopGutter,
        paddingRight: spacing.iconSize +
                      spacing.desktopGutterLess +
                      spacing.desktopGutterMini,
        top: 0,
      },
      labelWhenOpen: {
        opacity: 0,
        top: (spacing.desktopToolbarHeight / 8),
      },
      rootWhenOpen: {
        opacity: 1,
      },
      root: {
        display: 'inline-block',
        fontSize: spacing.desktopDropDownMenuFontSize,
        height: spacing.desktopSubheaderHeight,
        fontFamily: this.state.muiTheme.rawTheme.fontFamily,
        outline: 'none',
        position: 'relative',
        transition: transitions.easeOut(),
      },
      underline: {
        borderTop: `solid 1px ${accentColor}`,
        bottom: 1,
        left: 0,
        margin: `-1px ${spacing.desktopGutter}px`,
        right: 0,
        position: 'absolute',
      },
    };
  },

  /**
   * This method is deprecated but still here because the TextField
   * need it in order to work. That will be addressed later.
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
  },


  _setWidth() {
    const el = this.refs.root;
    if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
      el.style.width = 'auto';
    }
  },

  handleTouchTapControl(event) {
    event.preventDefault();
    if (!this.props.disabled) {
      this.setState({
        open: !this.state.open,
        anchorEl: this.refs.root,
      });
    }
  },

  handleRequestCloseMenu() {
    this.setState({
      open: false,
      anchorEl: null,
    });
  },

  handleItemTouchTap(event, child, index) {
    this.props.onChange(event, index, child.props.value);

    this.setState({
      open: false,
    });
  },

  render() {
    const {
      autoWidth,
      children,
      className,
      iconStyle,
      labelStyle,
      listStyle,
      maxHeight,
      menuStyle,
      style,
      underlineStyle,
      value,
      ...other,
    } = this.props;

    const {
      anchorEl,
      open,
      muiTheme,
    } = this.state;

    const {
      prepareStyles,
    } = muiTheme;

    const styles = this.getStyles();

    let displayValue = '';
    React.Children.forEach(children, (child) => {
      if (value === child.props.value) {
        // This will need to be improved (in case primaryText is a node)
        displayValue = child.props.label || child.props.primaryText;
      }
    });

    let popoverStyle;
    if (anchorEl && !autoWidth) {
      popoverStyle = {width: anchorEl.clientWidth};
    }

    return (
      <div
        {...other}
        ref="root"
        className={className}
        style={prepareStyles(Object.assign({}, styles.root, open && styles.rootWhenOpen, style))}
      >
        <ClearFix style={styles.control} onTouchTap={this.handleTouchTapControl}>
          <div
            style={prepareStyles(Object.assign({}, styles.label, open && styles.labelWhenOpen, labelStyle))}
          >
            {displayValue}
          </div>
          <DropDownArrow style={Object.assign({}, styles.icon, iconStyle)} />
          <div style={prepareStyles(Object.assign({}, styles.underline, underlineStyle))} />
        </ClearFix>
        <Popover
          anchorOrigin={anchorOrigin}
          anchorEl={anchorEl}
          style={popoverStyle}
          animation={PopoverAnimationFromTop}
          open={open}
          onRequestClose={this.handleRequestCloseMenu}
        >
          <Menu
            maxHeight={maxHeight}
            desktop={true}
            value={value}
            style={menuStyle}
            listStyle={listStyle}
            onItemTouchTap={this.handleItemTouchTap}
          >
            {children}
          </Menu>
        </Popover>
      </div>
    );
  },

});

export default DropDownMenu;
