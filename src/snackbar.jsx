const React = require('react');
const StylePropable = require('./mixins/style-propable');
const Transitions = require('./styles/transitions');
const ClickAwayable = require('./mixins/click-awayable');
const FlatButton = require('./flat-button');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');
const ContextPure = require('./mixins/context-pure');
const StyleResizable = require('./mixins/style-resizable');

const Snackbar = React.createClass({

  mixins: [
    StylePropable,
    StyleResizable,
    ClickAwayable,
    ContextPure,
  ],

  manuallyBindClickAway: true,

  // ID of the active timer.
  _autoHideTimerId: undefined,

  _oneAtTheTimeTimerId: undefined,

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps: function() {
    return {
      openOnMount: false,
    };
  },

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

  propTypes: {
    message: React.PropTypes.node.isRequired,
    action: React.PropTypes.string,
    autoHideDuration: React.PropTypes.number,
    onActionTouchTap: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
    openOnMount: React.PropTypes.bool,
    style: React.PropTypes.object,
    bodyStyle: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState() {
    return {
      open: this.props.openOnMount,
      message: this.props.message,
      action: this.props.action,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    //to update theme inside state whenever a new theme is passed down
    //from the parent / owner using context
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    if (this.state.open && (nextProps.message !== this.props.message || nextProps.action !== this.props.action)) {
      this.setState({
        open: false,
      });

      clearTimeout(this._oneAtTheTimeTimerId);
      this._oneAtTheTimeTimerId = setTimeout(() => {
        if (this.isMounted()) {
          this.setState({
            message: nextProps.message,
            action: nextProps.action,
            open: true,
          });
        }
      }, 400);
    } else {
      this.setState({
        message: nextProps.message,
        action: nextProps.action,
      });
    }
  },

  componentDidMount() {
    if (this.props.openOnMount) {
      this._setAutoHideTimer();
      this._bindClickAway();
    }
  },

  componentClickAway() {
    this.dismiss();
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this._setAutoHideTimer();

        //Only Bind clickaway after transition finishes
        setTimeout(() => {
          if (this.isMounted()) {
            this._bindClickAway();
          }
        }, 400);
      } else {
        clearTimeout(this._autoHideTimerId);
        this._unbindClickAway();
      }
    }
  },

  componentWillUnmount() {
    clearTimeout(this._autoHideTimerId);
    this._unbindClickAway();
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
        display: '-webkit-box; display: -webkit-flex; display: flex',
        right: 0,
        bottom: 0,
        zIndex: 10,
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
          onTouchTap={onActionTouchTap} />
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

  show() {
    this.setState({
      open: true,
    });

    if (this.props.onShow) {
      this.props.onShow();
    }
  },

  dismiss() {
    this.setState({
      open: false,
    });

    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  },

  _setAutoHideTimer() {
    if (this.props.autoHideDuration > 0) {
      clearTimeout(this._autoHideTimerId);
      this._autoHideTimerId = setTimeout(() => {
        if (this.isMounted()) {
          this.dismiss();
        }
      }, this.props.autoHideDuration);
    }
  },

});

module.exports = Snackbar;
