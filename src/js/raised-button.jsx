var React = require('react');
var Classable = require('./mixins/classable');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var Typography = require('./styles/core/typography');
var EnhancedButton = require('./enhanced-button');
var Paper = require('./paper');

var RaisedButton = React.createClass({

  mixins: [Classable, StylePropable],

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
      initialZDepth: zDepth
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

  _main: function() {
    return {

    };
  },

  _container: function() {
    return {

    };
  },

  _label: function() {
    return this.mergeAndPrefix({
      position: 'relative',
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



  render: function() {
    var {
      label,
      primary,
      secondary,
      ...other } = this.props;
    var classes = this.getClasses('mui-raised-button', {
      'mui-is-primary': primary,
      'mui-is-secondary': !primary && secondary
    });
    var labelElement;

    if (label) labelElement = <span style={this._label()}>{label}</span>;

    return (
      <Paper className={classes} zDepth={this.state.zDepth}>
        <EnhancedButton {...other}
          className="mui-raised-button-container" 
          onMouseUp={this._handleMouseUp}
          onMouseDown={this._handleMouseDown}
          onMouseOut={this._handleMouseOut}
          onTouchStart={this._handleTouchStart}
          onTouchEnd={this._handleTouchEnd}>
          {labelElement}
          {this.props.children}
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
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleTouchStart: function(e) {
    this.setState({ zDepth: this.state.initialZDepth + 1 });
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleTouchEnd: function(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  }

});

module.exports = RaisedButton;