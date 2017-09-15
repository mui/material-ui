// @flow

import React from 'react';
import classNames from 'classnames';
import type { Element, Node } from 'react';
import { Manager, Target, Popper } from 'react-popper';
import { capitalizeFirstLetter } from '../utils/helpers';
import common from '../colors/common';
import grey from '../colors/grey';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    display: 'inline-flex',
  },
  popper: {
    zIndex: theme.zIndex.tooltip,
  },
  tooltip: {
    background: grey[700],
    borderRadius: 2,
    color: common.fullWhite,
    fontFamily: theme.typography.fontFamily,
    fontSize: 14,
    height: theme.spacing.unit * 4,
    lineHeight: '32px',
    opacity: 0,
    padding: `0 ${theme.spacing.unit}px`,
    transform: 'scale(0)',
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    [theme.breakpoints.up('sm')]: {
      height: 22,
      lineHeight: '22px',
      padding: `0 ${theme.spacing.unit}px`,
      fontSize: 10,
    },
  },
  tooltipLeft: {
    transformOrigin: 'right center',
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      marginRight: 14,
    },
  },
  tooltipRight: {
    transformOrigin: 'left center',
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      marginLeft: 14,
    },
  },
  tooltipTop: {
    transformOrigin: 'center bottom',
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      marginBottom: 14,
    },
  },
  tooltipBottom: {
    transformOrigin: 'center top',
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      marginTop: 14,
    },
  },
  tooltipOpen: {
    opacity: 0.9,
    transform: 'scale(1)',
  },
});

type DefaultProps = {
  classes: Object,
  disableTriggerFocus: boolean,
  disableTriggerHover: boolean,
  disableTriggerTouch: boolean,
  enterDelay: number,
  leaveDelay: number,
  placement: string,
};

export type Props = {
  /**
   * Tooltip reference component.
   */
  children: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * Do not respond to focus events.
   */
  disableTriggerFocus?: boolean,
  /**
   * Do not respond to hover events.
   */
  disableTriggerHover?: boolean,
  /**
   * Do not respond to long press touch events.
   */
  disableTriggerTouch?: boolean,
  /**
   * Tooltip label.
   */
  label: Node,
  /**
   * Callback fired when the tooltip requests to be closed.
   *
   * @param {object} event The event source of the callback
   */
  onRequestClose?: Function,
  /**
   * Callback fired when the tooltip requests to be open.
   *
   * @param {object} event The event source of the callback
   */
  onRequestOpen?: Function,
  /**
   * If `true`, the tooltip is shown.
   */
  open?: boolean,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   */
  enterDelay?: number,
  /**
   * The number of milliseconds to wait before hidding the tooltip.
   */
  leaveDelay?: number,
  /**
   * Tooltip placement
   */
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top',
  /**
   * Properties applied to the `Popper` element.
   */
  PopperProps?: Object,
};

type AllProps = DefaultProps & Props;

type State = {
  open?: boolean,
};

class Tooltip extends React.Component<AllProps, State> {
  props: AllProps;

  static defaultProps = {
    disableTriggerFocus: false,
    disableTriggerHover: false,
    disableTriggerTouch: false,
    enterDelay: 0,
    leaveDelay: 0,
    placement: 'bottom',
  };

  state: State = {};

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

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  }

  enterTimer = null;
  leaveTimer = null;
  touchTimer = null;
  isControlled = null;
  ignoreNonTouchEvents = false;

  handleRequestOpen = event => {
    const childrenProps = this.props.children.props;

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

    if (this.props.onRequestOpen) {
      this.props.onRequestOpen(event, true);
    }
  };

  handleRequestClose = event => {
    const childrenProps = this.props.children.props;

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

    if (this.props.onRequestClose) {
      this.props.onRequestClose(event, false);
    }
  };

  handleTouchStart = event => {
    this.ignoreNonTouchEvents = true;
    const childrenProps = this.props.children.props;

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
    const childrenProps = this.props.children.props;

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
      leaveDelay,
      label,
      open: openProp,
      onRequestClose,
      onRequestOpen,
      placement,
      PopperProps,
      ...other
    } = this.props;

    const open = this.isControlled ? openProp : this.state.open;
    const childrenProps = {};

    if (!disableTriggerTouch) {
      childrenProps.onTouchStart = this.handleTouchStart;
      childrenProps.onTouchEnd = this.handleTouchEnd;
    }

    if (!disableTriggerHover) {
      childrenProps.onMouseOver = this.handleRequestOpen;
      childrenProps.onMouseLeave = this.handleRequestClose;
    }

    if (!disableTriggerFocus) {
      childrenProps.onFocus = this.handleRequestOpen;
      childrenProps.onBlur = this.handleRequestClose;
    }

    return (
      <Manager className={classNames(classes.root, className)} {...other}>
        <Target>{React.cloneElement(childrenProp, childrenProps)}</Target>
        <Popper placement={placement} className={classes.popper} {...PopperProps}>
          <div
            className={classNames(
              classes.tooltip,
              { [classes.tooltipOpen]: open },
              classes[`tooltip${capitalizeFirstLetter(placement.split('-')[0])}`],
            )}
          >
            {label}
          </div>
        </Popper>
      </Manager>
    );
  }
}

export default withStyles(styles, { name: 'MuiTooltip' })(Tooltip);
