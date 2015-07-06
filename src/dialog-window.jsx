let React = require('react');
let WindowListenable = require('./mixins/window-listenable');
let CssEvent = require('./utils/css-event');
let KeyCode = require('./utils/key-code');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let FlatButton = require('./flat-button');
let Overlay = require('./overlay');
let Paper = require('./paper');


let DialogWindow = React.createClass({

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

  getDefaultProps() {
    return {
      actions: [],
      repositionOnUpdate: true,
      modal: false
    };
  },

  getInitialState() {
    return {
      open: this.props.openImmediately || false
    };
  },

  componentDidMount() {
    this._positionDialog();
    if (this.props.openImmediately) {
      this.show();
    }
  },

  componentDidUpdate() {
    this._positionDialog();
    this._focusOnAction();
  },

  getTheme() {
    return this.context.muiTheme;
  },

  getSpacing() {
    return this.context.muiTheme.spacing;
  },

  getStyles() {
    let styles = {
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

  render() {
    let actions = this._getActionsContainer(this.props.actions);
    let styles = this.getStyles();

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

  isOpen() {
    return this.state.open;
  },

  dismiss() {
    if (this.closeable) {
      CssEvent.onTransitionEnd(React.findDOMNode(this), () => {
        this.refs.dialogOverlay.allowScrolling();
      });

      this.setState({ open: false });
      this._onDismiss();
    }
  },

  show() {
    // prevent rapid show/hide
    setTimeout(() => {this.closeable = true;}, 250);

    this.refs.dialogOverlay.preventScrolling();
    this._focusOnAction();
    this.setState({ open: true });
    this._onShow();
  },

  _getAction(actionJSON, key) {
    let styles = {marginRight: 8};
    let props = {
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

  _getActionsContainer(actions) { //json w/ refs
    let actionContainer;
    let actionObjects = [];
    let actionStyle = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(s0,0,0,0)',
      padding: 8,
      marginBottom: 8,
      width: '100%',
      textAlign: 'right',
    };

    if (actions.length) {
      for (let i = 0; i < actions.length; i++) {
        let currentAction = actions[i];

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

  _positionDialog() {
    let container = React.findDOMNode(this);
    let dialogWindow = React.findDOMNode(this.refs.dialogWindow);
    let containerHeight = container.offsetHeight;
    let dialogWindowHeight = dialogWindow.offsetHeight;

    //Reset the height in case the window was resized.
    dialogWindow.style.height = '';

    let paddingTop = Math.max(((containerHeight - dialogWindowHeight) / 2) - 64, 0);

    //Vertically center the dialog window, but make sure it doesn't
    //transition to that position.
    if (this.props.repositionOnUpdate || !container.style.paddingTop) {
      container.style.paddingTop = paddingTop + 'px';
    }

  },

  _focusOnAction() {
    if (this.props.actionFocus) {
      React.findDOMNode(this.refs[this.props.actionFocus]).focus();
    }
  },

  _onShow() {
    if (this.props.onShow) this.props.onShow();
  },

  _onDismiss() {
    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleOverlayTouchTap() {
    if (!this.props.modal && this.closeable) {
      this.dismiss();
      if (this.props.onClickAway) this.props.onClickAway();
    }
  },

  _handleWindowKeyUp(e) {
    if (!this.props.modal && e.keyCode == KeyCode.ESC) {
      this.dismiss();
    }
  }

});

module.exports = DialogWindow;
