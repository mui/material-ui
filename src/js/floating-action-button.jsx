var React = require('react');
var CssEvent = require('./utils/css-event.js');
var Classable = require('./mixins/classable.js');
var EnhancedButton = require('./enhanced-button.jsx');
var Icon = require('./icon.jsx');
var Paper = require('./paper.jsx');
var Ripple = require('./ripple.jsx');
var TouchRipple = require('./ripples/touch-ripple.jsx');

var RaisedButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    icon: React.PropTypes.string.isRequired,
    mini: React.PropTypes.bool,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    secondary: React.PropTypes.bool
  },

  getInitialState: function() {
    var zDepth = this.props.disabled ? 0 : 2;
    return {
      zDepth: zDepth,
      initialZDepth: zDepth
    };
  },

  render: function() {
    var {
      icon,
      mini,
      secondary,
      ...other } = this.props;
    var classes = this.getClasses('mui-floating-action-button', {
      'mui-is-mini': this.props.mini,
      'mui-is-secondary': this.props.secondary
    });

    return (
      <Paper
        className={classes}
        innerClassName="mui-floating-action-button-inner"
        zDepth={this.state.zDepth}
        circle={true}>

        <EnhancedButton {...other}
          className="mui-floating-action-button-container" 
          onMouseDown={this._handleMouseDown}
          onMouseUp={this._handleMouseUp}
          onTouchStart={this._handleTouchStart}
          onTouchEnd={this._handleTouchEnd}>

          <TouchRipple
            className="mui-floating-action-button-ripple"
            ref="touchRipple" />
          <Ripple className="mui-floating-action-button-focus-ripple" />
          <Icon
            className="mui-floating-action-button-icon"
            icon={this.props.icon} />

        </EnhancedButton>
        
      </Paper>
    );
  },

  _handleMouseDown: function(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.refs.touchRipple.start();
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
    this.refs.touchRipple.start();
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