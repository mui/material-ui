import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import transitions from '../styles/transitions';
import Overlay from '../internal/Overlay';
import RenderToLayer from '../internal/RenderToLayer';
import Paper from '../Paper';

import ReactTransitionGroup from 'react-addons-transition-group';

class TransitionItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    style: {},
  };

  componentWillUnmount() {
    clearTimeout(this.enterTimeout);
    clearTimeout(this.leaveTimeout);
  }

  componentWillEnter(callback) {
    this.componentWillAppear(callback);
  }

  componentWillAppear(callback) {
    const spacing = this.context.muiTheme.baseTheme.spacing;

    this.setState({
      style: {
        opacity: 1,
        transform: `translate(0, ${spacing.desktopKeylineIncrement}px)`,
      },
    });

    this.enterTimeout = setTimeout(callback, 450); // matches transition duration
  }

  componentWillLeave(callback) {
    this.setState({
      style: {
        opacity: 0,
        transform: 'translate(0, 0)',
      },
    });

    this.leaveTimeout = setTimeout(callback, 450); // matches transition duration
  }

  render() {
    const {
      style,
      children,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    return (
      <div {...other} style={prepareStyles(Object.assign({}, this.state.style, style))}>
        {children}
      </div>
    );
  }
}

function getStyles(props, context) {
  const {
    autoScrollBodyContent,
    open,
  } = props;

  const {
    baseTheme: {
      spacing,
      palette,
    },
    dialog,
    zIndex,
  } = context.muiTheme;

  const gutter = spacing.desktopGutter;
  const borderScroll = `1px solid ${palette.borderColor}`;

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
        transitions.easeOut('0ms', 'left', '0ms') :
        transitions.easeOut('0ms', 'left', '450ms'),
    },
    content: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      transition: transitions.easeOut(),
      position: 'relative',
      width: '75%',
      maxWidth: spacing.desktopKeylineIncrement * 12,
      margin: '0 auto',
      zIndex: zIndex.dialog,
    },
    actionsContainer: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      padding: 8,
      width: '100%',
      textAlign: 'right',
      marginTop: autoScrollBodyContent ? -1 : 0,
      borderTop: autoScrollBodyContent ? borderScroll : 'none',
    },
    overlay: {
      zIndex: zIndex.dialogOverlay,
    },
    title: {
      margin: 0,
      padding: `${gutter}px ${gutter}px 20px ${gutter}px`,
      color: palette.textColor,
      fontSize: dialog.titleFontSize,
      lineHeight: '32px',
      fontWeight: 400,
      marginBottom: autoScrollBodyContent ? -1 : 0,
      borderBottom: autoScrollBodyContent ? borderScroll : 'none',
    },
    body: {
      fontSize: dialog.bodyFontSize,
      color: dialog.bodyColor,
      padding: `${props.title ? 0 : gutter}px ${gutter}px ${gutter}px`,
      boxSizing: 'border-box',
      overflowY: autoScrollBodyContent ? 'auto' : 'hidden',
    },
  };
}

class DialogInline extends Component {
  static propTypes = {
    actions: PropTypes.node,
    actionsContainerClassName: PropTypes.string,
    actionsContainerStyle: PropTypes.object,
    autoDetectWindowHeight: PropTypes.bool,
    autoScrollBodyContent: PropTypes.bool,
    bodyClassName: PropTypes.string,
    bodyStyle: PropTypes.object,
    children: PropTypes.node,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    contentStyle: PropTypes.object,
    modal: PropTypes.bool,
    onRequestClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    overlayClassName: PropTypes.string,
    overlayStyle: PropTypes.object,
    repositionOnUpdate: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.node,
    titleClassName: PropTypes.string,
    titleStyle: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.positionDialog();
  }

  componentDidUpdate() {
    this.positionDialog();
  }

  positionDialog() {
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

    // Reset the height in case the window was resized.
    dialogWindow.style.height = '';
    dialogContent.style.height = '';

    const dialogWindowHeight = dialogWindow.offsetHeight;
    let paddingTop = ((clientHeight - dialogWindowHeight) / 2) - 64;
    if (paddingTop < minPaddingTop) paddingTop = minPaddingTop;

    // Vertically center the dialog window, but make sure it doesn't
    // transition to that position.
    if (repositionOnUpdate || !container.style.paddingTop) {
      container.style.paddingTop = `${paddingTop}px`;
    }

    // Force a height if the dialog is taller than clientHeight
    if (autoDetectWindowHeight || autoScrollBodyContent) {
      const styles = getStyles(this.props, this.context);
      styles.body = Object.assign(styles.body, bodyStyle);
      let maxDialogContentHeight = clientHeight - 2 * 64;

      if (title) maxDialogContentHeight -= dialogContent.previousSibling.offsetHeight;

      if (React.Children.count(actions)) {
        maxDialogContentHeight -= dialogContent.nextSibling.offsetHeight;
      }

      dialogContent.style.maxHeight = `${maxDialogContentHeight}px`;
    }
  }

  requestClose(buttonClicked) {
    if (!buttonClicked && this.props.modal) {
      return;
    }

    if (this.props.onRequestClose) {
      this.props.onRequestClose(!!buttonClicked);
    }
  }

  handleTouchTapOverlay = () => {
    this.requestClose(false);
  };

  handleKeyUp = (event) => {
    if (keycode(event) === 'esc') {
      this.requestClose(false);
    }
  };

  handleResize = () => {
    this.positionDialog();
  };

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

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

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

    let titleElement = title;
    if (React.isValidElement(title)) {
      titleElement = React.cloneElement(title, {
        className: title.props.className || titleClassName,
        style: prepareStyles(Object.assign(styles.title, title.props.style)),
      });
    } else if (typeof title === 'string') {
      titleElement = (
        <h3 className={titleClassName} style={prepareStyles(styles.title)}>
          {title}
        </h3>
      );
    }

    return (
      <div className={className} style={prepareStyles(styles.root)}>
        {open &&
          <EventListener
            target="window"
            onKeyUp={this.handleKeyUp}
            onResize={this.handleResize}
          />
        }
        <ReactTransitionGroup
          component="div"
          ref="dialogWindow"
          transitionAppear={true}
          transitionAppearTimeout={450}
          transitionEnter={true}
          transitionEnterTimeout={450}
        >
          {open &&
            <TransitionItem
              className={contentClassName}
              style={styles.content}
            >
              <Paper zDepth={4}>
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
          onTouchTap={this.handleTouchTapOverlay}
        />
      </div>
    );
  }
}

class Dialog extends Component {
  static propTypes = {
    /**
     * Action buttons to display below the Dialog content (`children`).
     * This property accepts either a React element, or an array of React elements.
     */
    actions: PropTypes.node,
    /**
     * The `className` to add to the actions container's root element.
     */
    actionsContainerClassName: PropTypes.string,
    /**
     * Overrides the inline-styles of the actions container's root element.
     */
    actionsContainerStyle: PropTypes.object,
    /**
     * If set to true, the height of the `Dialog` will be auto detected. A max height
     * will be enforced so that the content does not extend beyond the viewport.
     */
    autoDetectWindowHeight: PropTypes.bool,
    /**
     * If set to true, the body content of the `Dialog` will be scrollable.
     */
    autoScrollBodyContent: PropTypes.bool,
    /**
     * The `className` to add to the content's root element under the title.
     */
    bodyClassName: PropTypes.string,
    /**
     * Overrides the inline-styles of the content's root element under the title.
     */
    bodyStyle: PropTypes.object,
    /**
     * The contents of the `Dialog`.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The `className` to add to the content container.
     */
    contentClassName: PropTypes.string,
    /**
     * Overrides the inline-styles of the content container.
     */
    contentStyle: PropTypes.object,
    /**
     * Force the user to use one of the actions in the `Dialog`.
     * Clicking outside the `Dialog` will not trigger the `onRequestClose`.
     */
    modal: PropTypes.bool,
    /**
     * Fired when the `Dialog` is requested to be closed by a click outside the `Dialog` or on the buttons.
     *
     * @param {bool} buttonClicked Determines whether a button click triggered this request.
     */
    onRequestClose: PropTypes.func,
    /**
     * Controls whether the Dialog is opened or not.
     */
    open: PropTypes.bool.isRequired,
    /**
     * The `className` to add to the `Overlay` component that is rendered behind the `Dialog`.
     */
    overlayClassName: PropTypes.string,
    /**
     * Overrides the inline-styles of the `Overlay` component that is rendered behind the `Dialog`.
     */
    overlayStyle: PropTypes.object,
    /**
     * Determines whether the `Dialog` should be repositioned when it's contents are updated.
     */
    repositionOnUpdate: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The title to display on the `Dialog`. Could be number, string, element or an array containing these types.
     */
    title: PropTypes.node,
    /**
     * The `className` to add to the title's root container element.
     */
    titleClassName: PropTypes.string,
    /**
     * Overrides the inline-styles of the title's root container element.
     */
    titleStyle: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  static defaultProps = {
    autoDetectWindowHeight: true,
    autoScrollBodyContent: false,
    modal: false,
    repositionOnUpdate: true,
  };

  renderLayer = () => {
    return (
      <DialogInline {...this.props} />
    );
  };

  render() {
    return (
      <RenderToLayer render={this.renderLayer} open={true} useLayerForClickAway={false} />
    );
  }
}

export default Dialog;
