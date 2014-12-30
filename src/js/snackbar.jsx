var React = require('react');
var Classable = require('./mixins/classable');
var ClickAwayable = require('./mixins/click-awayable');
var Events = require('./utils/events');
var Dom = require('./utils/dom');

var Toast = React.createClass({

  mixins: [Classable, ClickAwayable],

  propTypes: {
    action: React.PropTypes.string,
    icon: React.PropTypes.string,
    message: React.PropTypes.string,
    onClick: React.PropTypes.func,
    openOnMount: React.PropTypes.bool
  },

  manualBind: true,

  getInitialState: function() {
    return {
      open: this.props.openOnMount || false
    };
  },

  componentClickAway: function() {
    this.dismiss();
  },

  render: function() {
    var classes = this.getClasses('mui-toast', {
      'mui-open': this.state.open
    }); 
    var message;
    var action;

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
    this.dismiss();
  },

  show: function() {
    this._bindClickAway();
    this.setState({ open: true });
  },
  
  dismiss: function() {
    this._unbindClickAway();
    this.setState({ open: false });
  }
  
});

module.exports = Toast;
