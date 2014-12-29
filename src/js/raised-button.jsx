var React = require('react');
var Classable = require('./mixins/classable.js');
var EnhancedButton = require('./enhanced-button.jsx');
var Paper = require('./paper.jsx');

var RaisedButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
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
      'mui-is-primary': primary,
      'mui-is-secondary': !primary && secondary
    });

    return (
      <Paper className={classes} zDepth={this.state.zDepth}>
        <EnhancedButton {...other}
          className="mui-raised-button-container" 
          onMouseUp={this._handleMouseUp}
          onMouseDown={this._handleMouseDown}
          onMouseOut={this._handleMouseOut}
          onTouchStart={this._handleTouchStart}
          onTouchEnd={this._handleTouchEnd}>
          <span className="mui-raised-button-label">{label}</span>
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