var React = require('react');
var CssEvent = require('./utils/css-event');
var Classable = require('./mixins/classable');
var ClickAwayable = require('./mixins/click-awayable');
var FlatButton = require('./flat-button');

var Snackbar = React.createClass({

  mixins: [Classable, ClickAwayable],

  manuallyBindClickAway: true,

  propTypes: {
    action: React.PropTypes.string,
    message: React.PropTypes.string.isRequired,
    openOnMount: React.PropTypes.bool,
    onActionTouchTap: React.PropTypes.func
  },

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
        //Only Bind clickaway after transition finishes
        CssEvent.onTransitionEnd(this.getDOMNode(), function() {
          this._bindClickAway();
        }.bind(this));
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