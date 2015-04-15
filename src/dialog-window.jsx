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

  mixins: [WindowListenable, StylePropable],
  
  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    actions: React.PropTypes.array,
    contentClassName: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
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
    if (this.props.openImmediately) {
      this.refs.dialogOverlay.preventScrolling();
      this._onShow();
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    this._positionDialog();
  },

  /** Styles */
  _main: function() {
    var style = {
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
    };

    if (this.state.open) {
      style = this.mergeAndPrefix(style, {
        left: 0,
        transition: Transitions.easeOut('0ms', 'left', '0ms'),
      });
    }

    return this.mergeAndPrefix(style);
  },

  _contents: function() {
    var style = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      transition: Transitions.easeOut(),
      position: 'relative',
      width: '75%',
      maxWidth: (this.getSpacing().desktopKeylineIncrement * 12),
      margin: '0 auto',
      zIndex: 10,
      background: this.getTheme().palette.canvasColor,
      opacity: 0,
    };

    if (this.state.open) {
      style = this.mergeStyles(style, {
        opacity: 1,
        top: 0,
        transform: 'translate3d(0, ' + this.getSpacing().desktopKeylineIncrement + 'px, 0)',
      });
    }

    return this.mergeAndPrefix(style, this.props.contentStyle);
  },

  getTheme: function() {
    return this.context.theme;
  },

  getSpacing: function() {
    return this.context.theme.spacing;
  },

  render: function() {
    var actions = this._getActionsContainer(this.props.actions);

    return (
      <div ref="container" style={this._main()}>
        <Paper
          ref="dialogWindow"
          style={this._contents()}
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
    CssEvent.onTransitionEnd(this.getDOMNode(), function() {
      this.refs.dialogOverlay.allowScrolling();
    }.bind(this));

    this.setState({ open: false });
    this._onDismiss();
  },

  show: function() {
    this.refs.dialogOverlay.preventScrolling();
    this.setState({ open: true });
    this._onShow();
  },

  _getAction: function(actionJSON, key) {
    var onClickHandler = actionJSON.onClick ? actionJSON.onClick : this.dismiss;
    var styles = {marginRight: 8};

    return (
      <FlatButton
        key={key}
        secondary={true}
        onClick={onClickHandler}
        label={actionJSON.text}
        style={styles}/>
    );
  },

  _getActionsContainer: function(actions) {
    var actionContainer;
    var actionObjects = [];
    var actionStyle = {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
      padding: 8,
      marginBottom: 8,
      width: '100%',
      textAlign: 'right',
    };

    if (actions.length) {
      for (var i = 0; i < actions.length; i++) {
        currentAction = actions[i];

        //if the current action isn't a react object, create one
        if (!React.isValidElement(currentAction)) {
          currentAction = this._getAction(currentAction, i);
        }

        actionObjects.push(currentAction);
      };

      actionContainer = (
        <div style={actionStyle}>
          {actionObjects}
        </div>
      );
    }

    return actionContainer;
  },

  _positionDialog: function() {

    var container = this.getDOMNode();
    var dialogWindow = this.refs.dialogWindow.getDOMNode();
    var containerHeight = container.offsetHeight;

    //Reset the height in case the window was resized.
    dialogWindow.style.height = '';
    var dialogWindowHeight = dialogWindow.offsetHeight;

    var paddingTop = ((containerHeight - dialogWindowHeight) / 2) - 64;

    //Vertically center the dialog window, but make sure it doesn't
    //transition to that position.
    if (this.props.repositionOnUpdate || !container.style.paddingTop) {
      container.style.paddingTop = paddingTop + 'px';
    }

  },

  _onShow: function() {
    if (this.props.onShow) this.props.onShow();
  },

  _onDismiss: function() {
    if (this.props.onDismiss) this.props.onDismiss();
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
