var React = require('react');
var Classable = require('./mixins/classable.js');
var EnhancedButton = require('./enhanced-button.jsx');
var Icon = require('./icon.jsx');
var Paper = require('./paper.jsx');

var RaisedButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    icon: React.PropTypes.string.isRequired,
    mini: React.PropTypes.bool,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
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
      'mui-is-mini': mini,
      'mui-is-secondary': secondary
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
          onMouseOut={this._handleMouseOut}
          onTouchStart={this._handleTouchStart}
          onTouchEnd={this._handleTouchEnd}>

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