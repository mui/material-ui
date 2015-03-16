var React = require('react');
var Classable = require('./mixins/classable');
var EnhancedButton = require('./enhanced-button');
var FontIcon = require('./font-icon');
var Paper = require('./paper');

var getZDepth = function(disabled) {
  var zDepth = disabled ? 0 : 2;
  return {
    zDepth: zDepth,
    initialZDepth: zDepth
  };
};


var RaisedButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    iconClassName: React.PropTypes.string,
    mini: React.PropTypes.bool,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    secondary: React.PropTypes.bool
  },

  componentWillMount: function() {
    this.setState(getZDepth(this.props.disabled));
  },

  componentWillReceiveProps: function(newProps) {
    if(newProps.disabled !== this.props.disabled){
      this.setState(getZDepth(newProps.disabled));
    }
  },

  componentDidMount: function() {
    if (process.NODE_ENV !== 'production') {
      if (this.props.iconClassName && this.props.children) {
        var warning = 'You have set both an iconClassName and a child icon. ' +
                      'It is recommended you use only one method when adding ' +
                      'icons to FloatingActionButtons.';
        console.warn(warning);
      }
    }
  },


  render: function() {
    var {
      icon,
      mini,
      secondary,
      ...other } = this.props;
    var classes = this.getClasses('mui-floating-action-button', {
      'mui-is-mini': mini,
      'mui-is-secondary': !this.props.disabled && secondary
    });

    var icon;
    if (this.props.iconClassName) icon = <FontIcon className={"mui-floating-action-button-icon " + this.props.iconClassName} />


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

          {icon}
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
