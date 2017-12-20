/* eslint-disable react/no-multi-comp, no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import warning from 'warning';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
import { capitalizeFirstLetter } from '../utils/helpers';
import common from '../colors/common';
import grey from '../colors/grey';
import withStyles from '../styles/withStyles';

// Use a class component so we can get a reference.
class TargetChildren extends React.Component {
  render() {
    return this.props.children;
  }
}

TargetChildren.propTypes = {
  children: PropTypes.node.isRequired,
};

export const styles = theme => ({
  root: {
    display: 'inline',
    flexDirection: 'inherit', // Makes the wrapper more transparent.
  },
  popper: {
    zIndex: theme.zIndex.tooltip,
  },
  popperClose: {
    pointerEvents: 'none',
  },
  tooltip: {
    background: grey[700],
    borderRadius: 2,
    color: common.fullWhite,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(14),
    minHeight: theme.spacing.unit * 4,
    lineHeight: '32px',
    opacity: 0,
    padding: `0 ${theme.spacing.unit}px`,
    transform: 'scale(0)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    [theme.breakpoints.up('sm')]: {
      minHeight: 22,
      lineHeight: '22px',
      padding: `0 ${theme.spacing.unit}px`,
      fontSize: theme.typography.pxToRem(10),
    },
  },
  tooltipLeft: {
    transformOrigin: 'right center',
    margin: `0 ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.up('sm')]: {
      margin: '0 14px',
    },
  },
  tooltipRight: {
    transformOrigin: 'left center',
    margin: `0 ${theme.spacing.unit * 3}px`,
    [theme.breakpoints.up('sm')]: {
      margin: '0 14px',
    },
  },
  tooltipTop: {
    transformOrigin: 'center bottom',
    margin: `${theme.spacing.unit * 3}px 0`,
    [theme.breakpoints.up('sm')]: {
      margin: '14px 0',
    },
  },
  tooltipBottom: {
    transformOrigin: 'center top',
    margin: `${theme.spacing.unit * 3}px 0`,
    [theme.breakpoints.up('sm')]: {
      margin: '14px 0',
    },
  },
  tooltipOpen: {
    opacity: 0.9,
    transform: 'scale(1)',
  },
});

function flipPlacement(placement) {
  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

class Tooltip extends React.Component {
  state = {};

  componentWillMount() {
    const { props } = this;

    this.isControlled = props.open !== undefined;

    if (!this.isControlled) {
      // not controlled, use internal state
      this.setState({
        open: false,
      });
    }
  }

  componentDidMount() {
    warning(
      !this.children ||
        !this.children.disabled ||
        !this.children.tagName.toLowerCase() === 'button',
      [
        'Material-UI: you are providing a disabled button children to the Tooltip component.',
        'A disabled element do not fire events.',
        'But the Tooltip needs to listen to the children element events to display the title.',
        '',
        'Place a `div` over top of the element.',
      ].join('\n'),
    );
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    this.handleResize.cancel();
  }

  enterTimer = null;
  leaveTimer = null;
  touchTimer = null;
  isControlled = null;
  popper = null;
  children = null;
  ignoreNonTouchEvents = false;

  handleResize = debounce(() => {
    if (this.popper) {
      this.popper._popper.scheduleUpdate();
    }
  }, 166);

  handleRequestOpen = event => {
    const { children } = this.props;
    const childrenProps = children.props;

    if (event.type === 'focus' && childrenProps.onFocus) {
      childrenProps.onFocus(event);
    }

    if (event.type === 'mouseover' && childrenProps.onMouseOver) {
      childrenProps.onMouseOver(event);
    }

    if (this.ignoreNonTouchEvents && event.type !== 'touchstart') {
      return;
    }

    clearTimeout(this.leaveTimer);
    if (this.props.enterDelay > 0) {
      this.leaveTimer = setTimeout(() => {
        this.requestOpen(event);
      }, this.props.enterDelay);
    } else {
      this.requestOpen(event);
    }
  };

  requestOpen = event => {
    if (!this.isControlled) {
      this.setState({ open: true });
    }

    if (this.props.onOpen) {
      this.props.onOpen(event, true);
    }
  };

  handleClose = event => {
    const { children } = this.props;
    const childrenProps = children.props;

    if (event.type === 'blur' && childrenProps.onBlur) {
      childrenProps.onBlur(event);
    }

    if (event.type === 'mouseleave' && childrenProps.onMouseLeave) {
      childrenProps.onMouseLeave(event);
    }

    clearTimeout(this.leaveTimer);
    if (this.props.leaveDelay) {
      this.leaveTimer = setTimeout(() => {
        this.requestClose(event);
      }, this.props.leaveDelay);
    } else {
      this.requestClose(event);
    }
  };

  requestClose = event => {
    this.ignoreNonTouchEvents = false;

    if (!this.isControlled) {
      this.setState({ open: false });
    }

    if (this.props.onClose) {
      this.props.onClose(event, false);
    }
  };

  handleTouchStart = event => {
    this.ignoreNonTouchEvents = true;
    const { children } = this.props;
    const childrenProps = children.props;

    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }

    clearTimeout(this.touchTimer);
    event.persist();
    this.touchTimer = setTimeout(() => {
      this.handleRequestOpen(event);
    }, 1e3);
  };

  handleTouchEnd = event => {
    const { children } = this.props;
    const childrenProps = children.props;

    if (childrenProps.onTouchEnd) {
      childrenProps.onTouchEnd(event);
    }

    clearTimeout(this.touchTimer);
    clearTimeout(this.leaveTimer);
    event.persist();
    this.leaveTimer = setTimeout(() => {
      this.requestClose(event);
    }, 1500 + this.props.leaveDelay);
  };

  render() {
    const {
      children: childrenProp,
      classes,
      className,
      disableTriggerFocus,
      disableTriggerHover,
      disableTriggerTouch,
      enterDelay,
      id,
      leaveDelay,
      onClose,
      onOpen,
      open: openProp,
      placement: rawPlacement,
      PopperProps: { PopperClassName, ...PopperOther } = {},
      theme,
      title,
      ...other
    } = this.props;

    const themeDirection = theme && theme.direction;
    const placement = themeDirection === 'rtl' ? flipPlacement(rawPlacement) : rawPlacement;
    const open = this.isControlled ? openProp : this.state.open;
    const childrenProps = {};

    childrenProps['aria-describedby'] = id;

    if (!disableTriggerTouch) {
      childrenProps.onTouchStart = this.handleTouchStart;
      childrenProps.onTouchEnd = this.handleTouchEnd;
    }

    if (!disableTriggerHover) {
      childrenProps.onMouseOver = this.handleRequestOpen;
      childrenProps.onMouseLeave = this.handleClose;
    }

    if (!disableTriggerFocus) {
      childrenProps.onFocus = this.handleRequestOpen;
      childrenProps.onBlur = this.handleClose;
    }

    warning(
      !childrenProp.props.title,
      [
        'Material-UI: you have been providing a `title` property to the child of <Tooltip />.',
        `Remove this title property \`${childrenProp.props.title}\` or the Tooltip component.`,
      ].join('\n'),
    );

    return (
      <EventListener target="window" onResize={this.handleResize}>
        <Manager className={classNames(classes.root, className)} {...other}>
          <Target>
            {({ targetProps }) => (
              <TargetChildren
                ref={node => {
                  this.children = findDOMNode(node);
                  targetProps.ref(this.children);
                }}
              >
                {React.cloneElement(childrenProp, childrenProps)}
              </TargetChildren>
            )}
          </Target>
          <Popper
            placement={placement}
            eventsEnabled={open}
            className={classNames(
              classes.popper,
              { [classes.popperClose]: !open },
              PopperClassName,
            )}
            {...PopperOther}
            ref={node => {
              this.popper = node;
            }}
          >
            {({ popperProps, restProps }) => (
              <div
                {...popperProps}
                {...restProps}
                style={{
                  ...popperProps.style,
                  left: popperProps.style.left || 0,
                  ...restProps.style,
                }}
              >
                <div
                  id={id}
                  role="tooltip"
                  aria-hidden={!open}
                  className={classNames(
                    classes.tooltip,
                    { [classes.tooltipOpen]: open },
                    classes[`tooltip${capitalizeFirstLetter(placement.split('-')[0])}`],
                  )}
                >
                  {title}
                </div>
              </div>
            )}
          </Popper>
        </Manager>
      </EventListener>
    );
  }
}

Tooltip.propTypes = {
  /**
   * Tooltip reference element.
   */
  children: PropTypes.element.isRequired,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Do not respond to focus events.
   */
  disableTriggerFocus: PropTypes.bool,
  /**
   * Do not respond to hover events.
   */
  disableTriggerHover: PropTypes.bool,
  /**
   * Do not respond to long press touch events.
   */
  disableTriggerTouch: PropTypes.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   */
  enterDelay: PropTypes.number,
  /**
   * The relationship between the tooltip and the wrapper component is not clear from the DOM.
   * By providing this property, we can use aria-describedby to solve the accessibility issue.
   */
  id: PropTypes.string,
  /**
   * The number of milliseconds to wait before hidding the tooltip.
   */
  leaveDelay: PropTypes.number,
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
   * Tooltip placement
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
   * Properties applied to the `Popper` element.
   */
  PopperProps: PropTypes.object,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * Tooltip title.
   */
  title: PropTypes.node.isRequired,
};

Tooltip.defaultProps = {
  disableTriggerFocus: false,
  disableTriggerHover: false,
  disableTriggerTouch: false,
  enterDelay: 0,
  leaveDelay: 0,
  placement: 'bottom',
};

export default withStyles(styles, { name: 'MuiTooltip', withTheme: true })(Tooltip);
