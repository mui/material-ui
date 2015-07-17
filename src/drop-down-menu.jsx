let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let KeyCode = require('./utils/key-code');
let DropDownArrow = require('./svg-icons/navigation/arrow-drop-down');
let Paper = require('./paper');
let Menu = require('./menu/menu');
let ClearFix = require('./clearfix');


let DropDownMenu = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  // The nested styles for drop-down-menu are modified by toolbar and possibly
  // other user components, so it will give full access to its js styles rather
  // than just the parent.
  propTypes: {
    className: React.PropTypes.string,
    displayMember: React.PropTypes.string,
    valueMember: React.PropTypes.string,
    autoWidth: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    menuItemStyle: React.PropTypes.object,
    underlineStyle:React.PropTypes.object,
    iconStyle:React.PropTypes.object,
    labelStyle:React.PropTypes.object,
    selectedIndex: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      autoWidth: true,
      valueMember: 'payload',
      displayMember: 'text',
    };
  },

  getInitialState() {
    return {
      open: false,
      isHovered: false,
      selectedIndex: (this.props.hasOwnProperty('value') ||
        this.props.hasOwnProperty('valueLink')) ? null : (this.props.selectedIndex || 0),
    };
  },

  componentDidMount() {
    if (this.props.autoWidth) this._setWidth();
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.autoWidth) this._setWidth();
    if (nextProps.hasOwnProperty('value') || nextProps.hasOwnProperty('valueLink')) {
      return;
    }
    else if (nextProps.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps);
    }
  },

  getStyles(){
    let zIndex = 5; // As AppBar
    let spacing = this.context.muiTheme.spacing;
    let accentColor = this.context.muiTheme.component.dropDownMenu.accentColor;
    let backgroundColor = this.context.muiTheme.component.menu.backgroundColor;
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
        cursor: 'pointer',
        position: 'static',
        height: '100%',
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
        fill: this.context.muiTheme.component.dropDownMenu.accentColor,
      },
      label: {
        transition: Transitions.easeOut(),
        lineHeight: spacing.desktopToolbarHeight + 'px',
        position: 'absolute',
        paddingLeft: spacing.desktopGutter,
        top: 0,
        opacity: 1,
        color: this.context.muiTheme.palette.textColor,
      },
      underline: {
        borderTop: 'solid 1px ' + accentColor,
        margin: '-1px ' + spacing.desktopGutter + 'px',
      },
      menu: {
        zIndex: zIndex + 1,
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
        top: spacing.desktopToolbarHeight / 2,
      },
      overlay: {
        height: '100%',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: zIndex,
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
    let _this = this;
    let styles = this.getStyles();
    let selectedIndex = this.state.selectedIndex;
    let displayValue = "";
    if (selectedIndex) {
      if (process.env.NODE_ENV !== 'production') {
        console.assert(!!this.props.menuItems[selectedIndex], 'SelectedIndex of ' + selectedIndex + ' does not exist in menuItems.');
      }
    }
    else {
      if (this.props.valueMember && (this.props.valueLink || this.props.value)) {
        let value = this.props.value || this.props.valueLink.value;
        for (let i = 0; i < this.props.menuItems.length; i++) {
          if (this.props.menuItems[i][this.props.valueMember] === value) {
            selectedIndex = i;
          }
        }
      }
    }

    let selectedItem = this.props.menuItems[selectedIndex];
    if (selectedItem) {
      displayValue = selectedItem[this.props.displayMember];
    }

    let menuItems = this.props.menuItems.map((item) => {
      item.text = item[_this.props.displayMember];
      item.payload = item[_this.props.valueMember];
      return item;
    });

    return (
      <div
        ref="root"
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
        onKeyDown={this._onKeyDown}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        className={this.props.className}
        style={this.mergeAndPrefix(
          styles.root,
          this.state.open && styles.rootWhenOpen,
          this.props.style)} >

          <ClearFix style={this.mergeAndPrefix(styles.control)} onTouchTap={this._onControlClick}>
            <Paper style={this.mergeAndPrefix(styles.controlBg)} zDepth={0} />
            <div style={this.mergeAndPrefix(styles.label, this.state.open && styles.labelWhenOpen, this.props.labelStyle)}>
              {displayValue}
            </div>
            <DropDownArrow style={this.mergeAndPrefix(styles.icon, this.props.iconStyle)}/>
            <div style={this.mergeAndPrefix(styles.underline, this.props.underlineStyle)}/>
          </ClearFix>

          <Menu
            ref="menuItems"
            autoWidth={this.props.autoWidth}
            selectedIndex={selectedIndex}
            menuItems={menuItems}
            style={styles.menu}
            menuItemStyle={this.mergeAndPrefix(styles.menuItem, this.props.menuItemStyle)}
            hideable={true}
            visible={this.state.open}
            onRequestClose={this._onMenuRequestClose}
            onItemTap={this._onMenuItemClick} />
          {this.state.open && <div style={styles.overlay} onTouchTap={this._handleOverlayTouchTap} />}
      </div>
    );
  },

  _setWidth() {
    let el = React.findDOMNode(this);
    let menuItemsDom = React.findDOMNode(this.refs.menuItems);
    if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
      el.style.width = 'auto';
      el.style.width = menuItemsDom.offsetWidth + 'px';
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
    this.setState({ open: !this.state.open });
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

  _onMenuItemClick(e, key, payload) {
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
    }

    this.setState({
      selectedIndex: key,
      value: e.target.value,
      open: false,
      isHovered: false,
    });
  },

  _onMenuRequestClose() {
    this.setState({open:false});
  },

  _handleMouseEnter() {
    this.setState({isHovered: true});
  },

  _handleMouseLeave() {
    this.setState({isHovered: false});
  },

  _selectPreviousItem() {
    this.setState({selectedIndex: Math.max(this.state.selectedIndex - 1, 0)});
  },

  _selectNextItem() {
    this.setState({selectedIndex: Math.min(this.state.selectedIndex + 1, this.props.menuItems.length - 1)});
  },

  _handleOverlayTouchTap() {
    this.setState({
      open: false,
    });
  },

});

module.exports = DropDownMenu;
