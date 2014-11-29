var React = require('react'),
  Classable = require('./mixins/classable.js'),
  EnhancedButton = require('./enhanced-button.jsx'),
  Ripple = require('./ripple.jsx');

var FlatButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    onTouchTap: React.PropTypes.func,
    primary: React.PropTypes.bool
  },

  render: function() {
    var {
      className,
      onTouchTap,
      ...other } = this.props,
      classes = this.getClasses('mui-flat-button', {
        'mui-is-primary': this.props.primary
      });

    return (
      <EnhancedButton {...other}
        className={classes}
        onTouchTap={this._onTouchTap}>

        <Ripple ref="ripple" className="mui-flat-button-ripple" />
        <Ripple className="mui-flat-button-focus-ripple" />
        {this.props.label}

      </EnhancedButton>
    );
  },

  _onTouchTap: function(e) {
    if (!this.props.disabled) this.refs.ripple.animate(e);
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  }

});

module.exports = FlatButton;