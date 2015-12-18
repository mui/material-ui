import React from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import WindowListenable from '../mixins/window-listenable';
import KeyCode from '../utils/key-code';
import Transitions from '../styles/transitions';
import FlatButton from '../flat-button';
import Overlay from '../overlay';
import Paper from '../paper';
import styleUtils from '../utils/styles';
import warning from 'warning';
import DialogTransitionItem from './DialogTransitionItem';

const DialogInline = React.createClass({

  mixins: [WindowListenable],

  propTypes: {
    _muiTheme: React.PropTypes.object.isRequired,
    actionFocus: React.PropTypes.string,
    actions: React.PropTypes.node,
    actionsContainerClassName: React.PropTypes.string,
    actionsContainerStyle: React.PropTypes.object,
    autoDetectWindowHeight: React.PropTypes.bool,
    autoScrollBodyContent: React.PropTypes.bool,
    bodyClassName: React.PropTypes.string,
    bodyStyle: React.PropTypes.object,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    contentClassName: React.PropTypes.string,
    contentStyle: React.PropTypes.object,
    modal: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func,
    open: React.PropTypes.bool.isRequired,
    overlayClassName: React.PropTypes.string,
    overlayStyle: React.PropTypes.object,
    repositionOnUpdate: React.PropTypes.bool,
    style: React.PropTypes.object,
    title: React.PropTypes.node,
    titleClassName: React.PropTypes.string,
    titleStyle: React.PropTypes.object,
    width: React.PropTypes.any,
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
    resize: '_handleResize',
  },

  componentDidMount() {
    this._positionDialog();
  },

  componentDidUpdate() {
    this._positionDialog();
  },

  getStyles() {
    const {
      _muiTheme,
      autoScrollBodyContent,
      open,
      width,
    } = this.props;

    const baseTheme = _muiTheme.baseTheme;
    const spacing = baseTheme.spacing;
    const gutter = spacing.desktopGutter;

    return {
      root: {
        position: 'fixed',
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        zIndex: _muiTheme.zIndex.dialog,
        top: 0,
        left: open ? 0 : -10000,
        width: '100%',
        height: '100%',
        transition: open
          ? Transitions.easeOut('0ms', 'left', '0ms')
          : Transitions.easeOut('0ms', 'left', '450ms'),
      },
      content: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        transition: Transitions.easeOut(),
        position: 'relative',
        width: width,
        maxWidth: spacing.desktopKeylineIncrement * 12,
        margin: '0 auto',
        zIndex: _muiTheme.zIndex.dialog,
      },
      body: {
        padding: gutter,
        overflowY: autoScrollBodyContent ? 'auto' : 'hidden',
        overflowX: 'hidden',
      },
      actionsContainer: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        padding: 8,
        marginBottom: 8,
        width: '100%',
        textAlign: 'right',
      },
      paper: {
        background: baseTheme.palette.canvasColor,
      },
      overlay: {
        zIndex: _muiTheme.zIndex.dialogOverlay,
      },
      title: {
        margin: 0,
        padding: `${gutter}px ${gutter}px 0 ${gutter}px`,
        color: baseTheme.palette.textColor,
        fontSize: 24,
        lineHeight: '32px',
        fontWeight: 400,
      },
    };
  },

  render() {
    const {
      _muiTheme,
      actions,
      actionsContainerClassName,
      actionsContainerStyle,
      bodyClassName,
      bodyStyle,
      children,
      className,
      contentClassName,
      contentStyle,
      overlayClassName,
      overlayStyle,
      open,
      titleClassName,
      titleStyle,
      title,
      style,
    } = this.props;

    const styles = this.getStyles();

    styles.root = styleUtils.merge(styles.root, style);
    styles.content = styleUtils.merge(styles.content, contentStyle);
    styles.body = styleUtils.merge(styles.body, bodyStyle);
    styles.actionsContainer = styleUtils.merge(styles.actionsContainer, actionsContainerStyle);
    styles.overlay = styleUtils.merge(styles.overlay, overlayStyle);
    styles.title = styleUtils.merge(styles.title, titleStyle);

    const actionsContainer = this._getActionsContainer(actions, styles.actionsContainer, actionsContainerClassName);

    const titleElement = typeof title === 'string'
        ? <h3 className={titleClassName} style={styleUtils.prepareStyles(_muiTheme, styles.title)}>{title}</h3>
        : title;

    return (
      <div className={className} style={styleUtils.prepareStyles(_muiTheme, styles.root)}>
        <ReactTransitionGroup component="div" ref="dialogWindow"
          transitionAppear={true} transitionAppearTimeout={450}
          transitionEnter={true} transitionEnterTimeout={450}>
          {open &&
            <DialogTransitionItem
              _muiTheme={_muiTheme}
              className={contentClassName}
              style={styles.content}>
              <Paper
                style={styles.paper}
                zDepth={4}>
                {titleElement}
                <div
                  ref="dialogContent"
                  className={bodyClassName}
                  style={styleUtils.prepareStyles(_muiTheme, styles.body)}
                >
                  {children}
                </div>
                {actionsContainer}
            </Paper>
          </DialogTransitionItem>}
        </ReactTransitionGroup>
        <Overlay
          show={open}
          className={overlayClassName}
          style={styles.overlay}
          onTouchTap={this._handleOverlayTouchTap} />
      </div>
    );
  },

  _getAction(actionJSON) {
    warning(false, `using actionsJSON is deprecated on Dialog, please provide an array of
 buttons, or any other components instead. For more information please refer to documentations.`);
    const props = {
      secondary: true,
      onClick: actionJSON.onClick,
      onTouchTap: () => {
        if (actionJSON.onTouchTap) {
          actionJSON.onTouchTap.call(undefined);
        }
        if (!(actionJSON.onClick || actionJSON.onTouchTap)) {
          this._requestClose(true);
        }
      },
      label: actionJSON.text,
      style: {
        marginRight: 8,
      },
    };

    if (actionJSON.ref) {
      props.ref = actionJSON.ref;
      props.keyboardFocused = actionJSON.ref === this.props.actionFocus;
    }
    if (actionJSON.id) {
      props.id = actionJSON.id;
    }

    return (
      <FlatButton {...props} />
    );
  },

  _getActionObjects(actions) {
    const actionObjects = [];

    // ------- Replace this selction with:
    //
    // React.Children.forEach(actions, action => {
    //   if (React.isValidElement(action)) {
    //     actionObjects.push(action);
    //   }
    // });
    //
    // Also the return element will not need a call to React.Children.toArray
    //
    // for the 0.15.0 release

    if (actions) {

      if (React.isValidElement(actions)) {
        actionObjects.push(actions);
      } else {
        actions.forEach(action => {
          if (action) {
            if (!React.isValidElement(action)) {
              action = this._getAction(action);
            }
            actionObjects.push(action);
          }
        });
      }
    }

    // ------- End of section

    return actionObjects;
  },

  _getActionsContainer(actions, styles, className) {
    const actionObjects = this._getActionObjects(actions);

    return actionObjects.length > 0 && (
      <div className={className} style={styleUtils.prepareStyles(this.props._muiTheme, styles)}>
        {React.Children.toArray(actionObjects)}
      </div>
    );
  },

  _positionDialog() {
    const {
      actions,
      autoDetectWindowHeight,
      autoScrollBodyContent,
      bodyStyle,
      open,
      repositionOnUpdate,
      title,
    } = this.props;

    if (!open) {
      return;
    }

    const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const container = ReactDOM.findDOMNode(this);
    const dialogWindow = ReactDOM.findDOMNode(this.refs.dialogWindow);
    const dialogContent = ReactDOM.findDOMNode(this.refs.dialogContent);
    const minPaddingTop = 16;

    //Reset the height in case the window was resized.
    dialogWindow.style.height = '';
    dialogContent.style.height = '';

    const dialogWindowHeight = dialogWindow.offsetHeight;
    let paddingTop = ((clientHeight - dialogWindowHeight) / 2) - 64;
    if (paddingTop < minPaddingTop) paddingTop = minPaddingTop;

    //Vertically center the dialog window, but make sure it doesn't
    //transition to that position.
    if (repositionOnUpdate || !container.style.paddingTop) {
      container.style.paddingTop = paddingTop + 'px';
    }

    // Force a height if the dialog is taller than clientHeight
    if (autoDetectWindowHeight || autoScrollBodyContent) {
      const styles = this.getStyles();
      styles.body = styleUtils.merge(styles.body, bodyStyle);
      let maxDialogContentHeight = clientHeight - 2 * (styles.body.padding + 64);

      if (title) maxDialogContentHeight -= dialogContent.previousSibling.offsetHeight;

      const hasActions = this._getActionObjects(actions).length > 0;
      if (hasActions) maxDialogContentHeight -= dialogContent.nextSibling.offsetHeight;

      dialogContent.style.maxHeight = maxDialogContentHeight + 'px';
    }
  },

  _requestClose(buttonClicked) {

    if (!buttonClicked && this.props.modal) {
      return;
    }

    if (this.props.onRequestClose) {
      this.props.onRequestClose(!!buttonClicked);
    }
  },

  _handleOverlayTouchTap() {
    this._requestClose(false);
  },

  _handleWindowKeyUp(event) {
    if (event.keyCode === KeyCode.ESC) {
      this._requestClose(false);
    }
  },

  _handleResize() {
    if (this.props.open) {
      this._positionDialog();
    }
  },

});

export default DialogInline;
