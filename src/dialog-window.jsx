var React = require('react');
var WindowListenable = require('./mixins/window-listenable');
var CssEvent = require('./utils/css-event');
var KeyCode = require('./utils/key-code');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var FlatButton = require('./flat-button');
var Overlay = require('./overlay');
var Paper = require('./paper');

var DialogWindow = React.createClass({

  closeable: false,

  mixins: [WindowListenable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    actions: React.PropTypes.array,
    actionFocus: React.PropTypes.string,
    contentClassName: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
    openImmediately: React.PropTypes.bool,
    onClickAway: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    repositionOnUpdate: React.PropTypes.bool,
    modal: React.PropTypes.bool
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp',
    'resize': '_positionDialog'
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
      this.show();
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    this._positionDialog();
    this._focusOnAction();
  },

  getTheme: function() {
    return this.context.muiTheme;
  },

  getSpacing: function() {
    return this.context.muiTheme.spacing;
  },

  getStyles: function() {
    var styles = {
      root: {
        position: 'fixed',
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        zIndex: 10,
        top: 0,
        left: -10000,
        width: '100%',
        height: '100%',
        transition: Transitions.easeOut('0ms', 'left', '450ms'),
        color: this.getTheme().palette.textColor
      },
      contents: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        transition: Transitions.easeOut(),
        position: 'relative',
        width: '75%',
        maxWidth: (this.getSpacing().desktopKeylineIncrement * 12),
        margin: '0 auto',
        zIndex: 10,
        background: this.getTheme().palette.canvasColor,
        opacity: 0
      },
      rootWhenOpen: {
        left: 2,
        transition: Transitions.easeOut('0ms', 'left', '0ms')
      },
      contentsWhenOpen: {
        opacity: 1,
        top: 0,
        transform: 'translate3d(0, ' + this.getSpacing().desktopKeylineIncrement + 'px, 0)'
      }
    };
    return styles;
  },

  render: function() {
    var actions = this._getActionsContainer(this.props.actions);
    var styles = this.getStyles();

    return (
      <div ref="container" style={this.mergeAndPrefix(styles.root, this.props.style, this.state.open && styles.rootWhenOpen)}>
        <Paper
          ref="dialogWindow"
          style={this.mergeAndPrefix(styles.contents, this.props.contentStyle, this.state.open && styles.contentsWhenOpen)}
          className={this.props.contentClassName}
          zDepth={4}>
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
    if (this.closeable) {
      CssEvent.onTransitionEnd(React.findDOMNode(this), function() {
        this.refs.dialogOverlay.allowScrolling();
      }.bind(this));

      this.setState({ open: false });
      this._onDismiss();
    }
  },

  show: function() {
    // prevent rapid show/hide
    setTimeout(function(){this.closeable = true;}.bind(this), 250);

    this.refs.dialogOverlay.preventScrolling();
    this._focusOnAction();
    this.setState({ open: true });
    this._onShow();
  },

  _getAction: function(actionJSON, key) {
    var styles = {marginRight: 8};
    var props = {
      key: key,
      secondary: true,
      onClick: actionJSON.onClick,
      onTouchTap: () => {
        if (actionJSON.onTouchTap) {
          actionJSON.onTouchTap.call(undefined);
        }
        if (!(actionJSON.onClick || actionJSON.onTouchTap)) {
          this.dismiss();
        }
      },
      label: actionJSON.text,
      style: styles
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

  _getActionsContainer: function(actions) { //json w/ refs
    var actionContainer;
    var actionObjects = [];
    var actionStyle = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(s0,0,0,0)',
      padding: 8,
      marginBottom: 8,
      width: '100%',
      textAlign: 'right',
    };

    if (actions.length) {
      for (var i = 0; i < actions.length; i++) {
        var currentAction = actions[i];

        //if the current action isn't a react object, create one
        if (!React.isValidElement(currentAction)) {
          currentAction = this._getAction(currentAction, i);
        }
        actionObjects.push(currentAction);
      }

      actionContainer = (
        <div style={actionStyle}>
          {actionObjects}
        </div>
      );
    }

    return actionContainer;
  },

  _positionDialog: function() {
    var container = React.findDOMNode(this);
    var dialogWindow = React.findDOMNode(this.refs.dialogWindow);
    var containerHeight = container.offsetHeight;
    var dialogWindowHeight = dialogWindow.offsetHeight;

    //Reset the height in case the window was resized.
    dialogWindow.style.height = '';

    var paddingTop = Math.max(((containerHeight - dialogWindowHeight) / 2) - 64, 0);

    //Vertically center the dialog window, but make sure it doesn't
    //transition to that position.
    if (this.props.repositionOnUpdate || !container.style.paddingTop) {
      container.style.paddingTop = paddingTop + 'px';
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
    if (!this.props.modal && this.closeable) {
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
