var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ColorManipulator = require('./utils/color-manipulator');
var Typography = require('./styles/typography');
var EnhancedButton = require('./enhanced-button');

var FlatButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

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

  getThemeButton: function() {
    return this.context.muiTheme.component.button;
  },

  getTheme: function() {
    return this.context.muiTheme.component.flatButton;
  },

  getStyles: function() {
    var styles = {
      root: {
        transition: Transitions.easeOut(),
        fontSize: Typography.fontStyleButtonFontSize,
        letterSpacing: 0,
        textTransform: 'uppercase',
        fontWeight: Typography.fontWeightMedium, 
        borderRadius: 2,
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: this.getTheme().color,
        lineHeight: this.getThemeButton().height + 'px',
        minWidth: this.getThemeButton().minWidth,
        padding: 0, 
        margin: 0,
        //This is need so that ripples do not bleed past border radius.
        //See: http://stackoverflow.com/questions/17298739/css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
        transform: 'translate3d(0, 0, 0)',
      },
      label: {
        position: 'relative',
        padding: '0px ' + this.context.muiTheme.spacing.desktopGutterLess + 'px',
      }
    };
    return styles;
  },

  _getColor: function(){
    return  this.props.disabled ? this.getTheme().disabledTextColor :
            this.props.primary ? this.getTheme().primaryTextColor :
            this.props.secondary ? this.getTheme().secondaryTextColor :
            this.getTheme().textColor;
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

    var styles = this.getStyles();

    styles.root.color = this._getColor();

    styles.rootWhenHovered = {
        backgroundColor: ColorManipulator.fade(ColorManipulator.lighten(styles.root.color, 0.4), 0.15)
    };

    var labelElement;
    if (label) {
      labelElement = (
        <span style={this.mergeAndPrefix(styles.label, this.props.labelStyle)}>
          {label}
        </span>
      );
    };
    
    var rippleColor = ColorManipulator.fade(styles.root.color, 0.8);

    return (
      <EnhancedButton {...other}
        ref="enhancedButton"
        style={this.mergeAndPrefix(
          styles.root,
          (this.state.hovered && !this.props.disabled) && styles.rootWhenHovered,
          this.props.style
        )}
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
      React.findDOMNode(this).style.backgroundColor = ColorManipulator.fade(ColorManipulator.lighten(this._getColor(), 0.4), 0.15);
    } else {
      React.findDOMNode(this).style.backgroundColor = 'transparent';
    }
  }


});

module.exports = FlatButton;
