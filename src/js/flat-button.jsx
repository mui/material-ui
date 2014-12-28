var React = require('react');
var Classable = require('./mixins/classable.js');
var EnhancedButton = require('./enhanced-button.jsx');
var TouchRipple = require('./ripples/touch-ripple.jsx');
var Ripple = require('./ripple.jsx');

var FlatButton = React.createClass({

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

  render: function() {
    var {
        label,
        primary,
        secondary,
        ...other
      } = this.props;
    var classes = this.getClasses('mui-flat-button', {
      'mui-is-primary': this.props.primary,
      'mui-is-secondary': !this.props.primary && this.props.secondary
    });

    return (
      <EnhancedButton {...other}
        className={classes}
        onMouseUp={this._handleMouseUp}
        onMouseDown={this._handleMouseDown}
        onTouchStart={this._handleTouchStart}
        onTouchEnd={this._handleTouchEnd}>

        <TouchRipple
          className="mui-flat-button-ripple"
          ref="touchRipple" />

        <Ripple className="mui-flat-button-focus-ripple" />
        {this.props.label}

      </EnhancedButton>
    );
  },

  _handleMouseDown: function(e) {
    //only listen to left clicks
    if (e.button === 0) this.refs.touchRipple.start(e);
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _handleMouseUp: function(e) {
    this.refs.touchRipple.end();
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  },

  _handleTouchStart: function(e) {
    this.refs.touchRipple.start(e);
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleTouchEnd: function(e) {
    this.refs.touchRipple.end();
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  }

});

module.exports = FlatButton;