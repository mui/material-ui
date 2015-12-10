import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import KeyCode from './utils/key-code';
import DropDownArrow from './svg-icons/navigation/arrow-drop-down';
import Menu from './menus/menu';
import MenuItem from './menus/menu-item';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import Paper from './paper';
import ClearFix from './clearfix';
import ThemeManager from './styles/theme-manager';
import Popover from './popover/popover';
import PopoverAnimationFromTop from './popover/popover-animation-from-top';

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
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    displayMember: React.PropTypes.string,
    iconStyle:React.PropTypes.object,
    labelMember: React.PropTypes.string,
    labelStyle:React.PropTypes.object,
    maxHeight:React.PropTypes.number,
    menuItemStyle: React.PropTypes.object,
    menuItems: React.PropTypes.array.isRequired,
    menuStyle: React.PropTypes.object,
    onChange: React.PropTypes.func,
    openImmediately: React.PropTypes.bool,
    selectedIndex: React.PropTypes.number,
    style: React.PropTypes.object,
    underlineStyle:React.PropTypes.object,
    value: React.PropTypes.any,
    valueLink: React.PropTypes.object,
    valueMember: React.PropTypes.string,
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
    return {
      open: this.props.openImmediately,
      selectedIndex: this._isControlled() ? null : (this.props.selectedIndex || 0),
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props);
  },

  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    if (this.props.autoWidth) this._setWidth();
    if (nextProps.hasOwnProperty('value') || nextProps.hasOwnProperty('valueLink')) {
      return;
    }
    else if (nextProps.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps);
    }
  },

  getStyles() {
    const {disabled} = this.props;
    let zIndex = 5; // As AppBar
    let spacing = this.state.muiTheme.rawTheme.spacing;
    let accentColor = this.state.muiTheme.dropDownMenu.accentColor;
    let backgroundColor = this.state.muiTheme.menu.backgroundColor;
    let styles = {
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
        width:'100%',
      },
      controlBg: {
        transition: Transitions.easeOut(),
        backgroundColor: backgroundColor,
        height: '100%',
        width: '100%',
        opacity: 0,
      },
      icon: {
        position: 'absolute',
        top: ((spacing.desktopToolbarHeight - 24) / 2),
        right: spacing.desktopGutterLess,
        fill: this.state.muiTheme.dropDownMenu.accentColor,
      },
      label: {
        lineHeight: spacing.desktopToolbarHeight + 'px',
        position: 'relative',
        paddingLeft: spacing.desktopGutter,
        paddingRight: spacing.iconSize +
                      spacing.desktopGutterLess +
                      spacing.desktopGutterMini,
        top: 0,
        opacity: 1,
        color: disabled ? this.state.muiTheme.rawTheme.palette.disabledColor
          : this.state.muiTheme.rawTheme.palette.textColor,
      },
      underline: {
        position: 'absolute',
        borderTop: 'solid 1px ' + accentColor,
        margin: '-1px ' + spacing.desktopGutter + 'px',
        bottom:1,
        left:0,
        right:0,
      },
      menu: {
        zIndex: zIndex + 1,
        position:'relative',
      },
      menuItem: {
        paddingRight: spacing.iconSize +
                      spacing.desktopGutterLess +
                      spacing.desktopGutterMini,
        height: spacing.desktopDropDownMenuItemHeight,
        lineHeight: spacing.desktopDropDownMenuItemHeight + 'px',
        whiteSpace: 'nowrap',
      },
      rootWhenOpen: {
        opacity: 1,
      },
      labelWhenOpen: {
        opacity: 0,
        top: (spacing.desktopToolbarHeight / 8),
      },
    };

    return styles;
  },

  getInputNode() {
    let root = this.refs.root;
    let item = this.props.menuItems[this.state.selectedIndex];
    if (item) {
      root.value = item[this.props.displayMember];
    }

    return root;
  },

  render() {
    const {
      autoWidth,
      className,
      displayMember,
      iconStyle,
      menuStyle,
      labelMember,
      labelStyle,
      maxHeight,
      menuItemStyle,
      style,
      underlineStyle,
      valueLink,
      valueMember,
      ...other,
    } = this.props;
    let value;
    let styles = this.getStyles();
    let popoverStyle;
    let selectedIndex = this._isControlled() ? null : this.state.selectedIndex;
    let displayValue = '';
    if (selectedIndex) {
      if (process.env.NODE_ENV !== 'production') {
        console.assert(!!this.props.menuItems[selectedIndex], 'SelectedIndex of ' +
          selectedIndex + ' does not exist in menuItems.');
      }
    }
    else if (valueMember && this._isControlled()) {
      value = this.props.hasOwnProperty('value') ? this.props.value : valueLink.value;
      if (value !== null && value !== undefined) {
        for (let i = 0; i < this.props.menuItems.length; i++) {
          if (this.props.menuItems[i][valueMember] === value) {
            selectedIndex = i;
          }
        }
      }
    }
    let selectedItem = this.props.menuItems[selectedIndex];
    if (selectedItem) {
      displayValue = selectedItem[labelMember] || selectedItem[displayMember];
    }

    let menuItems = this.props.menuItems.map((item, idx) =>
      <MenuItem
        key={idx}
        primaryText={item[displayMember]}
        value={item[valueMember]}
        onTouchTap={this._onMenuItemTouchTap.bind(this, idx, item[valueMember])} />
    );

    if (this.state.anchorEl && !autoWidth) {
      popoverStyle = {width:this.state.anchorEl.clientWidth};
    }

    return (
      <div
        {...other}
        ref="root"
        onKeyDown={this._onKeyDown}
        className={className}
        style={this.prepareStyles(
          styles.root,
          this.state.open && styles.rootWhenOpen,
          style)} >
          <ClearFix style={this.mergeStyles(styles.control)} onTouchTap={this._onControlTouchTap}>
            <div style={this.prepareStyles(styles.label, this.state.open && styles.labelWhenOpen, labelStyle)}>
              {displayValue}
            </div>
            <Paper style={this.mergeStyles(styles.controlBg)} zDepth={0} />
            <DropDownArrow style={this.mergeStyles(styles.icon, iconStyle)}/>
            <div style={this.prepareStyles(styles.underline, underlineStyle)}/>
          </ClearFix>
          <Popover
            anchorOrigin={{horizontal:'left', vertical:'top'}}
            anchorEl={this.state.anchorEl}
            style={popoverStyle}
            animation={PopoverAnimationFromTop}
            open={this.state.open}
            onRequestClose={this._onMenuRequestClose} >
            <Menu
              maxHeight={maxHeight}
              desktop={true}
              value={value}
              style={this.mergeStyles(styles.menu, menuStyle)}
              menuItemStyle={this.mergeStyles(styles.menuItem, this.props.menuItemStyle)}
              >
              {menuItems}
            </Menu>
          </Popover>
        </div>
    );
  },

  _setWidth() {
    let el = ReactDOM.findDOMNode(this);
    if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
      el.style.width = 'auto';
    }
  },

  _setSelectedIndex(props) {
    let selectedIndex = props.selectedIndex;

    if (process.env.NODE_ENV !== 'production' && selectedIndex < 0) {
      console.warn('Cannot set selectedIndex to a negative index.', selectedIndex);
    }

    this.setState({selectedIndex: (selectedIndex > -1) ? selectedIndex : 0});
  },

  _onControlTouchTap(event) {
    event.preventDefault();
    if (!this.props.disabled) {
      this.setState({
        open: !this.state.open,
        anchorEl: ReactDOM.findDOMNode(this),
      });
    }
  },

  _onKeyDown(e) {
    switch (e.which) {
      case KeyCode.UP:
        if (!this.state.open) {
          this._selectPreviousItem(e);
        }
        else {
          if (e.altKey) {
            this.setState({open:false});
          }
        }
        break;
      case KeyCode.DOWN:
        if (!this.state.open) {
          if (e.altKey) {
            this.setState({open:true});
          }
          else {
            this._selectNextItem(e);
          }
        }
        break;
      case KeyCode.ENTER:
      case KeyCode.SPACE:
        this.setState({open:true});
        break;
      default:
        return; //important
    }
    e.preventDefault();
  },

  _onMenuItemTouchTap(key, payload, e) {
    if (this.props.onChange && this.state.selectedIndex !== key || e.target.value !== this.props.value) {
      let selectedItem = this.props.menuItems[key];
      if (selectedItem) {
        e.target.value = selectedItem[this.props.valueMember];
      }

      if (this.props.valueLink) {
        this.props.valueLink.requestChange(e.target.value);
      }
      else {
        this.props.onChange(e, key, payload);
      }
      this._onMenuRequestClose();
    }

    this.setState({
      selectedIndex: key,
      value: e.target.value,
      open: false,
    });
  },

  _onMenuRequestClose() {
    this.setState({
      open:false,
      anchorEl:null,
    });
  },

  _selectPreviousItem(e) {
    const index = Math.max(this.state.selectedIndex - 1, 0);
    this.setState({selectedIndex: index});
    if (this.props.onChange) {
      this.props.onChange(e, index, this.props.menuItems[index]);
    }
  },

  _selectNextItem(e) {
    const index = Math.min(this.state.selectedIndex + 1, this.props.menuItems.length - 1);
    this.setState({selectedIndex: index});
    if (this.props.onChange) {
      this.props.onChange(e, index, this.props.menuItems[index]);
    }
  },

  _isControlled() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  },

});

export default DropDownMenu;
