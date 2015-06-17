var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var EnhancedButton = require('./enhanced-button');
var FontIcon = require('./font-icon');
var Tooltip = require('./tooltip');

var IconButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    iconClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    tooltip: React.PropTypes.string,
    touch: React.PropTypes.bool,
    tooltipPosition: React.PropTypes.oneOf(['bottom-center',
    'bottom-left','bottom-right','top-center', 'top-left',
    'top-right'])
  },

  getInitialState: function() {
    return {
      tooltipShown: false
    };
  },

  getDefaultProps: function () {
    return {
      iconStyle: {},
      tooltipPosition: 'bottom-center',
    };
  },

  componentDidMount: function() {
    if (this.props.tooltip) {
      this._positionTooltip();
    }
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.iconClassName && this.props.children) {
        var warning = 'You have set both an iconClassName and a child icon. ' +
                      'It is recommended you use only one method when adding ' +
                      'icons to IconButtons.';
        console.warn(warning);
      }
    }
  },

  getStyles: function() {
    var spacing = this.context.muiTheme.spacing;
    var palette = this.context.muiTheme.palette;
    var touchMarginOffset = this.props.touch ? 10: 0;

    var styles = {
      root: {
        position: 'relative',
        boxSizing: 'border-box',
        transition: Transitions.easeOut(),
        padding: spacing.iconSize / 2,
        width: spacing.iconSize*2,
        height: spacing.iconSize*2
      },
      tooltip: {
        boxSizing: 'border-box',
        marginTop: this.context.muiTheme.component.button.iconButtonSize +
                   2 + touchMarginOffset
      },
      icon: {
        color: palette.textColor,
        fill: palette.textColor
      },
      overlay: {
        position: 'relative',
        top: 0,
        width: '100%',
        height: '100%',
        background: palette.disabledColor
      },
      disabled: {
        color: palette.disabledColor,
        fill: palette.disabledColor
      }
    };
    return styles;
  },

  render: function() {
    var {
      disabled,
      iconClassName,
      tooltip,
      touch,
      ...other } = this.props;
    var fonticon;

    var styles = this.getStyles();

    var tooltipPosition = this.props.tooltipPosition;
    var tooltipPositionTop = (tooltipPosition === 'top-left' || 
                              tooltipPosition === 'top-right' || 
                              tooltipPosition === 'top-center');
    var verticalDirection = tooltipPositionTop ? 'up' : 'down';

    var rippleStart = tooltipPosition === 'top-left' || 
                      tooltipPosition==='bottom-left' ?
                        rippleStart = 'right':
                      tooltipPosition === 'top-center' || 
                      tooltipPosition==='bottom-center' ?
                        rippleStart = 'center':
                        rippleStart = 'left';
    var tooltipElement = tooltip ? (
      <Tooltip
        ref="tooltip"
        label={tooltip}
        show={this.state.tooltipShown}
        touch={touch}
        style={this.mergeStyles(styles.tooltip)}
        verticalDirection = {verticalDirection}
        ripplePosition = {rippleStart}
        iconButtonTouch = {this.props.touch}/>
    ) : null;

    if (iconClassName) {
      var {
        iconHoverColor,
        ...iconStyle
      } = this.props.iconStyle;

      fonticon = (
        <FontIcon
          className={iconClassName}
          hoverColor={disabled ? null : iconHoverColor}
          style={this.mergeStyles(
            styles.icon,
            disabled ? styles.disabled : {},
            iconStyle
          )}/>
      );
    }

    var children = disabled ?
      this._addStylesToChildren(styles.disabled) :
      this.props.children;

    return (
      <EnhancedButton {...other}
        ref="button"
        centerRipple={true}
        disabled={disabled}
        style={this.mergeStyles(styles.root, this.props.style)}
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        onKeyboardFocus={this._handleKeyboardFocus}>

        {tooltipElement}
        {fonticon}
        {children}

      </EnhancedButton>
    );
  },

  _addStylesToChildren: function(styles) {
    var children = [];

    React.Children.forEach(this.props.children, function(child) {
      children.push(
        React.cloneElement(child, {
          key: child.props.key ? child.props.key : children.length,
          style: styles
        })
      );
    });

    return children;
  },

  _positionTooltip: function() {
    var tooltip = React.findDOMNode(this.refs.tooltip);
    var tooltipWidth = tooltip.offsetWidth;
    var buttonWidth = 48;
    var touchMarginOffset = (this.props.touch) ? 10: 0;

    switch(this.props.tooltipPosition){
      case 'bottom-left':
        tooltip.style.right = 12 + 'px';
        break;
      case 'bottom-right':
        tooltip.style.left = 12 + 'px';
        break;
      case 'top-left':
        tooltip.style.right = 12 + 'px';
        tooltip.style.marginTop = (tooltip.offsetHeight+2+touchMarginOffset)*-1 + 'px';
        break;
      case 'top-right':
        tooltip.style.left = 12 + 'px';
        tooltip.style.marginTop = (tooltip.offsetHeight+2+touchMarginOffset)*-1 + 'px';
        break;
      case 'top-center':
        tooltip.style.left = (tooltipWidth - buttonWidth) / 2 * -1 + 'px';
        tooltip.style.marginTop = (tooltip.offsetHeight+2+touchMarginOffset)*-1 + 'px';
        break;
      case 'bottom-center':
        tooltip.style.left = (tooltipWidth - buttonWidth) / 2 * -1 + 'px';
    }
  },

  _showTooltip: function() {
    if (!this.props.disabled && this.props.tooltip) {
      this.setState({ tooltipShown: true });
    }
  },

  _hideTooltip: function() {
    if (this.props.tooltip) this.setState({ tooltipShown: false });
  },

  _handleBlur: function(e) {
    this._hideTooltip();
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function(e) {
    this._showTooltip();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleMouseOut: function(e) {
    if (!this.refs.button.isKeyboardFocused()) this._hideTooltip();
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleMouseOver: function(e) {
    this._showTooltip();
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleKeyboardFocus: function(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this._showTooltip();
      if (this.props.onFocus) this.props.onFocus(e);
    } else if (!this.state.hovered) {
      this._hideTooltip();
      if (this.props.onBlur) this.props.onBlur(e);
    }
  }

});

module.exports = IconButton;
