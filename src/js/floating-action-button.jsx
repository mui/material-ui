var React = require('react'),
  CssEvent = require('./utils/css-event.js'),
  Classable = require('./mixins/classable.js'),
  EnhancedButton = require('./enhanced-button.jsx'),
  Icon = require('./icon.jsx'),
  Paper = require('./paper.jsx'),
  Ripple = require('./ripple.jsx');

var RaisedButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    icon: React.PropTypes.string.isRequired,
    mini: React.PropTypes.bool,
    onTouchTap: React.PropTypes.func
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
      className,
      icon,
      mini,
      onTouchTap,
      ...other } = this.props,
      classes = this.getClasses('mui-floating-action-button', {
        'mui-is-mini': this.props.mini
      });

    return (
      <Paper className={classes} innerClassName="mui-floating-action-button-inner" zDepth={this.state.zDepth} circle={true}>
        <EnhancedButton 
          {...other}
          className="mui-floating-action-button-container" 
          onTouchTap={this._onTouchTap}>

          
          <Ripple className="mui-floating-action-button-focus-ripple" />
          <Icon className="mui-floating-action-button-icon" icon={this.props.icon} />

        </EnhancedButton>
        <Ripple ref="ripple" className="mui-floating-action-button-ripple" />
      </Paper>
    );
  },

  _onTouchTap: function(e) {
    if (!this.props.disabled) this._animateButtonClick(e);
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  },

  _animateButtonClick: function(e) {
    var el = this.getDOMNode();

    //animate the ripple
    this.refs.ripple.animateFromCenter();

    //animate the zdepth change
    this.setState({ zDepth: this.state.initialZDepth + 1 });
    setTimeout(function() {
			if (this.isMounted()) {
				this.setState({zDepth: this.state.initialZDepth});
			}
    }.bind(this), 450);
  }

});

module.exports = RaisedButton;
