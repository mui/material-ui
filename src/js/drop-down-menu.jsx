var React = require('react');
var Classable = require('./mixins/classable');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var ClickAwayable = require('./mixins/click-awayable');
var DropDownArrow = require('./svg-icons/drop-down-arrow');
var KeyLine = require('./utils/key-line');
var Paper = require('./paper');
var Menu = require('./menu');

var DropDownMenu = React.createClass({

  mixins: [Classable, StylePropable, ClickAwayable],

  // The nested styles for drop-down-menu are modified by toolbar and possibly 
  // other user components, so it will give full access to its js styles rather 
  // than just the parent. 
  propTypes: {
    autoWidth: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    styleControl: React.PropTypes.object,
    styleControlBg: React.PropTypes.object,
    styleIcon: React.PropTypes.object,
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
      hovered: true,
      selectedIndex: this.props.selectedIndex || 0
    }
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  componentDidMount: function() {
    if (this.props.autoWidth) this._setWidth();
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.hasOwnProperty('selectedIndex')) {
      this.setState({selectedIndex: nextProps.selectedIndex});
    }
  },

  /** Styles */
  _main: function() {
    var style = {
      transition: Transitions.easeOut(),
      position: 'relative',
      display: 'inline-block',
      height: CustomVariables.spacing.desktopToolbarHeight,
      fontSize: CustomVariables.spacing.desktopDropDownMenuFontSize
    };

    if (this.state.open) style.opacity = 1;

    return this.mergeAndPrefix(style);
  },

  _control: function() {
    return this.mergeAndPrefix({
      cursor: 'pointer',
      // .clearfix();
      height: '100%',
    }, this.props.styleControl);
  },

  _controlBg: function() { 
    return this.mergeAndPrefix({
      transition: Transitions.easeOut(),
      backgroundColor: CustomVariables.menuBackgroundColor,
      height: '100%',
      width: '100%',
      opacity: (this.state.open) ? 0 : 
               (this.state.hovered) ? 1 : 0,
    }, this.props.styleControlBg);
  },

  _icon: function() {
    return this.mergeAndPrefix({
      position: 'absolute',
      top: ((CustomVariables.spacing.desktopToolbarHeight - 24) / 2),
      right: CustomVariables.spacing.desktopGutterLess,
      fill: CustomVariables.dropDownMenuIconColor,
    }, this.props.styleIcon);
  },

  _label: function() {
    var style = {
      lineHeight: CustomVariables.spacing.desktopToolbarHeight + 'px',
      position: 'absolute',
      paddingLeft: CustomVariables.spacing.desktopGutter,
      top: 0,
      opacity: 1,
    };

    if (this.state.open) {
      style = this.mergeAndPrefix(style, {
        opacity: 0,
        top: CustomVariables.spacing.desktopToolbarHeight / 2,
      });
    }

    return this.mergeAndPrefix(style, this.props.styleLabel);
  },

  _underline: function() {
    return this.mergeAndPrefix({
      borderTop: 'solid 1px ' + CustomVariables.borderColor,
      margin: '0 ' + CustomVariables.spacing.desktopGutter + 'px',
    }, this.props.styleUnderline);
  },

  _menuItem: function() {
    return this.mergeAndPrefix({
      paddingRight: CustomVariables.spacing.iconSize + 
                    CustomVariables.spacing.desktopGutterLess + 
                    CustomVariables.spacing.desktopGutterMini,
      height: CustomVariables.spacing.desktopDropDownMenuItemHeight,
      lineHeight: CustomVariables.spacing.desktopDropDownMenuItemHeight + 'px',
      whiteSpace: 'nowrap',
    }, this.props.styleMenuItem);
  },


  render: function() {
    var classes = this.getClasses('mui-drop-down-menu', {
      'mui-open': this.state.open
    });

    return (
      <div style={this._main()} onMouseOver={this._handleMouseOver} onMouseOut={this._handleMouseOut}>
        <div style={this._control()} onClick={this._onControlClick}>
          <Paper style={this._controlBg()} zDepth={0} />
          <div style={this._label()}>
            {this.props.menuItems[this.state.selectedIndex].text}
          </div>
          <DropDownArrow style={this._icon()} />
          <div style={this._underline()}/>
        </div>
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

  // @todo: WIDTH DIFFERENCE 
  _setWidth: function() {
    var el = this.getDOMNode(),
      menuItemsDom = this.refs.menuItems.getDOMNode();

    el.style.width = menuItemsDom.offsetWidth + 'px';
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
    this.setState({hovered: true});
  },

  _handleMouseOut: function(e) {
    this.setState({hovered: false});
  }

});

module.exports = DropDownMenu;