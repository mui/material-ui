var React = require('react');
var Classable = require('./mixins/classable');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var ColorManipulator = require('./utils/color-manipulator');
var EnhancedButton = require('./enhanced-button');
var FontIcon = require('./font-icon');
var Paper = require('./paper');

var RaisedButton = React.createClass({

  mixins: [Classable, StylePropable],

  propTypes: {
    className: React.PropTypes.string,
    iconClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    innerClassName: React.PropTypes.string,
    innerStyle: React.PropTypes.object,
    mini: React.PropTypes.bool,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    secondary: React.PropTypes.bool
  },

  getInitialState: function() {
    var zDepth = this.props.disabled ? 0 : 2;
    return {
      zDepth: zDepth,
      initialZDepth: zDepth,
      hovered: false,
    };
  },

  componentDidMount: function() {
    if (this.props.iconClassName && this.props.children) {
      var warning = 'You have set both an iconClassName and a child icon. ' +
                    'It is recommended you use only one method when adding ' +
                    'icons to FloatingActionButtons.';
      console.warn(warning);
    }
  },


  /** Styles */

  _getBackgroundColor: function() {
    return  this.props.disabled ? CustomVariables.floatingActionButtonDisabledColor :
            this.props.secondary ? CustomVariables.floatingActionButtonSecondaryColor :
            CustomVariables.floatingActionButtonColor; 
  },

  _main: function() {
    return this.mergeAndPrefix({
      transition: Transitions.easeOut(),
      display: 'inline-block',
    }); 
  },

  _icon: function() {
    var style = {
      lineHeight: CustomVariables.floatingActionButtonSize + 'px',
      fill: CustomVariables.floatingActionButtonIconColor,
      color:  this.props.disabled ? CustomVariables.floatingActionButtonDisabledTextColor :
              this.props.secondary ? CustomVariables.floatingActionButtonSecondaryIconColor :
              CustomVariables.floatingActionButtonIconColor,
    };

    if (this.props.mini) style.lineHeight = CustomVariables.floatingActionButtonMiniSize + 'px';

    return this.mergeAndPrefix(style, this.props.iconStyle); 
  },

  _overlay: function() {
    var style = {
      transition: Transitions.easeOut(),
      top: 0,
    };

    if (this.state.hovered && !this.props.disabled) {
      style.backgroundColor = ColorManipulator.fade(this._icon().color, 0.4);
    }

    return style;
  },

  _container: function() {
    var style = {
      transition: Transitions.easeOut(),
      position: 'relative',
      height: CustomVariables.floatingActionButtonSize,
      width: CustomVariables.floatingActionButtonSize,
      padding: 0,
      overflow: 'hidden',
      backgroundColor: this._getBackgroundColor(),
      borderRadius: '50%',

      //This is need so that ripples do not bleed
      //past border radius.
      //See: http://stackoverflow.com/questions/17298739/css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
      transform: 'translate3d(0, 0, 0)',
    }; 

    if (this.props.mini) {
      style = this.mergeAndPrefix(style, {
        height: CustomVariables.floatingActionButtonMiniSize,
        width: CustomVariables.floatingActionButtonMiniSize,
      });
    }

    return style;
  },

  render: function() {
    var {
      icon,
      mini,
      secondary,
      ...other } = this.props;

    var icon;
    if (this.props.iconClassName) icon = <FontIcon className={this.props.iconClassName} style={this._icon()}/>

    var rippleColor = this._icon().color;

    // TODO: Pass innerStyle prop to Paper when it is created during it's refactoring.
    return (
      <Paper
        style={this._main()}
        innerClassName={this.props.innerClassName}
        zDepth={this.state.zDepth}
        circle={true}>

        <EnhancedButton {...other}
          ref="container"
          style={this._container()}
          onMouseDown={this._handleMouseDown}
          onMouseUp={this._handleMouseUp}
          onMouseOut={this._handleMouseOut}
          onMouseOver={this._handleMouseOver}
          onTouchStart={this._handleTouchStart}
          onTouchEnd={this._handleTouchEnd}
          focusRippleColor={rippleColor}
          touchRippleColor={rippleColor}
          onKeyboardFocus={this._handleKeyboardFocus}>
            <div ref="overlay" style={this._overlay()} >
              {icon}
              {this.props.children}
            </div>
        </EnhancedButton>
      </Paper>
    );
  },

  _handleMouseDown: function(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
    }
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _handleMouseUp: function(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  },

  _handleMouseOut: function(e) {
    if (!this.refs.container.isKeyboardFocused()) this.setState({ zDepth: this.state.initialZDepth, hovered: false });
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleMouseOver: function(e) {
    if (!this.refs.container.isKeyboardFocused()) this.setState({hovered: true});
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleTouchStart: function(e) {
    this.setState({ zDepth: this.state.initialZDepth + 1 });
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleTouchEnd: function(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  },

  _handleKeyboardFocus: function(keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
      this.refs.overlay.getDOMNode().style.backgroundColor = ColorManipulator.fade(this._icon().color, 0.4);
    } else if (!this.state.hovered) {
      this.setState({ zDepth: this.state.initialZDepth });
      this.refs.overlay.getDOMNode().style.backgroundColor = 'transparent';
    }
  },

});

module.exports = RaisedButton;