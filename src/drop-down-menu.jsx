var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ClickAwayable = require('./mixins/click-awayable');
var DropDownArrow = require('./svg-icons/drop-down-arrow');
var KeyLine = require('./utils/key-line');
var Paper = require('./paper');
var Menu = require('./menu/menu');
var ClearFix = require('./clearfix');
var DropDownMenu = React.createClass({

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  // The nested styles for drop-down-menu are modified by toolbar and possibly 
  // other user components, so it will give full access to its js styles rather 
  // than just the parent. 
  propTypes: {
    className: React.PropTypes.string,
    autoWidth: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    styleControl: React.PropTypes.object,
    styleControlBg: React.PropTypes.object,
    styleIcon: React.PropTypes.object,
    styleIconHover: React.PropTypes.object,
    styleLabel: React.PropTypes.object,
    styleUnderline: React.PropTypes.object,
    styleMenuItem: React.PropTypes.object,
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
    }
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

  /** Styles */
  _main: function() {
    var style = {
      transition: Transitions.easeOut(),
      position: 'relative',
      display: 'inline-block',
      height: this.getSpacing().desktopToolbarHeight,
      fontSize: this.getSpacing().desktopDropDownMenuFontSize
    };

    if (this.state.open) style.opacity = 1;

    return this.mergeAndPrefix(style);
  },

  _control: function() {
    var style = {
      cursor: 'pointer',
      position: 'static',
      height: '100%',
    };

    if (this.props.styleControl) this.mergeAndPrefix(style, this.props.styleControl);

    return style;
  },

  _controlBg: function() { 
    var style = {
      transition: Transitions.easeOut(),
      backgroundColor: this.context.theme.component.menu.backgroundColor,
      height: '100%',
      width: '100%',
      opacity: (this.state.open) ? 0 : 
               (this.state.isHovered) ? 1 : 0,
    };

    if (this.props.styleControlBg) style = this.mergeAndPrefix(style, this.props.styleControlBg);
  
    return style;
  },

  _icon: function() {
    var style = {
      position: 'absolute',
      top: ((this.getSpacing().desktopToolbarHeight - 24) / 2),
      right: this.getSpacing().desktopGutterLess,
      fill: this.context.theme.component.dropDownMenu.accentColor,
    };

    if (this.props.styleIcon) style = this.mergeAndPrefix(style, this.props.styleIcon);
  
    return style;
  },

  _label: function() {
    var style = {
      transition: Transitions.easeOut(),
      lineHeight: this.getSpacing().desktopToolbarHeight + 'px',
      position: 'absolute',
      paddingLeft: this.getSpacing().desktopGutter,
      top: 0,
      opacity: 1,
      color: this.getTextColor()
    };

    if (this.state.open) {
      style = this.mergeAndPrefix(style, {
        opacity: 0,
        top: this.getSpacing().desktopToolbarHeight / 2,
      });
    }

    if (this.props.styleLabel) style = this.mergeAndPrefix(style, this.props.styleLabel);
  
    return style;
  },

  _underline: function() {
    var style = {
      borderTop: 'solid 1px ' + this.context.theme.component.dropDownMenu.accentColor,
      margin: '0 ' + this.getSpacing().desktopGutter + 'px',
    };

    if (this.props.styleUnderline) style =this.mergeAndPrefix(style, this.props.styleUnderline);
  
    return style;
  },

  _menuItem: function() {
    var style = {
      paddingRight: this.getSpacing().iconSize + 
                    this.getSpacing().desktopGutterLess + 
                    this.getSpacing().desktopGutterMini,
      height: this.getSpacing().desktopDropDownMenuItemHeight,
      lineHeight: this.getSpacing().desktopDropDownMenuItemHeight + 'px',
      whiteSpace: 'nowrap',
    };

    if (this.props.styleMenuItem) style = this.mergeAndPrefix(style, this.props.styleMenuItem);
  
    return style;
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  getTextColor: function() {
    return this.context.theme.palette.textColor;
  },

  render: function() {
    return (
      <div 
        style={this._main()} 
        className={this.props.className} 
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}>

          <ClearFix style={this._control()} onClick={this._onControlClick}>
            <Paper style={this._controlBg()} zDepth={0} />
            <div style={this._label()}>
              {this.props.menuItems[this.state.selectedIndex].text}
            </div>
            <DropDownArrow style={this._icon()} hoverStyle={this.props.styleIconHover}/>
            <div style={this._underline()}/>
          </ClearFix>

          <Menu
            ref="menuItems"
            autoWidth={this.props.autoWidth}
            selectedIndex={this.state.selectedIndex}
            menuItems={this.props.menuItems}
            menuItemStyle={this._menuItem()}
            hideable={true}
            visible={this.state.open}
            onItemClick={this._onMenuItemClick} />
      </div>
    );
  },

  _setWidth: function() {
    var el = this.getDOMNode(),
      menuItemsDom = this.refs.menuItems.getDOMNode();

    el.style.width = menuItemsDom.offsetWidth + 'px';
  },

  _setSelectedIndex: function(props) {
    var selectedIndex = props.selectedIndex;

    if (process.NODE_ENV !== 'production' && selectedIndex < 0) {
      console.warn('Cannot set selectedIndex to a negative index.', selectedIndex);
    }

    this.setState({selectedIndex: (selectedIndex > -1) ? selectedIndex : 0});
  },

  _onControlClick: function(e) {
    this.setState({ open: !this.state.open });
  },

  _onMenuItemClick: function(e, key, payload) {
    if (this.props.onChange && this.state.selectedIndex !== key) this.props.onChange(e, key, payload);
    this.setState({
      selectedIndex: key,
      open: false
    });
  },

  _handleMouseOver: function(e) {
    this.setState({isHovered: true});
  },

  _handleMouseOut: function(e) {
    this.setState({isHovered: false});
  }

});

module.exports = DropDownMenu;