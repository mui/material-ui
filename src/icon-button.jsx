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
  },

  getInitialState: function() {
    return {
      tooltipShown: false
    };
  },

  getDefaultProps: function () {
    return {
      iconStyle: {}
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

  getTheme: function() {
    return this.context.muiTheme.palette;
  },

  getSpacing: function() {
    return this.context.muiTheme.spacing;
  },

  getDisabledColor: function() {
    return this.context.muiTheme.palette.disabledColor;
  },

  getStyles: function() {
    var styles = {
      root: {
        position: 'relative',
        boxSizing: 'border-box',
        transition: Transitions.easeOut(),
        padding: (this.getSpacing().iconSize / 2),
        width: this.getSpacing().iconSize*2,
        height: this.getSpacing().iconSize*2
      },
      tooltip: {
        boxSizing: 'border-box',
        marginTop: this.context.muiTheme.component.button.iconButtonSize + 4
      },
      icon: {
        color: this.getTheme().textColor,
        fill: this.getTheme().textColor
      },
      overlay: {
        position: 'relative',
        top: 0,
        width: '100%',
        height: '100%',
        background: this.getDisabledColor()
      },
      rootWhenDisabled: {
        color: this.getDisabledColor(),
        fill: this.getDisabledColor()
      },
      iconWhenDisabled: {
        color: this.getDisabledColor(),
        fill: this.getDisabledColor()
      }
    };
    return styles;
  },

  render: function() {
    var {
      tooltip,
      touch,
      ...other } = this.props;
    var tooltipElement;
    var fonticon;

    var styles = this.getStyles();

    if (tooltip) {
      tooltipElement = (
        <Tooltip
          ref="tooltip"
          label={tooltip}
          show={this.state.tooltipShown}
          touch={touch}
          style={this.mergeStyles(styles.tooltip)}/>
      );
    }

    if (this.props.iconClassName) {
      var { iconHoverColor, ...iconStyle } = this.props.iconStyle;

      fonticon = (
        <FontIcon
          className={this.props.iconClassName}
          hoverColor={iconHoverColor}
          style={this.mergeStyles(
            styles.icon,
            this.props.disabled && styles.iconWhenDisabled,
            iconStyle
          )}/>
      );
    }

    if (this.props.children && this.props.disabled) {
      React.Children.forEach(this.props.children, function(child) {
        child.props.style = {
          color: this.getDisabledColor(),
          fill: this.getDisabledColor(),
        }
      }, this);
    }

    return (
      <EnhancedButton {...other}
        ref="button"
        centerRipple={true}
        style={this.mergeStyles(styles.root, this.props.style)}
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        onKeyboardFocus={this._handleKeyboardFocus}>

        {tooltipElement}
        {fonticon}
        {this.props.children}

      </EnhancedButton>
    );
  },

  _positionTooltip: function() {
    var tooltip = React.findDOMNode(this.refs.tooltip);
    var tooltipWidth = tooltip.offsetWidth;
    var buttonWidth = 48;

    tooltip.style.left = (tooltipWidth - buttonWidth) / 2 * -1 + 'px';
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
