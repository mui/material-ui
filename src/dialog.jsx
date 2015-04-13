var React = require('react');
var WindowListenable = require('./mixins/window-listenable');
var CssEvent = require('./utils/css-event');
var DOM = require('./utils/dom');
var KeyCode = require('./utils/key-code');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var FlatButton = require('./flat-button');
var Overlay = require('./overlay');
var Paper = require('./paper');

var Dialog = React.createClass({

  mixins: [WindowListenable, StylePropable],

  propTypes: {
    title: React.PropTypes.node,
    actions: React.PropTypes.array,
    contentClassName: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
    bodyStyle: React.PropTypes.object,
    openImmediately: React.PropTypes.bool,
    onClickAway: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    onShow: React.PropTypes.func,
    repositionOnUpdate: React.PropTypes.bool,
    autoDetectWindowHeight: React.PropTypes.bool,
    autoScrollBodyContent: React.PropTypes.bool
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      actions: [],
      repositionOnUpdate: true,
      autoDetectWindowHeight: false,
      autoScrollBodyContent: false
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
      transition: Transitions.easeOut('0ms', 'left', '450ms')
    };

    if (this.state.open) {
      style = this.mergeAndPrefix(style, {
        left: 0,
        transition: Transitions.easeOut('0ms', 'left', '0ms')
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
      maxWidth: (CustomVariables.spacing.desktopKeylineIncrement * 12),
      margin: '0 auto',
      zIndex: 10,
      background: CustomVariables.canvasColor,
      opacity: 0
    };

    if (this.state.open) {
      style = this.mergeStyles(style, {
        opacity: 1,
        top: 0,
        transform: 'translate3d(0, ' + CustomVariables.spacing.desktopKeylineIncrement + 'px, 0)',
      });
    }

    return this.mergeAndPrefix(style, this.props.contentStyle);
  },
  
  _title: function() {
    var gutter = CustomVariables.spacing.desktopGutter + 'px ';
    return {
      padding: gutter + gutter + '0 ' + gutter,
    }
  },
  
  _dialogBody: function() {
    var style = {
      padding: CustomVariables.spacing.desktopGutter,
      overflowY: this.props.autoScrollBodyContent ? 'auto' : 'hidden',
      overflowX: 'hidden'
    };
    
    return this.mergeStyles(style, this.props.bodyStyle);
  },

  render: function() {
    var title = this._getTitle();
    var actions = this._getActionsContainer(this.props.actions);

    return (
      <div ref="container" style={this._main()}>
        <Paper
          ref="dialogWindow"
          style={this._contents()}
          className={this.props.contentClassName}
          zDepth={4}>
          {title}
          
          <div ref="dialogContent" style={this._dialogBody()}>
            {this.props.children}
          </div>
          
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
  
  _getTitle: function() {
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      return this.props.title === undefined ? '' :
        toString.call(this.props.title) === '[object String]' ?
          <h3 style={this._title()}>{this.props.title}</h3> :
          this.props.title;

    }
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
    var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var container = this.getDOMNode();
    var dialogWindow = this.refs.dialogWindow.getDOMNode();
    var dialogContent = this.refs.dialogContent.getDOMNode();
    var minPaddingTop = 64;
    var dialogWindowHeight;
    var paddingTop;
    var maxDialogWindowHeight;

    //Reset the height in case the window was resized.
    dialogWindow.style.height = '';
    dialogContent.style.height = '';
    
    dialogWindowHeight = dialogWindow.offsetHeight;
    paddingTop = ((clientHeight - dialogWindowHeight) / 2) - 64;
    if (paddingTop < minPaddingTop) paddingTop = minPaddingTop;
    
    //Vertically center the dialog window, but make sure it doesn't
    //transition to that position.
    if (this.props.repositionOnUpdate || !container.style.paddingTop) {
      container.style.paddingTop = paddingTop + 'px';
    }
    
    // Force a height if the dialog is taller than clientHeight
    maxDialogWindowHeight = clientHeight - (2 * paddingTop);
    if ((this.props.autoDetectWindowHeight || this.props.autoScrollBodyContent) 
      && (dialogWindowHeight > maxDialogWindowHeight)) {
      dialogWindow.style.height = maxDialogWindowHeight + 'px';
      
      this._updateContentHeight();
    }
  },
  
  _updateContentHeight: function() {
    if (!this.props.autoScrollBodyContent) return;
    
    var dialogWindow = this.refs.dialogWindow.getDOMNode();
    var dialogContent = this.refs.dialogContent.getDOMNode();
    var container = this.getDOMNode();
    var containerOffset = DOM.getStyleAttributeAsNumber(container, 'paddingTop');
    var dialogWindowHeight = dialogWindow.offsetHeight - containerOffset;
    var dialogContentHeight = dialogContent.offsetHeight;  
    
    // If the content is taller than the window can hold, set the height so the content
    // will scroll.
    if (dialogContentHeight > dialogWindowHeight) {
      var dialogContentPadding = DOM.getStyleAttributeAsNumber(dialogContent, 'paddingTop') + 
        DOM.getStyleAttributeAsNumber(dialogContent, 'paddingBottom');
      var contentHeight = dialogWindowHeight - dialogContentPadding;
      
      if (this.props.title) contentHeight -= dialogContent.previousSibling.offsetHeight;
      if (this.props.actions) contentHeight -= dialogContent.nextSibling.offsetHeight;

      dialogContent.style.height = contentHeight + 'px';
      dialogWindow.style.height = dialogWindowHeight + 'px';
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

module.exports = Dialog;
