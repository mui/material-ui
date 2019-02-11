import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import clsx from 'clsx';
import { componentPropType } from '@material-ui/utils';
import RootRef from '../RootRef';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import Grow from '../Grow';
import Popper from '../Popper';

export const styles = theme => ({
  /* Styles applied to the Popper component. */
  popper: {
    zIndex: theme.zIndex.tooltip,
    opacity: 0.9,
    pointerEvents: 'none',
  },
  /* Styles applied to the Popper component if `interactive={true}`. */
  popperInteractive: {
    pointerEvents: 'auto',
  },
  /* Styles applied to the tooltip (label wrapper) element. */
  tooltip: {
    backgroundColor: theme.palette.grey[700],
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.white,
    fontFamily: theme.typography.fontFamily,
    padding: '4px 8px',
    fontSize: theme.typography.pxToRem(10),
    lineHeight: `${theme.typography.round(14 / 10)}em`,
    maxWidth: 300,
  },
  /* Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. */
  touch: {
    padding: '8px 16px',
    fontSize: theme.typography.pxToRem(14),
    lineHeight: `${theme.typography.round(16 / 14)}em`,
  },
  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
  tooltipPlacementLeft: {
    transformOrigin: 'right center',
    margin: '0 24px ',
    [theme.breakpoints.up('sm')]: {
      margin: '0 14px',
    },
  },
  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
  tooltipPlacementRight: {
    transformOrigin: 'left center',
    margin: '0 24px',
    [theme.breakpoints.up('sm')]: {
      margin: '0 14px',
    },
  },
  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
  tooltipPlacementTop: {
    transformOrigin: 'center bottom',
    margin: '24px 0',
    [theme.breakpoints.up('sm')]: {
      margin: '14px 0',
    },
  },
  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
  tooltipPlacementBottom: {
    transformOrigin: 'center top',
    margin: '24px 0',
    [theme.breakpoints.up('sm')]: {
      margin: '14px 0',
    },
  },
});

class Tooltip extends React.Component {
  ignoreNonTouchEvents = false;

  constructor(props) {
    super();
    this.isControlled = props.open != null;
    this.state = {
      open: null,
    };

    if (!this.isControlled) {
      // not controlled, use internal state
      this.state.open = false;
    }
  }

  componentDidMount() {
    warning(
      !this.childrenRef.disabled ||
        (this.childrenRef.disabled && this.props.title === '') ||
        this.childrenRef.tagName.toLowerCase() !== 'button',
      [
        'Material-UI: you are providing a disabled `button` child to the Tooltip component.',
        'A disabled element does not fire events.',
        "Tooltip needs to listen to the child element's events to display the title.",
        '',
        'Place a `div` container on top of the element.',
      ].join('\n'),
    );

    // Fallback to this default id when possible.
    // Use the random value for client side rendering only.
    // We can't use it server-side.
    this.defaultId = `mui-tooltip-${Math.round(Math.random() * 1e5)}`;

    // Rerender with this.defaultId and this.childrenRef.
    if (this.props.open) {
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.closeTimer);
    clearTimeout(this.enterTimer);
    clearTimeout(this.focusTimer);
    clearTimeout(this.leaveTimer);
    clearTimeout(this.touchTimer);
  }

  onRootRef = ref => {
    this.childrenRef = ref;
  };

  handleFocus = event => {
    // Workaround for https://github.com/facebook/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    if (!this.childrenRef) {
      this.childrenRef = event.currentTarget;
    }

    this.handleEnter(event);

    const childrenProps = this.props.children.props;
    if (childrenProps.onFocus) {
      childrenProps.onFocus(event);
    }
  };

  handleEnter = event => {
    const { children, enterDelay } = this.props;
    const childrenProps = children.props;

    if (event.type === 'mouseover' && childrenProps.onMouseOver) {
      childrenProps.onMouseOver(event);
    }

    if (this.ignoreNonTouchEvents && event.type !== 'touchstart') {
      return;
    }

    // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).
    this.childrenRef.setAttribute('title', '');

    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    if (enterDelay) {
      event.persist();
      this.enterTimer = setTimeout(() => {
        this.handleOpen(event);
      }, enterDelay);
    } else {
      this.handleOpen(event);
    }
  };

  handleOpen = event => {
    // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.
    if (!this.isControlled && !this.state.open) {
      this.setState({ open: true });
    }

    if (this.props.onOpen) {
      this.props.onOpen(event);
    }
  };

  handleLeave = event => {
    const { children, leaveDelay } = this.props;
    const childrenProps = children.props;

    if (event.type === 'blur' && childrenProps.onBlur) {
      childrenProps.onBlur(event);
    }

    if (event.type === 'mouseleave' && childrenProps.onMouseLeave) {
      childrenProps.onMouseLeave(event);
    }

    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    if (leaveDelay) {
      event.persist();
      this.leaveTimer = setTimeout(() => {
        this.handleClose(event);
      }, leaveDelay);
    } else {
      this.handleClose(event);
    }
  };

  handleClose = event => {
    if (!this.isControlled) {
      this.setState({ open: false });
    }

    if (this.props.onClose) {
      this.props.onClose(event);
    }

    clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => {
      this.ignoreNonTouchEvents = false;
    }, this.props.theme.transitions.duration.shortest);
  };

  handleTouchStart = event => {
    this.ignoreNonTouchEvents = true;
    const { children, enterTouchDelay } = this.props;

    if (children.props.onTouchStart) {
      children.props.onTouchStart(event);
    }

    clearTimeout(this.leaveTimer);
    clearTimeout(this.closeTimer);
    clearTimeout(this.touchTimer);
    event.persist();
    this.touchTimer = setTimeout(() => {
      this.handleEnter(event);
    }, enterTouchDelay);
  };

  handleTouchEnd = event => {
    const { children, leaveTouchDelay } = this.props;

    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    clearTimeout(this.touchTimer);
    clearTimeout(this.leaveTimer);
    event.persist();
    this.leaveTimer = setTimeout(() => {
      this.handleClose(event);
    }, leaveTouchDelay);
  };

  render() {
    const {
      children,
      classes,
      disableFocusListener,
      disableHoverListener,
      disableTouchListener,
      enterDelay,
      enterTouchDelay,
      id,
      interactive,
      leaveDelay,
      leaveTouchDelay,
      onClose,
      onOpen,
      open: openProp,
      placement,
      PopperProps,
      theme,
      title,
      TransitionComponent,
      TransitionProps,
      ...other
    } = this.props;

    let open = this.isControlled ? openProp : this.state.open;

    // There is no point in displaying an empty tooltip.
    if (title === '') {
      open = false;
    }

    // For accessibility and SEO concerns, we render the title to the DOM node when
    // the tooltip is hidden. However, we have made a tradeoff when
    // `disableHoverListener` is set. This title logic is disabled.
    // It's allowing us to keep the implementation size minimal.
    // We are open to change the tradeoff.
    const shouldShowNativeTitle = !open && !disableHoverListener;
    const childrenProps = {
      'aria-describedby': open ? id || this.defaultId : null,
      title: shouldShowNativeTitle && typeof title === 'string' ? title : null,
      ...other,
      ...children.props,
      className: clsx(other.className, children.props.className),
    };

    if (!disableTouchListener) {
      childrenProps.onTouchStart = this.handleTouchStart;
      childrenProps.onTouchEnd = this.handleTouchEnd;
    }

    if (!disableHoverListener) {
      childrenProps.onMouseOver = this.handleEnter;
      childrenProps.onMouseLeave = this.handleLeave;
    }

    if (!disableFocusListener) {
      childrenProps.onFocus = this.handleFocus;
      childrenProps.onBlur = this.handleLeave;
    }

    const interactiveWrapperListeners = interactive
      ? {
          onMouseOver: childrenProps.onMouseOver,
          onMouseLeave: childrenProps.onMouseLeave,
          onFocus: childrenProps.onFocus,
          onBlur: childrenProps.onBlur,
        }
      : {};

    warning(
      !children.props.title,
      [
        'Material-UI: you have provided a `title` property to the child of <Tooltip />.',
        `Remove this title property \`${children.props.title}\` or the Tooltip component.`,
      ].join('\n'),
    );

    return (
      <React.Fragment>
        <RootRef rootRef={this.onRootRef}>{React.cloneElement(children, childrenProps)}</RootRef>
        <Popper
          className={clsx(classes.popper, {
            [classes.popperInteractive]: interactive,
          })}
          placement={placement}
          anchorEl={this.childrenRef}
          open={open}
          id={childrenProps['aria-describedby']}
          transition
          {...interactiveWrapperListeners}
          {...PopperProps}
        >
          {({ placement: placementInner, TransitionProps: TransitionPropsInner }) => (
            <TransitionComponent
              timeout={theme.transitions.duration.shorter}
              {...TransitionPropsInner}
              {...TransitionProps}
            >
              <div
                className={clsx(
                  classes.tooltip,
                  {
                    [classes.touch]: this.ignoreNonTouchEvents,
                  },
                  classes[`tooltipPlacement${capitalize(placementInner.split('-')[0])}`],
                )}
              >
                {title}
              </div>
            </TransitionComponent>
          )}
        </Popper>
      </React.Fragment>
    );
  }
}

Tooltip.propTypes = {
  /**
   * Tooltip reference element.
   */
  children: PropTypes.element.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * Do not respond to focus events.
   */
  disableFocusListener: PropTypes.bool,
  /**
   * Do not respond to hover events.
   */
  disableHoverListener: PropTypes.bool,
  /**
   * Do not respond to long press touch events.
   */
  disableTouchListener: PropTypes.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This property won't impact the enter touch delay (`enterTouchDelay`).
   */
  enterDelay: PropTypes.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   */
  enterTouchDelay: PropTypes.number,
  /**
   * The relationship between the tooltip and the wrapper component is not clear from the DOM.
   * This property is used with aria-describedby to solve the accessibility issue.
   * If you don't provide this property. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * Makes a tooltip interactive, i.e. will not close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   */
  interactive: PropTypes.bool,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This property won't impact the leave touch delay (`leaveTouchDelay`).
   */
  leaveDelay: PropTypes.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   */
  leaveTouchDelay: PropTypes.number,
  /**
   * Callback fired when the tooltip requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the tooltip requests to be open.
   *
   * @param {object} event The event source of the callback
   */
  onOpen: PropTypes.func,
  /**
   * If `true`, the tooltip is shown.
   */
  open: PropTypes.bool,
  /**
   * Tooltip placement.
   */
  placement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * Properties applied to the [`Popper`](/api/popper/) element.
   */
  PopperProps: PropTypes.object,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title: PropTypes.node.isRequired,
  /**
   * The component used for the transition.
   */
  TransitionComponent: componentPropType,
  /**
   * Properties applied to the `Transition` element.
   */
  TransitionProps: PropTypes.object,
};

Tooltip.defaultProps = {
  disableFocusListener: false,
  disableHoverListener: false,
  disableTouchListener: false,
  enterDelay: 0,
  enterTouchDelay: 1000,
  interactive: false,
  leaveDelay: 0,
  leaveTouchDelay: 1500,
  placement: 'bottom',
  TransitionComponent: Grow,
};

export default withStyles(styles, { name: 'MuiTooltip', withTheme: true })(Tooltip);
