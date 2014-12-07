var React = require('react'),
  WindowListenable = require('./mixins/window-listenable.js'),
  Dom = require('./utils/dom.js'),
  Events = require('./utils/events.js'),
  KeyCode = require('./utils/key-code.js'),
  Classable = require('./mixins/classable'),
  FlatButton = require('./flat-button.jsx'),
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
    var classes = this.getClasses('mui-dialog', { 'mui-is-shown': this.state.open }),
      actions = this._getDialogActions();

    return (
      <div className={classes}>
        <Paper ref="dialogWindow" className="mui-dialog-window" zDepth={4}>

          <h3 className="mui-dialog-title">{this.props.title}</h3>
          <div ref="dialogContent" className="mui-dialog-content">
            {this.state.open ? this.props.children : ''}
          </div>
          <div className="mui-dialog-actions">
            <div className="mui-dialog-actions-right">{actions}</div>
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

  _getDialogActions: function() {
    return this.props.actions.map(function(a, index) {

      var onClickHandler = a.onClick ? a.onClick : this.dismiss;
      return (
        <FlatButton
          className="mui-dialog-action"
          key={index}
          primary={true}
          onClick={onClickHandler}
          label={a.text} />
      );

    }.bind(this));
  },

  _positionDialog: function() {
    
    if (this.state.open) {

      var container = this.getDOMNode(),
        dialogWindow = this.refs.dialogWindow.getDOMNode(),
        dialogContent = this.refs.dialogContent.getDOMNode(),
        containerHeight = container.offsetHeight,
        dialogWindowHeight = dialogWindow.offsetHeight,
        dialogContentHeight = dialogContent.offsetHeight;

      //Vertically center the dialog window, but make sure it doesn't
      //transition to that position.
      container.style.paddingTop = ((containerHeight - dialogWindowHeight) / 2) - 64 + 'px';

      //This is needed to keep the height from changing when the dialog
      //gets closed
      dialogContent.style.height = dialogContentHeight + 'px';

    }
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