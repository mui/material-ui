const React = require('react');
const ReactDOM = require('react-dom');
const StylePropable = require('./mixins/style-propable');
const Transitions = require('./styles/transitions');
const KeyCode = require('./utils/key-code');
const DropDownArrow = require('./svg-icons/navigation/arrow-drop-down');
const Paper = require('./paper');
const Menu = require('./menus/menu');
const MenuItem = require('./menus/menu-item');
const ClearFix = require('./clearfix');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');
const Popover = require('./popover/popover');


const DropDownMenu = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  // The nested styles for drop-down-menu are modified by toolbar and possibly
  // other user components, so it will give full access to its js styles rather
  // than just the parent.
  propTypes: {
    className: React.PropTypes.string,
    displayMember: React.PropTypes.string,
    valueMember: React.PropTypes.string,
    autoWidth: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    menuItemStyle: React.PropTypes.object,
    underlineStyle:React.PropTypes.object,
    iconStyle:React.PropTypes.object,
    labelStyle:React.PropTypes.object,
    selectedIndex: React.PropTypes.number,
    openImmediately: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      autoWidth: true,
      disabled: false,
      valueMember: 'payload',
      displayMember: 'text',
      openImmediately: false,
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

  getStyles(){
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
        transition: Transitions.easeOut(),
        lineHeight: spacing.desktopToolbarHeight + 'px',
        position: 'relative',
        paddingLeft: spacing.desktopGutter,
        paddingRight: spacing.desktopGutter,
        opacity: 1,
        width:'auto',
        color: disabled ? this.state.muiTheme.rawTheme.palette.disabledColor : this.state.muiTheme.rawTheme.palette.textColor,
      },
      underline: {
        borderTop: 'solid 1px ' + accentColor,
        margin: '-9px ' + spacing.desktopGutter + 'px',
      },
      menu: {
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
        opacity:1,
      },
      labelWhenOpen: {
        opacity: 0,
        top: spacing.desktopToolbarHeight / 2,
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
      onFocus,
      onBlur,
      style,
      displayMember,
      valueMember,
      valueLink,
      labelStyle,
      iconStyle,
      underlineStyle,
      menuItemStyle,
      ...other,
    } = this.props;

    let styles = this.getStyles();
    let selectedIndex = this._isControlled() ? null : this.state.selectedIndex;
    let displayValue = "";
    if (selectedIndex) {
      if (process.env.NODE_ENV !== 'production') {
        console.assert(!!this.props.menuItems[selectedIndex], 'SelectedIndex of ' + selectedIndex + ' does not exist in menuItems.');
      }
    }
    else if (valueMember && this._isControlled()) {
      let value = this.props.hasOwnProperty('value') ? this.props.value : valueLink.value;
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
      displayValue = selectedItem[displayMember];
    }

    let menuItems = this.props.menuItems.map((item, idx) => {
      return <MenuItem
        key={idx}
        primaryText={item[displayMember]}
        value={item[valueMember]}
        onClick={this._onMenuItemClick.bind(this, idx, item[valueMember])} />
    });

    return (
      <div
        {...other}
        ref="root"
        onKeyDown={this._onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        className={className}
        style={this.prepareStyles(
          styles.root,
          this.state.open && styles.rootWhenOpen,
          style)} >

          <div style={this.mergeStyles(styles.control)} onTouchTap={this._onControlClick}>
            <div style={this.prepareStyles(styles.label, labelStyle)}>
              {displayValue}
            </div>
            <DropDownArrow style={this.mergeStyles(styles.icon, iconStyle)}/>
            <div style={this.prepareStyles(styles.underline, underlineStyle)}/>
          </div>
          <Popover
            anchorOrigin={{horizontal:'left', vertical:'top'}}
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onRequestClose={this._onMenuRequestClose} >
            <Menu
              ref="menuItems"
              autoWidth={this.props.autoWidth}
              desktop={true}
              selectedIndex={selectedIndex}
              style={styles.menu}
              menuItemStyle={this.mergeStyles(styles.menuItem, this.props.menuItemStyle)}
              hideable={true}
              onRequestClose={this._onMenuRequestClose}
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

  _onControlClick() {
    if (!this.props.disabled) {
      this.setState({
        open: !this.state.open,
        anchorEl: ReactDOM.findDOMNode(this),
      });
    }
  },

  _onKeyDown(e) {
    switch(e.which) {
      case KeyCode.UP:
        if (!this.state.open) {
          this._selectPreviousItem();
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
            this._selectNextItem();
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

  _onMenuItemClick(key, payload, e) {
    if (this.props.onChange && this.state.selectedIndex !== key) {
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
      anchorEl:null,
    });
  },

  _onMenuRequestClose() {
    this.setState({
      open:false,
      anchorEl:null,
    });
  },

  _selectPreviousItem() {
    this.setState({selectedIndex: Math.max(this.state.selectedIndex - 1, 0)});
  },

  _selectNextItem() {
    this.setState({selectedIndex: Math.min(this.state.selectedIndex + 1, this.props.menuItems.length - 1)});
  },

  _isControlled() {
    return this.props.hasOwnProperty('value') ||
      this.props.hasOwnProperty('valueLink');
  },

});

module.exports = DropDownMenu;
