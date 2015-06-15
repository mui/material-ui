var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ClickAwayable = require('./mixins/click-awayable');
var DropDownArrow = require('./svg-icons/drop-down-arrow');
var Paper = require('./paper');
var Menu = require('./menu/menu');
var ClearFix = require('./clearfix');
var DropDownMenu = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  // The nested styles for drop-down-menu are modified by toolbar and possibly
  // other user components, so it will give full access to its js styles rather
  // than just the parent.
  propTypes: {
    className: React.PropTypes.string,
    autoWidth: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    menuItemStyle: React.PropTypes.object,
    selectedIndex: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      autoWidth: true
    };
  },

  getInitialState: function() {
    return {
      open: false,
      isHovered: false,
      selectedIndex: this.props.selectedIndex || 0
    };
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  componentDidMount: function() {
    if (this.props.autoWidth) this._setWidth();
    if (this.props.hasOwnProperty('selectedIndex')) this._setSelectedIndex(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.hasOwnProperty('selectedIndex')) {
      this._setSelectedIndex(nextProps);
    }
 },

  getSpacing: function() {
    return this.context.muiTheme.spacing;
  },

  getTextColor: function() {
    return this.context.muiTheme.palette.textColor;
  },

  getStyles: function(){
    var accentColor = this.context.muiTheme.component.dropDownMenu.accentColor;
    var backgroundColor = this.context.muiTheme.component.menu.backgroundColor;
    var styles = {
      root: {
        transition: Transitions.easeOut(),
        position: 'relative',
        display: 'inline-block',
        height: this.getSpacing().desktopToolbarHeight,
        fontSize: this.getSpacing().desktopDropDownMenuFontSize
      },
      control: {
        cursor: 'pointer',
        position: 'static',
        height: '100%'
      },
      controlBg: {
        transition: Transitions.easeOut(),
        backgroundColor: backgroundColor,
        height: '100%',
        width: '100%',
        opacity: (this.state.open) ? 0 :
                 (this.state.isHovered) ? 1 : 0
      },
      icon: {
        position: 'absolute',
        top: ((this.getSpacing().desktopToolbarHeight - 24) / 2),
        right: this.getSpacing().desktopGutterLess,
        fill: this.context.muiTheme.component.dropDownMenu.accentColor
      },
      label: {
        transition: Transitions.easeOut(),
        lineHeight: this.getSpacing().desktopToolbarHeight + 'px',
        position: 'absolute',
        paddingLeft: this.getSpacing().desktopGutter,
        top: 0,
        opacity: 1,
        color: this.getTextColor()
      },
      underline: {
        borderTop: 'solid 1px ' + accentColor,
        margin: '-1px ' + this.getSpacing().desktopGutter + 'px'
      },
      menuItem: {
        paddingRight: this.getSpacing().iconSize +
                      this.getSpacing().desktopGutterLess +
                      this.getSpacing().desktopGutterMini,
        height: this.getSpacing().desktopDropDownMenuItemHeight,
        lineHeight: this.getSpacing().desktopDropDownMenuItemHeight + 'px',
        whiteSpace: 'nowrap'
      },
      rootWhenOpen: {
        opacity: 1
      },
      labelWhenOpen: {
        opacity: 0,
        top: this.getSpacing().desktopToolbarHeight / 2
      }
    };
    return styles;
  },

  render: function() {
    var styles = this.getStyles();

    if (process.env.NODE_ENV !== 'production') {
      console.assert(!!this.props.menuItems[this.state.selectedIndex], 'SelectedIndex of ' + this.state.selectedIndex + ' does not exist in menuItems.');
    }

    return (
      <div
        ref="root"
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        className={this.props.className}
        style={this.mergeAndPrefix(
          styles.root,
          this.state.open && styles.rootWhenOpen,
          this.props.style)} >

          <ClearFix style={this.mergeAndPrefix(styles.control)} onTouchTap={this._onControlClick}>
            <Paper style={this.mergeAndPrefix(styles.controlBg)} zDepth={0} />
            <div style={this.mergeAndPrefix(styles.label, this.state.open && styles.labelWhenOpen)}>
              {this.props.menuItems[this.state.selectedIndex].text}
            </div>
            <DropDownArrow style={this.mergeAndPrefix(styles.icon)}/>
            <div style={this.mergeAndPrefix(styles.underline)}/>
          </ClearFix>

          <Menu
            ref="menuItems"
            autoWidth={this.props.autoWidth}
            selectedIndex={this.state.selectedIndex}
            menuItems={this.props.menuItems}
            menuItemStyle={this.mergeAndPrefix(styles.menuItem, this.props.menuItemStyle)}
            hideable={true}
            visible={this.state.open}
            onItemTap={this._onMenuItemClick} />
      </div>
    );
  },

  _setWidth: function() {
    var el = React.findDOMNode(this);
    var menuItemsDom = React.findDOMNode(this.refs.menuItems);
    if (!this.props.style || !this.props.style.hasOwnProperty('width')) {
      el.style.width = menuItemsDom.offsetWidth + 'px';
    }
  },

  _setSelectedIndex: function(props) {
    var selectedIndex = props.selectedIndex;

    if (process.env.NODE_ENV !== 'production' && selectedIndex < 0) {
      console.warn('Cannot set selectedIndex to a negative index.', selectedIndex);
    }

    this.setState({selectedIndex: (selectedIndex > -1) ? selectedIndex : 0});
  },

  _onControlClick: function() {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange && this.state.selectedIndex !== key) this.props.onChange(e, key, payload);
    this.setState({
      selectedIndex: key,
      open: false
    });
  },

  _handleMouseOver: function() {
    this.setState({isHovered: true});
  },

  _handleMouseOut: function() {
    this.setState({isHovered: false});
  }

});

module.exports = DropDownMenu;
