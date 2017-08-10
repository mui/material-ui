// @flow

import React, { Component } from 'react';
import type { Element } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import contains from 'dom-helpers/query/contains';
import debounce from 'lodash/debounce';
import EventListener from 'react-event-listener';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import Modal from './Modal';
import Grow from '../transitions/Grow';
import Paper from '../Paper';
import type { TransitionCallback } from './Transition';

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

// Sum the scrollTop between two elements
function getScrollParent(parent, child) {
  let element = child;
  let scrollTop = 0;

  while (element && element !== parent) {
    element = element.parentNode;
    scrollTop += element.scrollTop;
  }
  return scrollTop;
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
  classes: Object,
  modal: boolean,
  open: boolean,
  transformOrigin: Origin,
  transitionDuration: 'auto',
  elevation: number,
};

export type Props = {
  /**
   * This is the DOM element that will be used
   * to set the position of the popover.
   */
  anchorEl?: Object,
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to.
   *
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
  classes?: Object,
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
  getContentAnchorEl?: Function,
  /**
   * If `true`, the Popover will be rendered as a modal with
   * scroll locking, focus trapping and a clickaway layer beneath
   */
  modal?: boolean,
  /**
   * Callback fired before the component is entering
   */
  onEnter?: TransitionCallback,
  /**
   * Callback fired when the component is entering
   */
  onEntering?: TransitionCallback,
  /**
   * Callback fired when the component has entered
   */
  onEntered?: TransitionCallback, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired before the component is exiting
   */
  onExit?: TransitionCallback,
  /**
   * Callback fired when the component is exiting
   */
  onExiting?: TransitionCallback,
  /**
   * Callback fired when the component has exited
   */
  onExited?: TransitionCallback, // eslint-disable-line react/sort-prop-types
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback
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
  transitionDuration?: number | 'auto',
  /**
   * @ignore
   */
  theme: Object,
};

type AllProps = DefaultProps & Props;

/**
 * @ignore - internal component.
 */
class Popover extends Component<DefaultProps, AllProps, void> {
  props: AllProps;
  static defaultProps: DefaultProps = {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    classes: {},
    modal: true,
    open: false,
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    transitionDuration: 'auto',
    elevation: 8,
  };

  componentWillUnmount = () => {
    this.handleResize.cancel();
  };

  transitionEl = undefined;

  setPositioningStyles = (element: HTMLElement) => {
    if (element && element.style) {
      const positioning = this.getPositioningStyle(element);

      element.style.top = positioning.top;
      element.style.left = positioning.left;
      element.style.transformOrigin = positioning.transformOrigin;
    }
  };

  handleEnter = (element: HTMLElement) => {
    if (this.props.onEnter) {
      this.props.onEnter(element);
    }

    this.setPositioningStyles(element);
  };

  handleResize = debounce(() => {
    const element: any = ReactDOM.findDOMNode(this.transitionEl);
    this.setPositioningStyles(element);
  }, 166);

  marginThreshold = 16;

  getPositioningStyle(element) {
    // Check if the parent has requested anchoring on an inner content node
    const contentAnchorOffset = this.getContentAnchorOffset(element);
    // Get the offset of of the anchoring element
    const anchorOffset = this.getAnchorOffset(contentAnchorOffset);

    const elemRect = {
      width: element.clientWidth,
      height: element.clientHeight,
    };
    // Get the transform origin point on the element itself
    const transformOrigin = this.getTransformOrigin(elemRect, contentAnchorOffset);

    // Calculate element positioning
    let top = anchorOffset.top - transformOrigin.vertical;
    let left = anchorOffset.left - transformOrigin.horizontal;
    const bottom = top + elemRect.height;
    const right = left + elemRect.width;

    // Window thresholds taking required margin into account
    const heightThreshold = window.innerHeight - this.marginThreshold;
    const widthThreshold = window.innerWidth - this.marginThreshold;

    // Check if the vertical axis needs shifting
    if (top < this.marginThreshold) {
      const diff = top - this.marginThreshold;
      top -= diff;
      transformOrigin.vertical += diff;
    } else if (bottom > heightThreshold) {
      const diff = bottom - heightThreshold;
      top -= diff;
      transformOrigin.vertical += diff;
    }

    // Check if the horizontal axis needs shifting
    if (left < this.marginThreshold) {
      const diff = left - this.marginThreshold;
      left -= diff;
      transformOrigin.horizontal += diff;
    } else if (right > widthThreshold) {
      const diff = right - widthThreshold;
      left -= diff;
      transformOrigin.horizontal += diff;
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
      transformOrigin: getTransformOriginValue(transformOrigin),
    };
  }

  handleGetOffsetTop = getOffsetTop;
  handleGetOffsetLeft = getOffsetLeft;

  /**
   * Returns the top/left offset of the position
   * to attach to on the anchor element (or body if none is provided)
   */
  getAnchorOffset(contentAnchorOffset) {
    // $FlowFixMe
    const { anchorEl, anchorOrigin } = this.props;
    const anchorElement = anchorEl || document.body;
    const anchorRect = anchorElement.getBoundingClientRect();
    const anchorVertical = contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center';

    return {
      top: anchorRect.top + this.handleGetOffsetTop(anchorRect, anchorVertical),
      left: anchorRect.left + this.handleGetOffsetLeft(anchorRect, anchorOrigin.horizontal),
    };
  }

  /**
   * Returns the vertical offset of inner content to anchor the transform on if provided
   */
  getContentAnchorOffset(element) {
    let contentAnchorOffset = 0;

    if (this.props.getContentAnchorEl) {
      const contentAnchorEl = this.props.getContentAnchorEl(element);

      if (contentAnchorEl && contains(element, contentAnchorEl)) {
        const scrollTop = getScrollParent(element, contentAnchorEl);
        contentAnchorOffset =
          contentAnchorEl.offsetTop + contentAnchorEl.clientHeight / 2 - scrollTop || 0;
      }
    }

    return contentAnchorOffset;
  }

  /**
   * Return the base transform origin using the element
   * and taking the content anchor offset into account if in use
   */
  getTransformOrigin(elemRect, contentAnchorOffset = 0) {
    const { transformOrigin } = this.props;
    return {
      vertical: this.handleGetOffsetTop(elemRect, transformOrigin.vertical) + contentAnchorOffset,
      horizontal: this.handleGetOffsetLeft(elemRect, transformOrigin.horizontal),
    };
  }

  render() {
    const {
      children,
      classes,
      className,
      modal,
      onRequestClose,
      open,
      getContentAnchorEl,
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
      theme,
      ...other
    } = this.props;

    // FIXME: props API consistency problem? - `...other` not spread over the root
    return (
      <Modal show={open} backdropInvisible onRequestClose={onRequestClose}>
        <Grow
          in={open}
          enteredClassName={enteredClassName}
          enteringClassName={enteringClassName}
          exitedClassName={exitedClassName}
          exitingClassName={exitingClassName}
          onEnter={this.handleEnter}
          onEntering={onEntering}
          onEntered={onEntered}
          onExit={onExit}
          onExiting={onExiting}
          onExited={onExited}
          role={role}
          transitionAppear
          rootRef={node => {
            this.transitionEl = node;
          }}
        >
          <Paper
            data-mui-test="Popover"
            className={classNames(classes.paper, className)}
            elevation={elevation}
            {...other}
          >
            <EventListener target="window" onResize={this.handleResize} />
            {children}
          </Paper>
        </Grow>
      </Modal>
    );
  }
}

export default withStyles(styleSheet, { withTheme: true })(Popover);
