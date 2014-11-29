var React = require('react'),
  CssEvent = require('./utils/css-event.js'),
  Classable = require('./mixins/classable.js'),
  EnhancedButton = require('./enhanced-button.jsx'),
  Paper = require('./paper.jsx'),
  Ripple = require('./ripple.jsx');

var RaisedButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    onTouchTap: React.PropTypes.func,
    primary: React.PropTypes.bool
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
      className,
      onTouchTap,
      ...other } = this.props,
      classes = this.getClasses('mui-raised-button', {
        'mui-is-primary': this.props.primary
      });

    return (
      <Paper className={classes} zDepth={this.state.zDepth}>
        <EnhancedButton 
          {...other}
          className="mui-raised-button-container" 
          onTouchTap={this._onTouchTap}>

          <Ripple ref="ripple" className="mui-raised-button-ripple" />
          <Ripple className="mui-raised-button-focus-ripple" />
          <span className="mui-raised-button-label">{this.props.label}</span>

        </EnhancedButton>
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
    this.refs.ripple.animate(e);

    //animate the zdepth change
    this.setState({ zDepth: this.state.initialZDepth + 1 });
    setTimeout(function() {
      this.setState({ zDepth: this.state.initialZDepth });
    }.bind(this), 450);
  }

});

module.exports = RaisedButton;