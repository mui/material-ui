var React = require('react');
var Classable = require('./mixins/classable');
var ClickAwayable = require('./mixins/click-awayable');

var Snackbar = React.createClass({

  mixins: [Classable, ClickAwayable],

  propTypes: {
    action: React.PropTypes.string,
    message: React.PropTypes.string.isRequired,
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

  componentDidUpdate: function(prevProps, prevState) {
    if (prevState.open != this.state.open) {
      if (this.state.open) {
        this._bindClickAway();
      } else {
        this._unbindClickAway();
      }
    }
  },

  render: function() {
    var classes = this.getClasses('mui-snackbar', {
      'mui-is-open': this.state.open
    }); 
    var action;

    if (this.props.action)
      action = <span className="mui-snackbar-action" onClick={this._onActionClick}>{this.props.action}</span>;

    return (
      <span className={classes}>
        <span className="mui-snackbar-message">{this.props.message}</span>
        {action}
      </span>
    );
  },

  show: function() {
    this.setState({ open: true });
  },
  
  dismiss: function() {
    this.setState({ open: false });
  },

  _onActionClick: function(e) {
    if (this.props.onClick) this.props.onClick(e, this.props.action);
    this.dismiss();
  }
  
});

module.exports = Snackbar;
