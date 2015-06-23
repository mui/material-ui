let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let EnhancedButton = require('./enhanced-button');
let FontIcon = require('./font-icon');
let Tooltip = require('./tooltip');


let IconButton = React.createClass({

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
    onKeyboardFocus: React.PropTypes.func,
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
      tooltipPosition: 'bottom-center'
    };
  },

  componentDidMount: function() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.iconClassName && this.props.children) {
        let warning = 'You have set both an iconClassName and a child icon. ' +
                      'It is recommended you use only one method when adding ' +
                      'icons to IconButtons.';
        console.warn(warning);
      }
    }
  },

  getStyles: function() {
    let spacing = this.context.muiTheme.spacing;
    let palette = this.context.muiTheme.palette;

    let styles = {
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
    let {
      disabled,
      iconClassName,
      tooltip,
      touch,
      ...other } = this.props;
    let fonticon;

    let styles = this.getStyles();
    let tooltipPosition = this.props.tooltipPosition.split('-');

    let tooltipElement = tooltip ? (
      <Tooltip
        ref="tooltip"
        label={tooltip}
        show={this.state.tooltipShown}
        touch={touch}
        style={this.mergeStyles(styles.tooltip)}
        verticalPosition={tooltipPosition[0]}
        horizontalPosition={tooltipPosition[1]}/>
    ) : null;

    if (iconClassName) {
      let {
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

    let children = disabled ?
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
    let children = [];

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
    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, keyboardFocused);
  }

});

module.exports = IconButton;
