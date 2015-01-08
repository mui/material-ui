var React = require('react');
var Classable = require('./mixins/classable');
var ClickAwayable = require('./mixins/click-awayable');
var FlatButton = require('./flat-button.jsx');

var Snackbar = React.createClass({

  mixins: [Classable, ClickAwayable],

  propTypes: {
    action: React.PropTypes.string,
    message: React.PropTypes.string.isRequired,
    openOnMount: React.PropTypes.bool,
    onActionTouchTap: React.PropTypes.func
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

    if (this.props.action) {
      action = (
        <FlatButton
          className="mui-snackbar-action"
          label={this.props.action}
          onTouchTap={this.props.onActionTouchTap} />
      );
    }

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
  }

});

module.exports = Snackbar;
