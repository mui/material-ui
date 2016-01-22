import React from 'react';
import ReactDOM from 'react-dom';
import WindowListenable from './mixins/window-listenable';
import KeyCode from './utils/key-code';
import Transitions from './styles/transitions';
import StylePropable from './mixins/style-propable';
import FlatButton from './flat-button';
import Overlay from './overlay';
import RenderToLayer from './render-to-layer';
import Paper from './paper';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';
import warning from 'warning';
import deprecated from './utils/deprecatedPropType';

import ReactTransitionGroup from 'react-addons-transition-group';

const TransitionItem = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StylePropable],

  getInitialState() {
    return {
      style: {},
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  componentWillEnter(callback) {
    this.componentWillAppear(callback);
  },

  componentWillAppear(callback) {
    const spacing = this.state.muiTheme.rawTheme.spacing;

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

    setTimeout(() => {
      if (this.isMounted()) callback();
    }, 450); // matches transition duration
  },

  render() {
    const {
      style,
      children,
      ...other,
    } = this.props;

    return (
      <div {...other} style={this.prepareStyles(this.state.style, style)}>
        {children}
      </div>
    );
  },
});

const DialogInline = React.createClass({

  propTypes: {
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

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [WindowListenable, StylePropable],

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    this._positionDialog();
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  componentDidUpdate() {
    this._positionDialog();
  },

  windowListeners: {
    keyup: '_handleWindowKeyUp',
    resize: '_handleResize',
  },

  getStyles() {
    const {
      autoScrollBodyContent,
      open,
      width,
    } = this.props;

    const muiTheme = this.state.muiTheme;
    const rawTheme = muiTheme.rawTheme;
    const spacing = rawTheme.spacing;
    const gutter = spacing.desktopGutter;

    return {
      root: {
        position: 'fixed',
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        zIndex: muiTheme.zIndex.dialog,
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
        width: width || '75%',
        maxWidth: spacing.desktopKeylineIncrement * 12,
        margin: '0 auto',
        zIndex: muiTheme.zIndex.dialog,
      },
      body: {
        padding: spacing.desktopGutter,
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
        background: rawTheme.palette.canvasColor,
      },
      overlay: {
        zIndex: muiTheme.zIndex.dialogOverlay,
      },
      title: {
        margin: 0,
        padding: `${gutter}px ${gutter}px 0 ${gutter}px`,
        color: rawTheme.palette.textColor,
        fontSize: 24,
        lineHeight: '32px',
        fontWeight: 400,
      },
    };
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
      <div className={className} style={this.prepareStyles(styles)}>
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
      styles.body = this.mergeStyles(styles.body, bodyStyle);
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

  render() {
    const {
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

    styles.root = this.mergeStyles(styles.root, style);
    styles.content = this.mergeStyles(styles.content, contentStyle);
    styles.body = this.mergeStyles(styles.body, bodyStyle);
    styles.actionsContainer = this.mergeStyles(styles.actionsContainer, actionsContainerStyle);
    styles.overlay = this.mergeStyles(styles.overlay, overlayStyle);
    styles.title = this.mergeStyles(styles.title, titleStyle);

    const actionsContainer = this._getActionsContainer(actions, styles.actionsContainer, actionsContainerClassName);

    const titleElement = typeof title === 'string'
        ? <h3 className={titleClassName} style={this.prepareStyles(styles.title)}>{title}</h3>
        : title;

    return (
      <div className={className} style={this.prepareStyles(styles.root)}>
        <ReactTransitionGroup
          component="div" ref="dialogWindow"
          transitionAppear={true} transitionAppearTimeout={450}
          transitionEnter={true} transitionEnterTimeout={450}
        >
          {open &&
            <TransitionItem
              className={contentClassName}
              style={styles.content}
            >
              <Paper
                style={styles.paper}
                zDepth={4}
              >
                {titleElement}
                <div
                  ref="dialogContent"
                  className={bodyClassName}
                  style={this.prepareStyles(styles.body)}
                >
                  {children}
                </div>
                {actionsContainer}
              </Paper>
            </TransitionItem>
          }
        </ReactTransitionGroup>
        <Overlay
          show={open}
          className={overlayClassName}
          style={styles.overlay}
          onTouchTap={this._handleOverlayTouchTap}
        />
      </div>
    );
  },

});

const Dialog = React.createClass({

  propTypes: {
    /**
     * The `ref` of the action to focus on when the `Dialog` is displayed.
     */
    actionFocus: deprecated(React.PropTypes.string,
      'Instead, use a custom `actions` property.'),

    /**
     * This prop can be either a JSON object containing the actions to render (This is **DEPRECATED**),
     * a react elements, or an array of react elements.
     */
    actions: React.PropTypes.node,

    /**
     * The `className` to add to the actions container's root element.
     */
    actionsContainerClassName: React.PropTypes.string,

    /**
     * Overrides the inline-styles of the actions container's root element.
     */
    actionsContainerStyle: React.PropTypes.object,

    /**
     * If set to true, the height of the `Dialog` will be auto detected. A max height
     * will be enforced so that the content does not extend beyond the viewport.
     */
    autoDetectWindowHeight: React.PropTypes.bool,

    /**
     * If set to true, the body content of the `Dialog` will be scrollable.
     */
    autoScrollBodyContent: React.PropTypes.bool,

    /**
     * The `className` to add to the content's root element under the title.
     */
    bodyClassName: React.PropTypes.string,

    /**
     * Overrides the inline-styles of the content's root element under the title.
     */
    bodyStyle: React.PropTypes.object,

    /**
     * The contents of the `Dialog`.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * The `className` to add to the content container.
     */
    contentClassName: React.PropTypes.string,

    /**
     * Overrides the inline-styles of the content container.
     */
    contentStyle: React.PropTypes.object,

    /**
     * Force the user to use one of the actions in the `Dialog`.
     * Clicking outside the `Dialog` will not trigger the `onRequestClose`.
     */
    modal: React.PropTypes.bool,

    /**
     * Fired when the `Dialog` is requested to be closed by a click outside the `Dialog` or on the buttons.
     *
     * @param {bool} buttonClicked Determines whether a button click triggered this request.
     */
    onRequestClose: React.PropTypes.func,

    /**
     * Controls whether the Dialog is opened or not.
     */
    open: React.PropTypes.bool.isRequired,

    /**
     * The `className` to add to the `Overlay` component that is rendered behind the `Dialog`.
     */
    overlayClassName: React.PropTypes.string,

    /**
     * Overrides the inline-styles of the `Overlay` component that is rendered behind the `Dialog`.
     */
    overlayStyle: React.PropTypes.object,

    /**
     * Determines whether the `Dialog` should be repositioned when it's contents are updated.
     */
    repositionOnUpdate: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The title to display on the `Dialog`. Could be number, string, element or an array containing these types.
     */
    title: React.PropTypes.node,

    /**
     * The `className` to add to the title's root container element.
     */
    titleClassName: React.PropTypes.string,

    /**
     * Overrides the inline-styles of the title's root container element.
     */
    titleStyle: React.PropTypes.object,

    /**
     * Changes the width of the `Dialog`.
     */
    width: deprecated(React.PropTypes.any,
      'Use the contentStyle.'),
  },

  getDefaultProps() {
    return {
      autoDetectWindowHeight: true,
      autoScrollBodyContent: false,
      modal: false,
      repositionOnUpdate: true,
    };
  },

  renderLayer() {
    return (
      <DialogInline {...this.props} />
    );
  },

  render() {
    return (
      <RenderToLayer render={this.renderLayer} open={true} useLayerForClickAway={false} />
    );
  },

});

export default Dialog;
