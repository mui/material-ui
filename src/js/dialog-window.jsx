var React = require('react'),
  WindowListenable = require('./mixins/window-listenable.js'),
  KeyCode = require('./utils/key-code.js'),
  Classable = require('./mixins/classable'),
  Overlay = require('./overlay.jsx'),
  Paper = require('./paper.jsx');

var DialogWindow = React.createClass({

  mixins: [Classable, WindowListenable],

  propTypes: {
    openImmediately: React.PropTypes.bool,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
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
    var classes = this.getClasses('mui-dialog-window', { 
      'mui-is-shown': this.state.open
    });

    return (
      <div className={classes}>
        <Paper ref="dialogWindow" className="mui-dialog-window-contents" zDepth={4}>
          {this.state.open ? this.props.children : ''}
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
    var container, dialogWindow, containerHeight, dialogWindowHeight;

    if (this.state.open) {

      container = this.getDOMNode(),
      dialogWindow = this.refs.dialogWindow.getDOMNode(),
      containerHeight = container.offsetHeight,

      //Reset the height in case the window was resized.
      dialogWindow.style.height = '';
      dialogWindowHeight = dialogWindow.offsetHeight;

      //Vertically center the dialog window, but make sure it doesn't
      //transition to that position.
      container.style.paddingTop = ((containerHeight - dialogWindowHeight) / 2) - 64 + 'px';

      //This is needed to keep the height from changing when the dialog
      //gets closed
      dialogWindow.style.height = dialogWindowHeight + 'px';

    }
  },

  _handleOverlayTouchTap: function() {
    this.dismiss();
  },

  _handleWindowKeyUp: function(e) {
    if (e.keyCode == KeyCode.ESC) {
      this.dismiss();
    }
  }

});

module.exports = DialogWindow;