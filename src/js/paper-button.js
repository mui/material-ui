/**
 * @jsx React.DOM
 */

var React = require('react'),
  CssEvent = require('./utils/css-event.js'),
  Classable = require('./mixins/classable.js'),
  Paper = require('./paper.jsx'),
  Icon = require('./icon.jsx'),
  Ripple = require('./ripple.jsx'),

  Types = {
    RAISED: 'RAISED',
    FLAT: 'FLAT',
    FAB: 'FAB',
    FAB_MINI: 'FAB_MINI'
  },

  zDepths = {
    FLAT: 0,
    RAISED: 1,
    FAB: 2,
    FAB_MINI: 2
  };

var PaperButton = React.createClass({

  propTypes: {
    primary: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    label: React.PropTypes.string,
    type: React.PropTypes.oneOf(Object.keys(Types)),
    icon: React.PropTypes.string,
    onClick: React.PropTypes.func
  },

  mixins: [Classable],

  statics: {
    Types: Types
  },

  getDefaultProps: function() {
    return {
      primary: false,
      disabled: false,
      type: Types.RAISED
    };
  },

  getInitialState: function() {
    var zDepth = this.props.disabled ? 0 : zDepths[this.props.type];
    return { zDepth: zDepth, initialZDepth: zDepth };
  },

  render: function() {
    var classes = this.getClasses('mui-paper-button', {
        'mui-primary': this.props.primary,
        'mui-disabled': this.props.disabled,
        'mui-flat': this.props.type === Types.FLAT,
        'mui-fab': this.props.type === Types.FAB,
        'mui-fab-mini': this.props.type === Types.FAB_MINI
      }),
      circle = this.props.type === Types.FAB || this.props.type === Types.FAB_MINI,
      icon;

    if (this.props.icon) icon = <Icon className="mui-paper-button-icon" icon={this.props.icon} />;

    return (
      <Paper className={classes} zDepth={this.state.zDepth} circle={circle} 
      onClick={this._onClick} onMouseDown={this._onMouseDown}>
        <Ripple ref="ripple" />
        <a href={this.props.href} className="mui-paper-button-content">
          {this.props.label}
          {icon}
        </a>
      </Paper>
    );
  },

  _onMouseDown: function(e) {
    if (!this.props.disabled) this._animateButtonClick(e);
  },

  _onClick: function(e) {
    if (!this.props.disabled) {
      if (this.props.onClick) this.props.onClick(e);
    }
  },

  _animateButtonClick: function(e) {
    var el = this.getDOMNode();

    //animate the ripple
    this.refs.ripple.animate(e);

    //animate the zdepth change
    if (this.props.type !== Types.FLAT) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
      CssEvent.onTransitionEnd(el, function() {
        this.setState({ zDepth: this.state.initialZDepth });
      }.bind(this));
    }
  }

});

module.exports = PaperButton;
