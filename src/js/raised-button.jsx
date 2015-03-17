var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var ColorManipulator = require('./utils/color-manipulator');
var Typography = require('./styles/core/typography');
var EnhancedButton = require('./enhanced-button');
var Paper = require('./paper');

var RaisedButton = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    className: React.PropTypes.string,
    label: function(props, propName, componentName){
      if (!props.children && !props.label) {
        return new Error('Warning: Required prop `label` or `children` was not specified in `'+ componentName + '`.')
      }
    },
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    labelStyle: React.PropTypes.object,
  },

  getInitialState: function() {
    var zDepth = this.props.disabled ? 0 : 1;
    return {
      zDepth: zDepth,
      initialZDepth: zDepth,
      hovered: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var zDepth = nextProps.disabled ? 0 : 1;
    this.setState({
      zDepth: zDepth,
      initialZDepth: zDepth
    });
  },

  /** Styles */

  _getBackgroundColor: function() {
    return  this.props.disabled ? CustomVariables.raisedButtonDisabledColor :
            this.props.primary ? CustomVariables.raisedButtonPrimaryColor :
            this.props.secondary ? CustomVariables.raisedButtonSecondaryColor :
            CustomVariables.raisedButtonColor; 
  },

  _main: function() {
    return this.mergeAndPrefix({
      display: 'inline-block',
      minWidth: CustomVariables.buttonMinWidth,
      height: CustomVariables.buttonHeight,
    });
  },

  _container: function() {
    return  {
      position: 'relative',
      height: '100%',
      width: '100%',
      padding: 0,
      overflow: 'hidden',
      borderRadius: 2,
      transition: Transitions.easeOut(),
      backgroundColor: this._getBackgroundColor(),

      //This is need so that ripples do not bleed
      //past border radius.
      //See: http://stackoverflow.com/questions/17298739/css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
      transform: 'translate3d(0, 0, 0)',
    };
  },

  _label: function() {
    return this.mergeAndPrefix({
      position: 'relative',
      opacity: 1,
      fontSize: '14px',
      letterSpacing: 0,
      textTransform: 'uppercase',
      fontWeight: Typography.fontWeightMedium,
      margin: 0,
      padding: '0px ' + CustomVariables.spacing.desktopGutterLess + 'px',
      userSelect: 'none',
      lineHeight: CustomVariables.buttonHeight + 'px',
      color:  this.props.disabled ? CustomVariables.raisedButtonDisabledTextColor :
              this.props.primary ? CustomVariables.raisedButtonPrimaryTextColor :
              this.props.secondary ? CustomVariables.raisedButtonSecondaryTextColor :
              CustomVariables.raisedButtonTextColor,
    }, this.props.labelStyle);
  },

  _overlay: function() {
    var style = {
      transition: Transitions.easeOut(),
      top: 0,
    };

    if (this.state.hovered && !this.props.disabled) {
      var amount = (this.props.primary || this.props.secondary) ? 0.4 : 0.08;
      style.backgroundColor = ColorManipulator.fade(this._label().color, amount);
    }

    return style;
  },

  render: function() {
    var {
      label,
      primary,
      secondary,
      ...other } = this.props;

    var labelElement;

    if (label) labelElement = <span style={this._label()}>{label}</span>;

    var rippleColor = this._label().color;
    var rippleOpacity = !(primary || secondary) ? 0.1 : 0.16;

    return (
      <Paper 
        style={this._main()} 
        innerStyle={{transition: Transitions.easeOut()}}
        zDepth={this.state.zDepth}>
          <EnhancedButton {...other}
            ref="container"
            style={this._container()}
            onMouseUp={this._handleMouseUp}
            onMouseDown={this._handleMouseDown}
            onMouseOut={this._handleMouseOut}
            onMouseOver={this._handleMouseOver}
            onTouchStart={this._handleTouchStart}
            onTouchEnd={this._handleTouchEnd}
            focusRippleColor={rippleColor}
            touchRippleColor={rippleColor}
            focusRippleOpacity={rippleOpacity}
            touchRippleOpacity={rippleOpacity}
            onKeyboardFocus={this._handleKeyboardFocus}>
              <div ref="overlay" style={this._overlay()} >
                {labelElement}
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

  _handleKeyboardFocus: function(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
      var amount = (this.props.primary || this.props.secondary) ? 0.4 : 0.08;
      this.refs.overlay.getDOMNode().style.backgroundColor = ColorManipulator.fade(this._label().color, amount);
    } else if (!this.state.hovered) {
      this.setState({ zDepth: this.state.initialZDepth });
      this.refs.overlay.getDOMNode().style.backgroundColor = 'transparent';
    }
  },
});

module.exports = RaisedButton;