var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var Theme = require('./styles/theme');
var EnhancedButton = require('./enhanced-button');
var FontIcon = require('./font-icon');
var Tooltip = require('./tooltip');

var IconButton = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    iconClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    tooltip: React.PropTypes.string,
    touch: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      tooltipShown: false 
    };
  },

  componentDidMount: function() {
    if (this.props.tooltip) {
      this._positionTooltip();
    }

    if (process.NODE_ENV !== 'production' &&
       (this.props.iconClassName && this.props.children)) {
      var warning = 'You have set both an iconClassName and a child icon. ' +
                    'It is recommended you use only one method when adding ' +
                    'icons to IconButtons.';
      console.warn(warning);
    }
  },

  /** Styles */
  _main: function() {
    var style = {
      height: 48,
      width: 48,
      transition: Transitions.easeOut(),
      position: 'relative',
      padding: (CustomVariables.spacing.iconSize / 2),
      width: CustomVariables.spacing.iconSize*2,
      height: CustomVariables.spacing.iconSize*2,
    };

    if (this.props.disabled) {
      style = this.mergeAndPrefix(style, {
        opacity: CustomVariables.disabledOpacity,
        color: CustomVariables.disabledColor,
        fill: CustomVariables.disabledColor,
      });
    }

    return this.mergeAndPrefix(style);
  },

  _tooltip: function() {
    return {
      marginTop: CustomVariables.iconButtonSize + 4,
    };
  },

  render: function() {
    var {
      tooltip,
      touch,
      ...other } = this.props;
    var tooltip;
    var fonticon;

    if (this.props.tooltip) {
      tooltip = (
        <Tooltip
          ref="tooltip"
          className="mui-icon-button-tooltip"
          label={tooltip}
          show={this.state.tooltipShown}
          touch={touch}
          style={this._tooltip()}/>
      );
    }

    if (this.props.iconClassName) {
      fonticon = (
        <FontIcon 
          className={this.props.iconClassName} 
          style={this.props.iconStyle}/>
      );
    }

    return (
      <EnhancedButton {...other}
        ref="button"
        centerRipple={true}
        style={this._main()}
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}>

        {tooltip}
        {fonticon}
        {this.props.children}

      </EnhancedButton>
    );
  },

  _positionTooltip: function() {
    var tooltip = this.refs.tooltip.getDOMNode();
    var tooltipWidth = tooltip.offsetWidth;
    var buttonWidth = 48;

    tooltip.style.left = (tooltipWidth - buttonWidth) / 2 * -1 + 'px';
  },

  _showTooltip: function() {
    if (!this.props.disabled) this.setState({ tooltipShown: true });
  },

  _hideTooltip: function() {
    this.setState({ tooltipShown: false });
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
  }

});

module.exports = IconButton;