import React from 'react';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import Transitions from './styles/transitions';
import Overlay from './overlay';
import RenderToLayer from './render-to-layer';
import Paper from './paper';
import getMuiTheme from './styles/getMuiTheme';

import ReactTransitionGroup from 'react-addons-transition-group';

const TransitionItem = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      style: {},
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  componentWillUnmount() {
    clearTimeout(this.enterTimeout);
    clearTimeout(this.leaveTimeout);
  },

  componentWillEnter(callback) {
    this.componentWillAppear(callback);
  },

  componentWillAppear(callback) {
    const spacing = this.state.muiTheme.baseTheme.spacing;

    this.setState({
      style: {
        opacity: 1,
        transform: `translate3d(0, ${spacing.desktopKeylineIncrement}px, 0)`,
      },
    });

    this.enterTimeout = setTimeout(callback, 450); // matches transition duration
  },

  componentWillLeave(callback) {
    this.setState({
      style: {
        opacity: 0,
        transform: 'translate3d(0, 0, 0)',
      },
    });

    this.leaveTimeout = setTimeout(callback, 450); // matches transition duration
  },

  render() {
    const {
      style,
      children,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    return (
      <div {...other} style={prepareStyles(Object.assign({}, this.state.style, style))}>
        {children}
      </div>
    );
  },
});

function getStyles(props, state) {
  const {
    autoScrollBodyContent,
    open,
  } = props;

  const {
    baseTheme,
    zIndex,
  } = state.muiTheme;

  const gutter = baseTheme.spacing.desktopGutter;

  return {
    root: {
      position: 'fixed',
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      zIndex: zIndex.dialog,
      top: 0,
      left: open ? 0 : -10000,
      width: '100%',
      height: '100%',
      transition: open ?
        Transitions.easeOut('0ms', 'left', '0ms') :
        Transitions.easeOut('0ms', 'left', '450ms'),
    },
    content: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      transition: Transitions.easeOut(),
      position: 'relative',
      width: '75%',
      maxWidth: baseTheme.spacing.desktopKeylineIncrement * 12,
      margin: '0 auto',
      zIndex: zIndex.dialog,
    },
    body: {
      padding: baseTheme.spacing.desktopGutter,
      overflowY: autoScrollBodyContent ? 'auto' : 'hidden',
    },
    actionsContainer: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      padding: 8,
      marginBottom: 8,
      width: '100%',
      textAlign: 'right',
    },
    overlay: {
      zIndex: zIndex.dialogOverlay,
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
}

const DialogInline = React.createClass({

  propTypes: {
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
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
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
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  componentDidUpdate() {
    this._positionDialog();
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
      container.style.paddingTop = `${paddingTop}px`;
    }

    // Force a height if the dialog is taller than clientHeight
    if (autoDetectWindowHeight || autoScrollBodyContent) {
      const styles = getStyles(this.props, this.state);
      styles.body = Object.assign(styles.body, bodyStyle);
      let maxDialogContentHeight = clientHeight - 2 * (styles.body.padding + 64);

      if (title) maxDialogContentHeight -= dialogContent.previousSibling.offsetHeight;

      if (React.Children.count(actions)) {
        maxDialogContentHeight -= dialogContent.nextSibling.offsetHeight;
      }

      dialogContent.style.maxHeight = `${maxDialogContentHeight}px`;
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
    if (keycode(event) === 'esc') {
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

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    styles.root = Object.assign(styles.root, style);
    styles.content = Object.assign(styles.content, contentStyle);
    styles.body = Object.assign(styles.body, bodyStyle);
    styles.actionsContainer = Object.assign(styles.actionsContainer, actionsContainerStyle);
    styles.overlay = Object.assign(styles.overlay, overlayStyle);
    styles.title = Object.assign(styles.title, titleStyle);

    const actionsContainer = React.Children.count(actions) > 0 && (
      <div className={actionsContainerClassName} style={prepareStyles(styles.actionsContainer)}>
        {React.Children.toArray(actions)}
      </div>
    );

    const titleElement = typeof title === 'string' ?
      <h3 className={titleClassName} style={prepareStyles(styles.title)}>{title}</h3> :
      title;

    return (
      <div className={className} style={prepareStyles(styles.root)}>
        <EventListener
          elementName="window"
          onKeyUp={this._handleWindowKeyUp}
          onResize={this._handleResize}
        />
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
                zDepth={4}
              >
                {titleElement}
                <div
                  ref="dialogContent"
                  className={bodyClassName}
                  style={prepareStyles(styles.body)}
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
     * Action buttons to display below the Dialog content (`children`).
     * This property accepts either a React element, or an array of React elements.
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
