/** @jsx React.DOM */

var React = require('react');
var Classable = require('./mixins/classable.js');
var ClickAwayable = require('./mixins/click-awayable.js');

var Toast = React.createClass({

  mixins: [Classable, ClickAwayable],

  propTypes: {
    action: React.PropTypes.string,
    icon: React.PropTypes.string,
    message: React.PropTypes.string,
    onClick: React.PropTypes.func,
    open: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      open: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ open: nextProps.open });
  },

  componentClickAway: function() {
    this.setState({ open: false });
  },

  render: function() {
    var classes = this.getClasses('mui-toast', {
        'mui-open': this.state.open
      }),
      message,
      action;

    if (this.props.message)
      message = <span className="mui-toast-message">{this.props.message}</span>;
    if (this.props.action)
      action = <span className="mui-toast-action" onClick={this._onActionClick}>{this.props.action}</span>;

    return (
      <span className={classes}>
        {message}
        {action}
      </span>
    );
  },

  _onActionClick: function(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.action);
    this.setState({ open: false });
  }

});

module.exports = Toast;
