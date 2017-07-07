// @flow weak

import React, { Component } from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import withStyles from '../styles/withStyles';
import customPropTypes from '../utils/customPropTypes';
import Modal from './Modal';
import Transition from './Transition';
import Paper from '../Paper';

function getOffsetTop(rect, vertical) {
  let offset = 0;

  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }

  return offset;
}

function getOffsetLeft(rect, horizontal) {
  let offset = 0;

  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }

  return offset;
}

function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map(n => {
      return typeof n === 'number' ? `${n}px` : n;
    })
    .join(' ');
}

export const styleSheet = createStyleSheet('MuiPopover', {
  paper: {
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&:focus': {
      outline: 'none',
    },
  },
});

type Origin = {
  horizontal: 'left' | 'center' | 'right' | number,
  vertical: 'top' | 'center' | 'bottom' | number,
};

type DefaultProps = {
  anchorOrigin: Origin,
  modal: boolean,
  open: boolean,
  transformOrigin: Origin,
  transitionDuration: 'auto',
  elevation: number,
};

type Props = DefaultProps & {
  /**
   * This is the DOM element that will be used
   * to set the position of the popover.
   */
  anchorEl?: Object,
  /**
   * This is the point on the anchor where the popover's
   * `targetOrigin` will attach to.
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   */
  anchorOrigin: Origin,
  /**
   * The content of the component.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * CSS class or classes applied when the component is entered
   */
  elevation?: number,
  enteredClassName?: string,
  /**
   * CSS class or classes applied while the component is entering
   */
  enteringClassName?: string,
  /**
   * CSS class or classes applied when the component is exited
   */
  exitedClassName?: string,
  /**
   * CSS class or classes applied while the component is exiting
   */
  exitingClassName?: string,
  /**
   * @ignore
   */
  getContentAnchorOffset?: Function,
  /**
   * If `true`, the Popover will be rendered as a modal with
   * scroll locking, focus trapping and a clickaway layer beneath
   */
  modal?: boolean,
  /**
   * Callback fired before the component is entering
   */
  onEnter?: Function,
  /**
   * Callback fired when the component is entering
   */
  onEntering?: Function,
  /**
   * Callback fired when the component has entered
   */
  onEntered?: Function, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the component is exiting
   */
  onExit?: Function,
  /**
   * Callback fired when the component is exiting
   */
  onExiting?: Function,
  /**
   * Callback fired when the component has exited
   */
  onExited?: Function, // eslint-disable-line react/sort-prop-types
  /**
   * Callback function fired when the popover is requested to be closed.
   *
   * @param {event} event The event that triggered the close request
   */
  onRequestClose?: Function,
  /**
   * If `true`, the popover is visible.
   */
  open?: boolean,
  role?: string,
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   */
  transformOrigin: Origin,
  /**
   * Set to 'auto' to automatically calculate transition time based on height
   */
  transitionDuration: number | 'auto',
};

class Popover extends Component<DefaultProps, Props, void> {
  props: Props;
  static defaultProps: DefaultProps = {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    modal: true,
    open: false,
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    transitionDuration: 'auto',
    elevation: 8,
  };

  static getScale(value) {
    return `scale(${value}, ${value ** 2})`;
  }

  autoTransitionDuration = undefined;

  handleEnter = element => {
    element.style.opacity = 0;
    element.style.transform = Popover.getScale(0.75);

    if (this.props.onEnter) {
      this.props.onEnter(element);
    }

    const positioning = this.getPositioningStyle(element);

    element.style.top = positioning.top;
    element.style.left = positioning.left;
    element.style.transformOrigin = positioning.transformOrigin;

    let { transitionDuration } = this.props;
    const { transitions } = this.context.styleManager.theme;

    if (transitionDuration === 'auto') {
      transitionDuration = transitions.getAutoHeightDuration(element.clientHeight);
      this.autoTransitionDuration = transitionDuration;
    }

    element.style.transition = [
      transitions.create('opacity', {
        duration: transitionDuration,
      }),
      transitions.create('transform', {
        duration: transitionDuration * 0.666,
      }),
    ].join(',');
  };

  handleEntering = element => {
    element.style.opacity = 1;
    element.style.transform = Popover.getScale(1);

    if (this.props.onEntering) {
      this.props.onEntering();
    }
  };

  handleExit = element => {
    let { transitionDuration } = this.props;
    const { transitions } = this.context.styleManager.theme;

    if (transitionDuration === 'auto') {
      transitionDuration = transitions.getAutoHeightDuration(element.clientHeight);
      this.autoTransitionDuration = transitionDuration;
    }

    element.style.transition = [
      transitions.create('opacity', {
        duration: transitionDuration,
      }),
      transitions.create('transform', {
        duration: transitionDuration * 0.666,
        delay: transitionDuration * 0.333,
      }),
    ].join(',');

    element.style.opacity = 0;
    element.style.transform = Popover.getScale(0.75);

    if (this.props.onExit) {
      this.props.onExit();
    }
  };

  handleRequestTimeout = () => {
    if (this.props.transitionDuration === 'auto') {
      return (this.autoTransitionDuration || 0) + 20;
    }
    return this.props.transitionDuration + 20;
  };

  marginThreshold = 16;

  /**
   * Calculate the top/left offset and transform origin styles for an
   * anchored popover.
   */
  getPositioningStyle(element) {
    let top;
    let left;
    let transformOrigin;
    const elemRect = {
      width: element.clientWidth,
      height: element.clientHeight,
    };

    if (this.props.anchorEl && this.props.getContentAnchorOffset) {
      const anchorPoint = this.getAnchorPoint();
      // Get the popover's offset from the anchor point
      // $FlowFixMe
      const anchorOffsetY = this.props.getContentAnchorOffset(element, anchorPoint.y);

      // Transform origin point on the element itself
      transformOrigin = {
        vertical: anchorPoint.y - anchorOffsetY,
        horizontal: 0,
      };
      top = anchorOffsetY;
      left = anchorPoint.x;
    } else {
      // Get the popover's offset from the anchor point
      const anchorOffset = this.getAnchorOffset();
      // Get the transform origin point on the element itself
      transformOrigin = this.getTransformOrigin(elemRect);

      // Calculate element positioning
      top = anchorOffset.top - transformOrigin.vertical;
      left = anchorOffset.left - transformOrigin.horizontal;
    }

    const bottom = top + element.clientHeight;
    const right = left + element.clientWidth;

    // Shift the vertical axis if necessary
    const vshift = this.getVerticalShift(top, bottom);
    top -= vshift;
    transformOrigin.vertical += vshift;

    // Shift the horizontal axis if necessary
    const hshift = this.getHorizontalShift(left, right);
    left -= hshift;
    transformOrigin.horizontal += hshift;

    return {
      top: `${top}px`,
      left: `${left}px`,
      transformOrigin: getTransformOriginValue(transformOrigin),
    };
  }

  handleGetOffsetTop = getOffsetTop;
  handleGetOffsetLeft = getOffsetLeft;

  /**
   * Returns the center/left offset of the popover's anchor per
   * the anchorEl parameter.
   */
  getAnchorPoint() {
    // $FlowFixMe
    const { anchorEl } = this.props;
    const anchorRect = anchorEl.getBoundingClientRect();
    return {
      y: anchorRect.top + anchorRect.height / 2,
      x: anchorRect.left,
    };
  }

  /**
   * Returns the top/left offset of the position
   * to attach to on the anchor element (or body if none is provided)
   */
  getAnchorOffset() {
    // If there's no anchoring element, the popover will be anchored to the
    // document body per the anchor origin parameter
    // $FlowFixMe
    const { anchorEl, anchorOrigin } = this.props;
    const anchorElement = anchorEl || document.body;
    const anchorRect = anchorElement.getBoundingClientRect();

    return {
      top: anchorRect.top + this.handleGetOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + this.handleGetOffsetLeft(anchorRect, anchorOrigin.horizontal),
    };
  }

  /**
   * Return the base transform origin using the element
   * and taking the content anchor offset into account if in use
   */
  getTransformOrigin(elemRect) {
    const { transformOrigin } = this.props;
    return {
      vertical: this.handleGetOffsetTop(elemRect, transformOrigin.vertical),
      horizontal: this.handleGetOffsetLeft(elemRect, transformOrigin.horizontal),
    };
  }

  /**
   * Return the pixel difference necessary to keep an element within the
   * vertical margin thresholds. If the element's top and bottom edge
   * values are within bounds, return 0.
   */
  getVerticalShift(top, bottom) {
    let diff = 0;
    const heightThreshold = window.innerHeight - this.marginThreshold;

    if (top < this.marginThreshold) {
      diff = top - this.marginThreshold;
    } else if (bottom > heightThreshold) {
      diff = bottom - heightThreshold;
    }
    return diff;
  }

  /**
   * Return the pixel difference necessary to keep an element within the
   * horizontal margin thresholds. If the element's left and right edge
   * values are within bounds, return 0.
   */
  getHorizontalShift(left, right) {
    let diff = 0;
    const widthThreshold = window.innerWidth - this.marginThreshold;

    if (left < this.marginThreshold) {
      diff = left - this.marginThreshold;
    } else if (right > widthThreshold) {
      diff = right - widthThreshold;
    }
    return diff;
  }

  render() {
    const {
      children,
      classes,
      className,
      modal,
      onRequestClose,
      open,
      getContentAnchorOffset,
      anchorEl,
      anchorOrigin,
      role,
      transformOrigin,
      transitionDuration,
      enteredClassName,
      enteringClassName,
      exitedClassName,
      exitingClassName,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      elevation,
      ...other
    } = this.props;

    return (
      <Modal show={open} backdropInvisible onRequestClose={onRequestClose}>
        <Transition
          in={open}
          enteredClassName={enteredClassName}
          enteringClassName={enteringClassName}
          exitedClassName={exitedClassName}
          exitingClassName={exitingClassName}
          onEnter={this.handleEnter}
          onEntering={this.handleEntering}
          onEntered={onEntered}
          onExit={this.handleExit}
          onExiting={onExiting}
          onExited={onExited}
          role={role}
          onRequestTimeout={this.handleRequestTimeout}
          transitionAppear
        >
          <Paper
            data-mui-test="Popover"
            className={classNames(classes.paper, className)}
            elevation={elevation}
            {...other}
          >
            {children}
          </Paper>
        </Transition>
      </Modal>
    );
  }
}

Popover.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default withStyles(styleSheet)(Popover);
