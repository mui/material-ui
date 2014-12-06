var React = require('react'),
  WindowListenable = require('./mixins/window-listenable.js'),
  Events = require('./utils/events.js'),
  KeyCode = require('./utils/key-code.js'),
  Classable = require('./mixins/classable'),
  Overlay = require('./overlay.jsx'),
  Paper = require('./paper.jsx');

var Dialog = React.createClass({

  mixins: [Classable, WindowListenable],

  propTypes: {
    openImmediately: React.PropTypes.bool,
    title: React.PropTypes.string,
    actions: React.PropTypes.array,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func
  },

  windowListeners: {
    'keyup': '_onWindowKeyUp'
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
    this._positionDialog();
  },

  componentDidUpdate: function (prevProps, prevState) {
    this._positionDialog();
  },

  render: function() {
    var mainClasses = this.getClasses('dialog', { 'show': this.state.open }),
      actions = this.props.actions.map(function(a, index) {
        if (a.onClick) return <div className="action" key={index} onClick={a.onClick}>{a.text}</div>;
        return <div className="action"  key={index} onClick={this.dismiss}>{a.text}</div>;
      }.bind(this));

    return (
      <div className={mainClasses}>
        <Paper className="dialog-window" zDepth={4}>
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
        <Overlay show={this.state.open} onTouchTap={this._handleOverlayTouchTap} />
      </div>
    );
  },

  dismiss: function() {
    this.setState({ open: false });
    if (this.props.onDismiss) this.props.onDismiss();
  },

  show: function() {
    this.setState({ open: true });
    if (this.props.onShow) this.props.onShow();
  },

  _positionDialog: function() {
    //calculate height and use that to center the dialog vertically
    var el = this.getDOMNode(),
      height = el.offsetHeight;

    el.style.marginTop = -1 * height / 2 + 'px';
  },

  _handleOverlayTouchTap: function() {
    this.dismiss();
  },

  _onWindowKeyUp: function(e) {
    if (e.keyCode == KeyCode.ESC) {
      this.dismiss();
    }
  }

});

module.exports = Dialog;