import React from 'react';
import Transitions from '../styles/transitions';
import DropDownArrow from '../svg-icons/navigation/arrow-drop-down';
import Menu from '../menus/menu';
import MenuItem from '../menus/menu-item';
import DefaultRawTheme from '../styles/raw-themes/light-raw-theme';
import ClearFix from '../clearfix';
import ThemeManager from '../styles/theme-manager';
import Popover from '../popover/popover';
import PopoverAnimationFromTop from '../popover/popover-animation-from-top';
import warning from 'warning';

const DropDownMenu = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  // The nested styles for drop-down-menu are modified by toolbar and possibly
  // other user components, so it will give full access to its js styles rather
  // than just the parent.
  propTypes: {
    autoWidth: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    displayMember: React.PropTypes.string, // DEPRECATE
    iconStyle: React.PropTypes.object,
    labelMember: React.PropTypes.string, // DEPRECATE
    labelStyle: React.PropTypes.object, // DEPRECATE
    maxHeight: React.PropTypes.number,
    menuItems: React.PropTypes.array, // DEPRECATE
    menuStyle: React.PropTypes.object,
    onChange: React.PropTypes.func,
    openImmediately: React.PropTypes.bool,
    selectedIndex: React.PropTypes.number, // DEPRECATE
    style: React.PropTypes.object,
    underlineStyle: React.PropTypes.object,
    value: React.PropTypes.any,
    valueLink: React.PropTypes.object, // DEPRECATE
    valueMember: React.PropTypes.string, // DEPRECATE
  },

  getDefaultProps() {
    return {
      autoWidth: true,
      disabled: false,
      valueMember: 'payload',
      displayMember: 'text',
      openImmediately: false,
      maxHeight: 500,
      labelMember: 'text',
    };
  },

  getInitialState() {
    this._testDeprecations();
    return {
      open: this.props.openImmediately,
      selectedIndex: this._isControlled() ? null : (this.props.selectedIndex || 0),
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props.selectedIndex);
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    if (this.props.autoWidth) this._setWidth();
    if (nextProps.hasOwnProperty('value') || nextProps.hasOwnProperty('valueLink')) {
      return;
    }
    else if (nextProps.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps.selectedIndex);
    }
  },

  getStyles() {
    const {disabled} = this.props;
    const spacing = this.state.muiTheme.rawTheme.spacing;
    const palette = this.state.muiTheme.rawTheme.palette;
    const accentColor = this.state.muiTheme.dropDownMenu.accentColor;
    return {
      root: {
        transition: Transitions.easeOut(),
        position: 'relative',
        display: 'inline-block',
        height: spacing.desktopSubheaderHeight,
        fontSize: spacing.desktopDropDownMenuFontSize,
        outline: 'none',
      },
      control: {
        cursor: disabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        height: '100%',
        width: '100%',
      },
      icon: {
        position: 'absolute',
        top: ((spacing.desktopToolbarHeight - 24) / 2),
        right: spacing.desktopGutterLess,
        fill: accentColor,
      },
      label: {
        lineHeight: `${spacing.desktopToolbarHeight}px`,
        position: 'relative',
        paddingLeft: spacing.desktopGutter,
        paddingRight: spacing.iconSize +
                      spacing.desktopGutterLess +
                      spacing.desktopGutterMini,
        top: 0,
        opacity: 1,
        color: disabled ? palette.disabledColor : palette.textColor,
      },
      underline: {
        position: 'absolute',
        borderTop: `solid 1px ${accentColor}`,
        margin: `-1px ${spacing.desktopGutter}px`,
        bottom: 1,
        left: 0,
        right: 0,
      },
      rootWhenOpen: {
        opacity: 1,
      },
      labelWhenOpen: {
        opacity: 0,
        top: (spacing.desktopToolbarHeight / 8),
      },
    };
  },

  getInputNode() {
    warning(false, `This imperative method will be removed in favor of composability.`);
    const root = this.refs.root;
    const item = this.props.menuItems && this.props.menuItems[this.state.selectedIndex];
    if (item) {
      root.value = item[this.props.displayMember];
    }

    return root;
  },

  render() {
    const {
      autoWidth,
      children,
      className,
      displayMember,
      iconStyle,
      labelMember,
      labelStyle,
      maxHeight,
      menuItems,
      menuStyle,
      style,
      underlineStyle,
      valueLink,
      valueMember,
      ...other,
    } = this.props;

    const {
      anchorEl,
      open,
    } = this.state;

    const styles = this.getStyles();

    let value;
    let selectedIndex = this._isControlled() ? null : this.state.selectedIndex;

    if (menuItems && typeof selectedIndex === 'number') {
      warning(menuItems[selectedIndex],
        `SelectedIndex of ${selectedIndex} does not exist in menuItems.`);
    }

    if (valueMember && this._isControlled()) {
      value = this.props.hasOwnProperty('value') ? this.props.value : valueLink.value;
      if (menuItems && value !== null && value !== undefined) {
        for (let i = 0; i < menuItems.length; i++) {
          if (menuItems[i][valueMember] === value) {
            selectedIndex = i;
          }
        }
      }
    }

    let displayValue = '';
    if (menuItems) {
      const selectedItem = menuItems[selectedIndex];
      if (selectedItem) {
        displayValue = selectedItem[labelMember] || selectedItem[displayMember];
      }
    } else {
      React.Children.forEach(children, child => {
        if (value === child.props.value) {
          // This will need to be improved (in case primaryText is a node)
          displayValue = child.props.primaryText;
        }
      });
    }

    let index = 0;
    const menuItemElements = menuItems
      ? menuItems.map((item, idx) => (
          <MenuItem
            key={idx}
            primaryText={item[displayMember]}
            value={item[valueMember]}
            onTouchTap={this._onMenuItemTouchTap.bind(this, idx, item[valueMember])} />
        ))
      : React.Children.map(children, child => {
        const clone = React.cloneElement(child, {
          onTouchTap: this._onMenuItemTouchTap.bind(this, index, child.props.value),
        }, child.props.children);
        index += 1;
        return clone;
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
        style={this.prepareStyles(styles.root, open && styles.rootWhenOpen, style)}
      >
        <ClearFix style={this.mergeStyles(styles.control)} onTouchTap={this._onControlTouchTap}>
          <div style={this.prepareStyles(styles.label, open && styles.labelWhenOpen, labelStyle)}>
            {displayValue}
          </div>
          <DropDownArrow style={this.mergeStyles(styles.icon, iconStyle)}/>
          <div style={this.prepareStyles(styles.underline, underlineStyle)}/>
        </ClearFix>
        <Popover
          anchorOrigin={{horizontal: 'left', vertical: 'top'}}
          anchorEl={anchorEl}
          style={popoverStyle}
          animation={PopoverAnimationFromTop}
          open={open}
          onRequestClose={this._onMenuRequestClose} >
          <Menu
            maxHeight={maxHeight}
            desktop={true}
            value={value}
            style={menuStyle}
            >
            {menuItemElements}
          </Menu>
        </Popover>
      </div>
    );
  },

  _testDeprecations() {
    warning(!this.props.hasOwnProperty('displayMember'),
      'displayMember will be removed in favor of composability. refer to the documentation for more information');

    warning(!this.props.hasOwnProperty('labelMember'),
      'labelMember will be removed in favor of composability. refer to the documentation for more information');

    warning(!this.props.hasOwnProperty('labelStyle'),
      'labelStyle will be removed with labelMember.');

    warning(!this.props.hasOwnProperty('menuItems'),
      'menuItems will be removed in favor of composability. refer to the documentation for more information');

    warning(!this.props.hasOwnProperty('selectedIndex'),
      'selectedIndex will be removed. use value instead to control the component.');

    warning(!this.props.hasOwnProperty('valueLink'),
      'valueLink will be removed. use value and onChange');

    warning(!this.props.hasOwnProperty('valueMember'),
      'valueMember will be removed in favor of composability. refer to the documentation for more information');
  },

  _setWidth() {
    const el = this.refs.root;
    if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
      el.style.width = 'auto';
    }
  },

  _setSelectedIndex(index) {
    if (process.env.NODE_ENV !== 'production') {
      warning(index >= 0, 'Cannot set selectedIndex to a negative index.');
    }

    this.setState({selectedIndex: (index >= 0) ? index : 0});
  },

  _onControlTouchTap(event) {
    event.preventDefault();
    if (!this.props.disabled) {
      this.setState({
        open: !this.state.open,
        anchorEl: this.refs.root,
      });
    }
  },

  _onMenuItemTouchTap(key, payload, e) {
    const {
      onChange,
      menuItems,
      value,
      valueLink,
      valueMember,
    } = this.props;

    if (menuItems && (this.state.selectedIndex !== key || e.target.value !== value)) {
      const selectedItem = menuItems[key];
      if (selectedItem) {
        e.target.value = selectedItem[valueMember];
      }

      if (valueLink) {
        valueLink.requestChange(e.target.value);
      }
      else if (onChange) {
        onChange(e, key, payload);
      }
      this._onMenuRequestClose();
    } else if (onChange) {
      if (valueLink) {
        valueLink.requestChange(e.target.value);
      }
      else if (onChange) {
        onChange(e, key, payload);
      }
    }

    this.setState({
      selectedIndex: key,
      open: false,
    });
  },

  _onMenuRequestClose() {
    this.setState({
      open: false,
      anchorEl: null,
    });
  },

  _isControlled() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  },

});

export default DropDownMenu;
