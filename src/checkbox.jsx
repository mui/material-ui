var React = require('react');
var EnhancedSwitch = require('./enhanced-switch');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var CheckboxOutline = require('./svg-icons/toggle-check-box-outline-blank');
var CheckboxChecked = require('./svg-icons/toggle-check-box-checked');

var Checkbox = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    iconStyle: React.PropTypes.object,
    onCheck: React.PropTypes.func,
    checkedIcon: React.PropTypes.element,
    unCheckedIcon: React.PropTypes.element
  },

  getInitialState: function() {
    return {
      switched: 
        this.props.checked ||
        this.props.defaultChecked || 
        (this.props.valueLink && this.props.valueLink.value) || 
        false,
    }
  },

  getTheme: function() {
    return this.context.muiTheme.component.checkbox;
  },

  getStyles: function() {
    var checkboxSize = 24;
    var styles = {
      icon: {
          height: checkboxSize,
          width: checkboxSize,
      },
      check: {
          position: 'absolute',
          opacity: 0, 
          transform: 'scale(0)',
          transitionOrigin: '50% 50%',
          transition: Transitions.easeOut('450ms', 'opacity', '0ms') + ', ' + 
                      Transitions.easeOut('0ms', 'transform', '450ms'),
          fill: this.getTheme().checkedColor   
      },
      box: {
          position: 'absolute',
          opacity: 1,
          fill: this.getTheme().boxColor,          
          transition: Transitions.easeOut('2s', null, '200ms') 
      },
      checkWhenSwitched: {
        opacity: 1,
        transform: 'scale(1)',
        transition: Transitions.easeOut('0ms', 'opacity', '0ms') + ', ' + 
                    Transitions.easeOut('800ms', 'transform', '0ms')
      },
      boxWhenSwitched: {
        transition: Transitions.easeOut('100ms', null, '0ms'),
        fill: this.getTheme().checkedColor
      },
      checkWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
      boxWhenDisabled: {
        fill: this.getTheme().disabledColor
      }
    };
    return styles;
  },

  render: function() {
    var {
      iconStyle,
      onCheck,
      checkedIcon,
      unCheckedIcon,
      ...other
    } = this.props;

    var styles = this.getStyles();
    var boxStyles = 
      this.mergeAndPrefix(
        styles.box,
        this.state.switched && styles.boxWhenSwitched,
        iconStyle,
        this.props.disabled && styles.boxWhenDisabled);
    var checkStyles = 
      this.mergeAndPrefix(
        styles.check,
        this.state.switched && styles.checkWhenSwitched,
        iconStyle,
        this.props.disabled && styles.checkWhenDisabled);

    var checkedElement = checkedIcon ? React.cloneElement(checkedIcon, {
      style: this.mergeAndPrefix(checkStyles, checkedIcon.props.style)
    }) : React.createElement(CheckboxChecked, {
      style: checkStyles
    });

    var unCheckedElement = unCheckedIcon ? React.cloneElement(unCheckedIcon, {
      style: this.mergeAndPrefix(boxStyles, unCheckedIcon.props.style)
    }) : React.createElement(CheckboxOutline, {
      style: boxStyles
    });

    var checkboxElement = (
      <div>
        {unCheckedElement}
        {checkedElement}
      </div>
    );

    var rippleColor = this.state.switched ? checkStyles.fill : boxStyles.fill;
    var mergedIconStyle = this.mergeAndPrefix(styles.icon, iconStyle);

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switched: this.state.switched,
      switchElement: checkboxElement,
      rippleColor: rippleColor,
      iconStyle: mergedIconStyle,
      onSwitch: this._handleCheck,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultChecked,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right"
    };

    return (
      <EnhancedSwitch 
        {...other}
        {...enhancedSwitchProps}/>
    );
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  _handleCheck: function(e, isInputChecked) {
    if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
  },

  _handleStateChange: function(newSwitched) {
    this.setState({switched: newSwitched});
  }

});

module.exports = Checkbox;
