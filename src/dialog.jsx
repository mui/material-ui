let React = require('react');
let WindowListenable = require('./mixins/window-listenable');
let CssEvent = require('./utils/css-event');
let KeyCode = require('./utils/key-code');
let Transitions = require('./styles/transitions');
let StylePropable = require('./mixins/style-propable');
let FlatButton = require('./flat-button');
let Overlay = require('./overlay');
let Paper = require('./paper');

let ReactTransitionGroup = React.addons.TransitionGroup;

let TransitionItem = React.createClass({
  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      style: {},
    };
  },

  componentWillEnter(callback) {
    let spacing = this.context.muiTheme.spacing;

    this.setState({
      style: {
        opacity: 1,
        transform: 'translate3d(0, ' + spacing.desktopKeylineIncrement + 'px, 0)',
      },
    });

    setTimeout(callback, 450); // matches transition duration
  },

  componentWillLeave(callback) {
    this.setState({
      style: {
        opacity: 0,
        transform: 'translate3d(0, 0, 0)',
      },
    });

    setTimeout(callback, 450); // matches transition duration
  },

  render() {
    let {
      style,
      ...other,
    } = this.props;

    return <div {...other} style={this.mergeAndPrefix(this.state.style, style)}>
        {this.props.children}
      </div>;
  },
});

let Dialog = React.createClass({

  mixins: [WindowListenable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    actions: React.PropTypes.array,
    autoDetectWindowHeight: React.PropTypes.bool,
    autoScrollBodyContent: React.PropTypes.bool,
    bodyStyle: React.PropTypes.object,
    contentClassName: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
    modal: React.PropTypes.bool,
    openImmediately: React.PropTypes.bool,
    onClickAway: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    repositionOnUpdate: React.PropTypes.bool,
    title: React.PropTypes.node,
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
    resize: '_positionDialog',
  },

  getDefaultProps() {
    return {
      autoDetectWindowHeight: false,
      autoScrollBodyContent: false,
      actions: [],
      modal: false,
      repositionOnUpdate: true,
    };
  },

  getInitialState() {
    return {
      open: this.props.openImmediately || false,
    };
  },

  componentDidMount() {
    this._positionDialog();
    if (this.props.openImmediately) {
      this.refs.dialogOverlay.preventScrolling();
      this._onShow();
    }
  },

  componentDidUpdate() {
    this._positionDialog();
  },

  getStyles() {
    let spacing = this.context.muiTheme.spacing;

    let main = {
      position: 'fixed',
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      zIndex: 10,
      top: 0,
      left: -10000,
      width: '100%',
      height: '100%',
      transition: Transitions.easeOut('0ms', 'left', '450ms'),
    };

    let content = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      transition: Transitions.easeOut(),
      position: 'relative',
      width: '75%',
      maxWidth: spacing.desktopKeylineIncrement * 12,
      margin: '0 auto',
      zIndex: 10,
    };

    let body = {
      padding: spacing.desktopGutter,
      overflowY: this.props.autoScrollBodyContent ? 'auto' : 'hidden',
      overflowX: 'hidden',
    };

    let gutter = spacing.desktopGutter + 'px ';
    let title = {
        margin: 0,
        padding: gutter + gutter + '0 ' + gutter,
        color: this.context.muiTheme.palette.textColor,
        fontSize: 24,
        lineHeight: '32px',
        fontWeight: '400',
    };


    if (this.state.open) {
      main = this.mergeAndPrefix(main, {
        left: 0,
        transition: Transitions.easeOut('0ms', 'left', '0ms'),
      });
    }

    return {
      main: this.mergeAndPrefix(main, this.props.style),
      content: this.mergeAndPrefix(content, this.props.contentStyle),
      paper: {
        background: this.context.muiTheme.canvasColor,
      },
      body: this.mergeStyles(body, this.props.bodyStyle),
      title: this.mergeStyles(title, this.props.titleStyle),
    };
  },

  render() {
    let styles = this.getStyles();
    let actions = this._getActionsContainer(this.props.actions);
    let title;
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ?
        <h3 style={styles.title}>{this.props.title}</h3> :
        this.props.title;
    }

    return (
      <div ref="container" style={styles.main}>
        <ReactTransitionGroup component="div" ref="dialogWindow">
          {this.state.open &&
            <TransitionItem
              className={this.props.contentClassName}
              style={styles.content}>
              <Paper
                style={styles.paper}
                zDepth={4}>
                {title}

                <div ref="dialogContent" style={styles.body}>
                  {this.props.children}
                </div>

                {actions}
            </Paper>
          </TransitionItem>}
        </ReactTransitionGroup>
        <Overlay
          ref="dialogOverlay"
          show={this.state.open}
          autoLockScrolling={false}
          onTouchTap={this._handleOverlayTouchTap} />
      </div>
    );
  },

  isOpen() {
    return this.state.open;
  },

  dismiss() {
    CssEvent.onTransitionEnd(this.getDOMNode(), () => {
      this.refs.dialogOverlay.allowScrolling();
    }.bind(this));

    this.setState({ open: false });
    this._onDismiss();
  },

  show() {
    this.refs.dialogOverlay.preventScrolling();
    this.setState({ open: true }, this._onShow);
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
      style: styles,
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

  _getActionsContainer(actions) {
    let actionContainer;
    let actionObjects = [];
    let actionStyle = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
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
    if (this.state.open) {
      let clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      let container = this.getDOMNode();
      let dialogWindow = this.refs.dialogWindow.getDOMNode();
      let dialogContent = this.refs.dialogContent.getDOMNode();
      let minPaddingTop = 16;

      //Reset the height in case the window was resized.
      dialogWindow.style.height = '';
      dialogContent.style.height = '';

      let dialogWindowHeight = dialogWindow.offsetHeight;
      let paddingTop = ((clientHeight - dialogWindowHeight) / 2) - 64;
      if (paddingTop < minPaddingTop) paddingTop = minPaddingTop;

      //Vertically center the dialog window, but make sure it doesn't
      //transition to that position.
      if (this.props.repositionOnUpdate || !container.style.paddingTop) {
        container.style.paddingTop = paddingTop + 'px';
      }

      // Force a height if the dialog is taller than clientHeight
      if (this.props.autoDetectWindowHeight || this.props.autoScrollBodyContent) {
        let styles = this.getStyles();
        let maxDialogContentHeight = clientHeight - 2 * (styles.body.padding + paddingTop + 64);

        if (this.props.title) maxDialogContentHeight -= dialogContent.previousSibling.offsetHeight;
        if (this.props.actions) maxDialogContentHeight -= dialogContent.nextSibling.offsetHeight;

        dialogContent.style.maxHeight = maxDialogContentHeight + 'px';
      }
    }
  },

  _onShow() {
    if (this.props.onShow) this.props.onShow();
  },

  _onDismiss() {
    if (this.props.onDismiss) this.props.onDismiss();
  },

  _handleOverlayTouchTap(e) {
    if (this.props.modal) {
      e.stopPropagation();
    }
    else {
      this.dismiss();
      if (this.props.onClickAway) this.props.onClickAway();
    }
  },

  _handleWindowKeyUp(e) {
    if (e.keyCode === KeyCode.ESC && !this.props.modal) {
      this.dismiss();
    }
  },

});

module.exports = Dialog;
