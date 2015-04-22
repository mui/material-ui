var React = require('react');
var WindowListenable = require('./mixins/window-listenable');
var CssEvent = require('./utils/css-event');
var KeyCode = require('./utils/key-code');
var Classable = require('./mixins/classable');
var FlatButton = require('./flat-button');
var Overlay = require('./overlay');
var Paper = require('./paper');

var DialogWindow = React.createClass({

  mixins: [Classable, WindowListenable],

  propTypes: {
    actions: React.PropTypes.array,
    actionFocus: React.PropTypes.string,
    contentClassName: React.PropTypes.string,
    openImmediately: React.PropTypes.bool,
    onClickAway: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    repositionOnUpdate: React.PropTypes.bool,
    modal: React.PropTypes.bool
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      actions: [],
      repositionOnUpdate: true,
      modal: false
    };
  },

  getInitialState: function() {
    return {
      open: this.props.openImmediately || false
    };
  },

  componentDidMount: function() {
    this._positionDialog();
    if (this.props.openImmediately) {
      this.refs.dialogOverlay.preventScrolling();
      this._onShow();
      this._focusOnAction();
    }
  },

  componentDidUpdate: function (prevProps, prevState) {
    this._positionDialog();
    this._focusOnAction();
  },

  render: function() {
    var classes = this.getClasses('mui-dialog-window', { 
      'mui-is-shown': this.state.open
    });
    var contentClasses = 'mui-dialog-window-contents';
    var actions = this._getActionsContainer(this.props.actions);

    if (this.props.contentClassName) {
      contentClasses += ' ' + this.props.contentClassName;
    }

    return (
      <div className={classes}>
        <Paper ref="dialogWindow" className={contentClasses} zDepth={4}>
          {this.props.children}
          {actions}
        </Paper>
        <Overlay ref="dialogOverlay" show={this.state.open} autoLockScrolling={false} onTouchTap={this._handleOverlayTouchTap} />
      </div>
    );
  },

  isOpen: function() {
    return this.state.open;
  },

  dismiss: function() {
    CssEvent.onTransitionEnd(React.findDOMNode(this), function() {
      this.refs.dialogOverlay.allowScrolling();
    }.bind(this));

    this.setState({ open: false });
    this._onDismiss();
  },

  show: function() {
    this.refs.dialogOverlay.preventScrolling();
    this._focusOnAction();

    this.setState({ open: true });
    this._onShow();
  },

  _addClassName: function(reactObject, className) {
    var originalClassName = reactObject.props.className;
    var newClassname = originalClassName ? originalClassName + ' ' + className : className;

    return React.cloneElement(reactObject, { className: newClassname });
  },

  _getAction: function(actionJSON, key) {
    var props = {
      key: key,
      secondary: true,
      onClick: actionJSON.onClick ? actionJSON.onClick : this.dismiss,
      label: actionJSON.text
    };
    if (actionJSON.ref) {
      props.ref = actionJSON.ref;
      props.keyboardFocused = actionJSON.ref === this.props.actionFocus;
    }
    
    return (
      <FlatButton
        {...props} />
    );
  },

  _getActionsContainer: function(actions) {
    var actionContainer;
    var actionObjects = [];

    if (actions.length) {
      for (var i = 0; i < actions.length; i++) {
        var currentAction = actions[i];

        //if the current action isn't a react object, create one
        if (!React.isValidElement(currentAction)) {
          currentAction = this._getAction(currentAction, i);
        }

        currentAction = this._addClassName(currentAction, 'mui-dialog-window-action');
        actionObjects.push(currentAction);
      };

      actionContainer = (
        <div className="mui-dialog-window-actions">
          {actionObjects}
        </div>
      );
    }

    return actionContainer;
  },

  _positionDialog: function() {
    var container, dialogWindow, containerHeight, dialogWindowHeight;

    if (this.state.open) {

      container = React.findDOMNode(this),
      dialogWindow = React.findDOMNode(this.refs.dialogWindow),
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
  
  _focusOnAction: function() {
    if (this.props.actionFocus) {
      React.findDOMNode(this.refs[this.props.actionFocus]).focus();
    }
  },
  
  _onShow: function() {
    if (this.props.onShow) this.props.onShow();
  },
  
  _onDismiss: function() {
    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleOverlayTouchTap: function() {
    if (!this.props.modal) {
      this.dismiss();
      if (this.props.onClickAway) this.props.onClickAway();
    }
  },

  _handleWindowKeyUp: function(e) {
    if (!this.props.modal && e.keyCode == KeyCode.ESC) {
      this.dismiss();
    }
  }

});

module.exports = DialogWindow;
