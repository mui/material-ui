var React = require('react');
var WindowListenable = require('./mixins/window-listenable.js');
var CssEvent = require('./utils/css-event.js');
var KeyCode = require('./utils/key-code.js');
var Classable = require('./mixins/classable');
var Overlay = require('./overlay.jsx');
var Paper = require('./paper.jsx');

var DialogWindow = React.createClass({

  mixins: [Classable, WindowListenable],

  propTypes: {
    actions: React.PropTypes.array,
    contentClassName: React.PropTypes.string,
    openImmediately: React.PropTypes.bool,
    onClickAway: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    repositionOnUpdate: React.PropTypes.bool
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      actions: [],
      repositionOnUpdate: true
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
    var classes = this.getClasses('mui-dialog-window', { 
      'mui-is-shown': this.state.open
    });
    var contentClasses = 'mui-dialog-window-contents';
    var actions = this._getActions();

    if (this.props.contentClassName) {
      contentClasses += ' ' + this.props.contentClassName;
    }

    return (
      <div className={classes}>
        <Paper ref="dialogWindow" className={contentClasses} zDepth={4}>
          {this.props.children}
          {actions}
        </Paper>
        <Overlay show={this.state.open} onTouchTap={this._handleOverlayTouchTap} />
      </div>
    );
  },

  isOpen: function() {
    return this.state.open;
  },

  dismiss: function() {

    CssEvent.onTransitionEnd(this.getDOMNode(), function() {
      //allow scrolling
      var body = document.getElementsByTagName('body')[0];
      body.style.overflow = '';
      body.style.position = '';
    });

    this.setState({ open: false });
    if (this.props.onDismiss) this.props.onDismiss();
  },

  show: function() {
    //prevent scrolling
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';

    this.setState({ open: true });
    if (this.props.onShow) this.props.onShow();
  },

  _getActions: function() {
    var actionContainer;
    var actions = this.props.actions;
    var actionClassName;

    if (actions.length) {

      for (var i = 0; i < actions.length; i++) {
        actionClassName = actions[i].props.className;

        actions[i].props.className = actionClassName ?
          actionClassName + ' mui-dialog-window-action' :
          'mui-dialog-window-action';
      };

      actionContainer = (
        <div className="mui-dialog-window-actions">
          {actions}
        </div>
      );

    }

    return actionContainer;
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
      if (this.props.repositionOnUpdate || !container.style.paddingTop) {
        container.style.paddingTop = 
          ((containerHeight - dialogWindowHeight) / 2) - 64 + 'px';
      }
      

    }
  },

  _handleOverlayTouchTap: function() {
    this.dismiss();
    if (this.props.onClickAway) this.props.onClickAway();
  },

  _handleWindowKeyUp: function(e) {
    if (e.keyCode == KeyCode.ESC) {
      this.dismiss();
    }
  }

});

module.exports = DialogWindow;