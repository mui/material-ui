var React = require('react'),
  Events = require('./utils/events.js'),
  KeyCode = require('./utils/key-code.js'),
  Classable = require('./mixins/classable'),
  Paper = require('./paper.jsx');

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

  componentDidMount: function() {
    Events.on(document, 'keyup', this._checkEscapeKeyUp);
  },

  componentWillUnmount: function() {
    Events.off(document, 'keyup', this._checkEscapeKeyUp);
  },

  componentDidUpdate: function (prevProps, prevState) {
    //calculate height and use that to center the dialog vertically
    var dom = this.getDOMNode(),
      height = dom.offsetHeight;

    dom.style.marginTop = -1 * height / 2 + 'px';
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
  },

  _handleClickAway: function() {
    this.dismiss();
  }, 

  _checkEscapeKeyUp: function(e) {
    if (e.keyCode == KeyCode.ESC) {
      this.dismiss();
    }
  }

});

module.exports = Dialog;