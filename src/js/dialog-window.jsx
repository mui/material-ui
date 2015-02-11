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

  _addClassName: function(reactObject, className) {
    var originalClassName = reactObject.props.className;

    reactObject.props.className = originalClassName ?
      originalClassName + ' ' + className : className;
  },

  _getAction: function(actionJSON, key) {
    var onClickHandler = actionJSON.onClick ? actionJSON.onClick : this.dismiss;
    return (
      <FlatButton
        key={key}
        secondary={true}
        onClick={onClickHandler}
        label={actionJSON.text} />
    );
  },

  _getActionsContainer: function(actions) {
    var actionContainer;
    var actionObjects = [];

    if (actions.length) {
      for (var i = 0; i < actions.length; i++) {
        currentAction = actions[i];

        //if the current action isn't a react object, create one
        if (!React.isValidElement(currentAction)) {
          currentAction = this._getAction(currentAction, i);
        }

        this._addClassName(currentAction, 'mui-dialog-window-action');
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