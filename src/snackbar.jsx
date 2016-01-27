import React from 'react';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import ClickAwayable from './mixins/click-awayable';
import FlatButton from './flat-button';
import getMuiTheme from './styles/getMuiTheme';
import ContextPure from './mixins/context-pure';
import StyleResizable from './mixins/style-resizable';
import warning from 'warning';
import deprecated from './utils/deprecatedPropType';

const Snackbar = React.createClass({

  propTypes: {
    /**
     * The label for the action on the snackbar.
     */
    action: React.PropTypes.string,

    /**
     * The number of milliseconds to wait before automatically dismissing.
     * If no value is specified the snackbar will dismiss normally.
     * If a value is provided the snackbar can still be dismissed normally.
     * If a snackbar is dismissed before the timer expires, the timer will be cleared.
     */
    autoHideDuration: React.PropTypes.number,

    /**
     * Override the inline-styles of the body element.
     */
    bodyStyle: React.PropTypes.object,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * The message to be displayed.
     */
    message: React.PropTypes.node.isRequired,

    /**
     * Fired when the action button is touchtapped.
     *
     * @param {object} event Action button event.
     */
    onActionTouchTap: React.PropTypes.func,

    /**
     * Fired when the `Snackbar` is dismissed.
     */
    onDismiss: deprecated(React.PropTypes.func,
      'Instead, use the open property to control the component.'),

    /**
     * Fired when the `Snackbar` is requested to be closed by a click outside the `Snackbar`, or after the
     * `autoHideDuration` timer expires.
     *
     * Typically `onRequestClose` is used to set state in the parent component, which is used to control the `Snackbar`
     * `open` prop.
     *
     * The `reason` parameter can optionally be used to control the response to `onRequestClose`,
     * for example ignoring `clickaway`.
     *
     * @param {string} reason Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`
     */
    onRequestClose: React.PropTypes.func.isRequired,

    /**
     * Fired when the `Snackbar` is shown.
     */
    onShow: deprecated(React.PropTypes.func,
      'Instead, use the open property to control the component.'),

    /**
     * Controls whether the `Snackbar` is opened or not.
     */
    open: React.PropTypes.bool.isRequired,

    /**
     * If true, the `Snackbar` will open once mounted.
     */
    openOnMount: deprecated(React.PropTypes.bool,
      'Instead, use the open property to control the component.'),

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
    StyleResizable,
    ClickAwayable,
    ContextPure,
  ],

  statics: {
    getRelevantContextKeys(muiTheme) {
      const theme = muiTheme.snackbar;
      const spacing = muiTheme.rawTheme.spacing;

      return {
        textColor: theme.textColor,
        backgroundColor: theme.backgroundColor,
        desktopGutter: spacing.desktopGutter,
        desktopSubheaderHeight: spacing.desktopSubheaderHeight,
        actionColor: theme.actionColor,
      };
    },
    getChildrenClasses() {
      return [
        FlatButton,
      ];
    },
  },

  getInitialState() {
    let open = this.props.open;

    if (open === null) {
      open = this.props.openOnMount;
    }

    return {
      open: open,
      message: this.props.message,
      action: this.props.action,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    if (this.state.open) {
      this._setAutoHideTimer();

      //Only Bind clickaway after transition finishes
      this.timerTransitionId = setTimeout(() => {
        this._bindClickAway();
      }, 400);
    }
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });

    if (this.state.open && nextProps.open === this.props.open &&
        (nextProps.message !== this.props.message || nextProps.action !== this.props.action)) {
      this.setState({
        open: false,
      });

      clearTimeout(this.timerOneAtTheTimeId);
      this.timerOneAtTheTimeId = setTimeout(() => {
        this.setState({
          message: nextProps.message,
          action: nextProps.action,
          open: true,
        });
      }, 400);
    } else {
      const open = nextProps.open;

      this.setState({
        open: open !== null ? open : this.state.open,
        message: nextProps.message,
        action: nextProps.action,
      });
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this._setAutoHideTimer();

        //Only Bind clickaway after transition finishes
        this.timerTransitionId = setTimeout(() => {
          this._bindClickAway();
        }, 400);
      } else {
        clearTimeout(this.timerAutoHideId);
        this._unbindClickAway();
      }
    }
  },

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
    clearTimeout(this.timerTransitionId);
    clearTimeout(this.timerOneAtTheTimeId);
    this._unbindClickAway();
  },

  manuallyBindClickAway: true,

  timerAutoHideId: undefined,
  timerTransitionId: undefined,
  timerOneAtTheTimeId: undefined,

  componentClickAway() {
    if (this.props.open !== null && this.props.onRequestClose) {
      this.props.onRequestClose('clickaway');
    } else {
      this.setState({open: false});
    }
  },

  getStyles() {
    const {
      textColor,
      backgroundColor,
      desktopGutter,
      desktopSubheaderHeight,
      actionColor,
    } = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    const isSmall = this.state.deviceSize === this.constructor.Sizes.SMALL;

    const styles = {
      root: {
        position: 'fixed',
        left: 0,
        display: 'flex',
        right: 0,
        bottom: 0,
        zIndex: this.state.muiTheme.zIndex.snackbar,
        visibility: 'hidden',
        transform: 'translate3d(0, ' + desktopSubheaderHeight + 'px, 0)',
        transition:
          Transitions.easeOut('400ms', 'transform') + ',' +
          Transitions.easeOut('400ms', 'visibility'),
      },
      rootWhenOpen: {
        visibility: 'visible',
        transform: 'translate3d(0, 0, 0)',
      },
      body: {
        backgroundColor: backgroundColor,
        padding: '0 ' + desktopGutter + 'px',
        height: desktopSubheaderHeight,
        lineHeight: desktopSubheaderHeight + 'px',
        borderRadius: isSmall ? 0 : 2,
        maxWidth: isSmall ? 'inherit' : 568,
        minWidth: isSmall ? 'inherit' : 288,
        flexGrow: isSmall ? 1 : 0,
        margin: 'auto',
      },
      content: {
        fontSize: 14,
        color: textColor,
        opacity: 0,
        transition: Transitions.easeOut('400ms', 'opacity'),
      },
      contentWhenOpen: {
        opacity: 1,
        transition: Transitions.easeOut('500ms', 'opacity', '100ms'),
      },
      action: {
        color: actionColor,
        float: 'right',
        marginTop: 6,
        marginRight: -16,
        marginLeft: desktopGutter,
        backgroundColor: 'transparent',
      },
    };

    return styles;
  },

  show() {
    warning(false, 'show has been deprecated in favor of explicitly setting the open property.');

    this.setState({
      open: true,
    });

    if (this.props.onShow) {
      this.props.onShow();
    }
  },

  _onDismiss() {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  },

  dismiss() {
    warning(false, 'dismiss has been deprecated in favor of explicitly setting the open property.');

    this.setState({
      open: false,
    }, this._onDismiss);
  },

  _setAutoHideTimer() {
    const autoHideDuration = this.props.autoHideDuration;

    if (autoHideDuration > 0) {
      clearTimeout(this.timerAutoHideId);
      this.timerAutoHideId = setTimeout(() => {
        if (this.props.open !== null && this.props.onRequestClose) {
          this.props.onRequestClose('timeout');
        } else {
          this.setState({open: false});
        }
      }, autoHideDuration);
    }
  },

  render() {
    const {
      onActionTouchTap,
      style,
      bodyStyle,
      ...others,
    } = this.props;

    const styles = this.getStyles();

    const {
      open,
      action,
      message,
    } = this.state;

    const rootStyles = open ?
      this.mergeStyles(styles.root, styles.rootWhenOpen, style) :
      this.mergeStyles(styles.root, style);

    let actionButton;
    if (action) {
      actionButton = (
        <FlatButton
          style={styles.action}
          label={action}
          onTouchTap={onActionTouchTap}
        />
      );
    }

    const mergedBodyStyle = this.mergeStyles(styles.body, bodyStyle);

    const contentStyle = open ? this.mergeStyles(styles.content, styles.contentWhenOpen) : styles.content;

    return (
      <div {...others} style={rootStyles}>
        <div style={mergedBodyStyle}>
          <div style={contentStyle}>
            <span>{message}</span>
            {actionButton}
          </div>
        </div>
      </div>
    );
  },

});

export default Snackbar;
