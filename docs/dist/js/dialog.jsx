/** @jsx React.DOM */

var $ = require('jquery');
var Classable = require('./mixins/classable');
var Paper = require('./paper.jsx');
var React = require('react');

var Dialog = React.createClass({

  mixins: [Classable],

  propTypes: {
    openImmediately: React.PropTypes.bool,
    title: React.PropTypes.string,
    actions: React.PropTypes.array,
    onShow: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      actions: []
    };
  },

  getInitialState: function() {
    return {
      open: this.props.openImmediately || false
    };
  },

  componentDidUpdate: function (prevProps, prevState) {
    //calculate height and use that to center the dialog vertically
    var $el = $(this.getDOMNode()),
      height = $el.innerHeight();

    $el.css('margin-top', -height / 2);
  },

  _handleClickAway: function() {
    this.dismiss();
  },

  render: function() {
    var mainClasses = this.getClasses('dialog', { 'show': this.state.open }),
      actions = this.props.actions.map(function(a) {
        if (a.onClick) return <div className="action" onClick={a.onClick}>{a.text}</div>;
        return <div className="action" onClick={this.dismiss}>{a.text}</div>;
      }.bind(this));

    return (
      <div className={mainClasses}>
        <Paper zDepth={4}>
          <h3 className="dialog-title">
            {this.props.title}
          </h3>
          <div className="dialog-content">
            {this.state.open ? this.props.children : ''}
          </div>
          <div className="dialog-actions">
            <div className="actions-right">
              {actions}
            </div>
          </div>
        </Paper>
        <div className="dialog-overlay" onClick={this._handleClickAway}></div>
      </div>
    );
  },

  dismiss: function() {
    this.setState({ open: false });
  },

  show: function() {
    this.setState({ open: true });
    if (this.props.onShow) this.props.onShow();
  }

});

module.exports = Dialog;
