/* eslint-disable react/no-multi-comp */
// @flow

import React, { Children } from 'react';
import type { Element, Node } from 'react';
import { findDOMNode } from 'react-dom';
import warning from 'warning';
import classNames from 'classnames';
import { Manager, Target, Popper } from 'react-popper';
import { capitalizeFirstLetter } from '../utils/helpers';
import common from '../colors/common';
import grey from '../colors/grey';
import withStyles from '../styles/withStyles';

// Use a class component so we can get a reference.
class TargetChildren extends React.Component<{ element: Element<any> }> {
  render() {
    return this.props.element;
  }
}

export const styles = (theme: Object) => ({
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
    fontSize: 14,
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
      fontSize: 10,
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

export type Placement =
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
  | 'top';

function flipPlacement(placement: Placement): Placement {
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

type ProvidedProps = {
  classes: Object,
  disableTriggerFocus: boolean,
  disableTriggerHover: boolean,
  disableTriggerTouch: boolean,
  enterDelay: number,
  leaveDelay: number,
  placement: Placement,
  theme: Object,
};

export type Props = {
  /**
   * Tooltip reference component.
   */
  children: Element<any>,
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
   * The relationship between the tooltip and the wrapper componnet is not clear from the DOM.
   * By providind this property, we can use aria-describedby to solve the accessibility issue.
   */
  id?: string,
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
   * Tooltip title.
   */
  title: Node,
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
  placement?: Placement,
  /**
   * Properties applied to the `Popper` element.
   */
  PopperProps?: Object,
  /**
   * @ignore
   */
  theme?: Object,
};

type State = {
  open?: boolean,
};

class Tooltip extends React.Component<ProvidedProps & Props, State> {
  static defaultProps = {
    disableTriggerFocus: false,
    disableTriggerHover: false,
    disableTriggerTouch: false,
    enterDelay: 0,
    leaveDelay: 0,
    placement: 'bottom',
  };

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
    const { children } = this.props;
    if (typeof children !== 'string') {
      const childrenProps = Children.only(children).props;

      if (event.type === 'focus' && childrenProps.onFocus) {
        childrenProps.onFocus(event);
      }

      if (event.type === 'mouseover' && childrenProps.onMouseOver) {
        childrenProps.onMouseOver(event);
      }
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
    const { children } = this.props;
    if (typeof children !== 'string') {
      const childrenProps = Children.only(children).props;

      if (event.type === 'blur' && childrenProps.onBlur) {
        childrenProps.onBlur(event);
      }

      if (event.type === 'mouseleave' && childrenProps.onMouseLeave) {
        childrenProps.onMouseLeave(event);
      }
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
    const { children } = this.props;
    if (typeof children !== 'string') {
      const childrenProps = Children.only(children).props;

      if (childrenProps.onTouchStart) {
        childrenProps.onTouchStart(event);
      }
    }

    clearTimeout(this.touchTimer);
    event.persist();
    this.touchTimer = setTimeout(() => {
      this.handleRequestOpen(event);
    }, 1e3);
  };

  handleTouchEnd = event => {
    const { children } = this.props;
    if (typeof children !== 'string') {
      const childrenProps = Children.only(children).props;

      if (childrenProps.onTouchEnd) {
        childrenProps.onTouchEnd(event);
      }
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
      open: openProp,
      onRequestClose,
      onRequestOpen,
      theme,
      title,
      placement: rawPlacement,
      PopperProps: { PopperClassName, ...PopperOther } = {},
      ...other
    } = this.props;

    const placement = theme.direction === 'rtl' ? flipPlacement(rawPlacement) : rawPlacement;
    const open = this.isControlled ? openProp : this.state.open;
    const childrenProps = {};

    childrenProps['aria-describedby'] = id;

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

    if (typeof childrenProp !== 'string' && childrenProp.props) {
      warning(
        !childrenProp.props.title,
        [
          'Material-UI: you have been providing a `title` property to the child of <Tooltip />.',
          `Remove this title property \`${childrenProp.props.title}\` or the Tooltip component.`,
        ].join('\n'),
      );
    }

    return (
      <Manager className={classNames(classes.root, className)} {...other}>
        <Target>
          {({ targetProps }) => (
            <TargetChildren
              element={
                typeof childrenProp !== 'string'
                  ? React.cloneElement(childrenProp, childrenProps)
                  : childrenProp
              }
              ref={node => {
                targetProps.ref(findDOMNode(node));
              }}
            />
          )}
        </Target>
        <Popper
          placement={placement}
          eventsEnabled={open}
          className={classNames(classes.popper, { [classes.popperClose]: !open }, PopperClassName)}
          {...PopperOther}
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
        </Popper>
      </Manager>
    );
  }
}

export default withStyles(styles, { name: 'MuiTooltip', withTheme: true })(Tooltip);
