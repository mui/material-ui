var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var ColorManipulator = require('./utils/color-manipulator');
var Typography = require('./styles/core/typography');
var EnhancedButton = require('./enhanced-button');

var FlatButton = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    className: React.PropTypes.string,
    label: function(props, propName, componentName){
      if (!props.children && !props.label) {
        return new Error('Warning: Required prop `label` or `children` was not specified in `'+ componentName + '`.')
      }
    },
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    labelStyle: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      labelStyle: {},
    }
  },

  getInitialState: function() {
    return {
      hovered: false,
    };
  },

  /** Styles */

  _main: function() {

    var style = {
      transition: Transitions.easeOut(),
      fontSize: Typography.fontStyleButtonFontSize,
      letterSpacing: 0,
      textTransform: 'uppercase',
      fontWeight: Typography.fontWeightMedium, 
      borderRadius: 2,
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: CustomVariables.flatButtonColor,
      lineHeight: CustomVariables.buttonHeight + 'px',
      minWidth: CustomVariables.buttonMinWidth,
      padding: 0, 
      margin: 0,

      //This is need so that ripples do not bleed past border radius.
      //See: http://stackoverflow.com/questions/17298739/css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
      transform: 'translate3d(0, 0, 0)',

      color:  this.props.disabled ? CustomVariables.flatButtonDisabledTextColor :
              this.props.primary ? CustomVariables.flatButtonPrimaryTextColor :
              this.props.secondary ? CustomVariables.flatButtonSecondaryTextColor :
              CustomVariables.flatButtonTextColor,
    };

    if (this.state.hovered && !this.props.disabled) {
      style.backgroundColor = ColorManipulator.fade(ColorManipulator.lighten(style.color, 0.4), 0.15);
    }  
    
    return this.mergeAndPrefix(style);
  },

  _label: function() {
    var style = {
      position: 'relative',
      padding: '0px ' + CustomVariables.spacing.desktopGutterLess + 'px',
    };
    
    if (this.props.labelStyle) style = this.mergeAndPrefix(style, this.props.labelStyle);

    return style;
  },


  render: function() {

    var {
        label,
        primary,
        secondary,
        onMouseOver,
        onMouseOut,
        ...other
      } = this.props;

    var labelElement;
    if (label) labelElement = <span style={this._label()}>{label}</span>;
    
    var rippleColor = ColorManipulator.fade(this._main().color, 0.8);

    return (
      <EnhancedButton {...other}
        ref="enhancedButton"
        style={this._main()}
        onMouseOver={this._handleMouseOver} 
        onMouseOut={this._handleMouseOut} 
        focusRippleColor={rippleColor}
        touchRippleColor={rippleColor}
        onKeyboardFocus={this._handleKeyboardFocus}>
        {labelElement}
        {this.props.children}
      </EnhancedButton>
    );
  },

  _handleMouseOver: function(e) {
    if (!this.refs.enhancedButton.isKeyboardFocused()) this.setState({hovered: true});
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleMouseOut: function(e) {
    if (!this.refs.enhancedButton.isKeyboardFocused()) this.setState({hovered: false});
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleKeyboardFocus: function(e, keyboardFocused) {

    if (keyboardFocused && !this.props.disabled) {
      this.getDOMNode().style.backgroundColor = ColorManipulator.fade(ColorManipulator.lighten(this._main().color, 0.4), 0.15);
    } else {
      this.getDOMNode().style.backgroundColor = 'transparent';
    }
  }


});

module.exports = FlatButton;
