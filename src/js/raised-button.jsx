var React = require('react');
var Classable = require('./mixins/classable.js');
var EnhancedButton = require('./enhanced-button.jsx');
var Paper = require('./paper.jsx');
var Ripple = require('./ripple.jsx');
var TouchRipple = require('./ripples/touch-ripple.jsx');

var RaisedButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool
  },

  getInitialState: function() {
    var zDepth = this.props.disabled ? 0 : 1;
    return {
      zDepth: zDepth,
      initialZDepth: zDepth
    };
  },

  render: function() {
    var {
      label,
      primary,
      secondary,
      ...other } = this.props;
    var classes = this.getClasses('mui-raised-button', {
      'mui-is-primary': this.props.primary,
      'mui-is-secondary': !this.props.primary && this.props.secondary
    });

    return (
      <Paper className={classes} zDepth={this.state.zDepth}>
        <EnhancedButton {...other}
          className="mui-raised-button-container" 
          onMouseUp={this._handleMouseUp}
          onMouseDown={this._handleMouseDown}
          onTouchStart={this._handleTouchStart}
          onTouchEnd={this._handleTouchEnd}>

          <TouchRipple
          className="mui-raised-button-ripple"
          ref="touchRipple" />

          <Ripple className="mui-raised-button-focus-ripple" />
          <span className="mui-raised-button-label">{this.props.label}</span>

        </EnhancedButton>
      </Paper>
    );
  },

  _handleMouseDown: function(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.refs.touchRipple.start(e);
      this.setState({ zDepth: this.state.initialZDepth + 1 });
    }
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _handleMouseUp: function(e) {
    this.refs.touchRipple.end();
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  },

  _handleTouchStart: function(e) {
    this.refs.touchRipple.start(e);
    this.setState({ zDepth: this.state.initialZDepth + 1 });
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleTouchEnd: function(e) {
    this.refs.touchRipple.end();
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  }

});

module.exports = RaisedButton;