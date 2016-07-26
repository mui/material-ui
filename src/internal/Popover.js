// @flow weak

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'stylishly';
import classNames from 'classnames';
import contains from 'dom-helpers/query/contains';
import requestAnimFrame from 'dom-helpers/util/requestAnimationFrame';
import customPropTypes from '../utils/propTypes';
import Modal from './Modal';
import Transition from './Transition';
import Paper from '../Paper';

export const styleSheet = createStyleSheet('Popover', () => {
  return {
    popover: {
      position: 'absolute',
      overflowY: 'auto',
      overflowX: 'hidden',
      '&:focus': {
        outline: 'none',
      },
    },
  };
});

export default class Popover extends Component {
  static propTypes = {
    /**
     * This is the DOM element that will be used
     * to set the position of the popover.
     */
    anchorEl: PropTypes.object,
    /**
     * This is the point on the anchor where the popover's
     * `targetOrigin` will attach to.
     * Options:
     * vertical: [top, center, bottom];
     * horizontal: [left, center, right].
     */
    anchorOrigin: customPropTypes.origin,
    /**
     * The content of the popover.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * CSS class or classes applied when the component is entered
     */
    enteredClassName: PropTypes.string,
    /**
     * CSS class or classes applied while the component is entering
     */
    enteringClassName: PropTypes.string,
    /**
     * CSS class or classes applied when the component is exited
     */
    exitedClassName: PropTypes.string,
    /**
     * CSS class or classes applied while the component is exiting
     */
    exitingClassName: PropTypes.string,
    /**
     * @ignore
     */
    getContentAnchorEl: PropTypes.func,
    /**
     * If true, the Popover will be rendered as a modal with
     * scroll locking, focus trapping and a clickaway layer beneath
     */
    modal: PropTypes.bool,
    /**
     * Callback fired before the component is entering
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired when the component is entering
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired when the component has entered
     */
    onEntered: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback fired before the component is exiting
     */
    onExit: PropTypes.func,
    /**
     * Callback fired when the component is exiting
     */
    onExiting: PropTypes.func,
    /**
     * Callback fired when the component has exited
     */
    onExited: PropTypes.func, // eslint-disable-line react/sort-prop-types
    /**
     * Callback function fired when the popover is requested to be closed.
     *
     * @param {event} event The event that triggered the close request
     */
    onRequestClose: PropTypes.func,
    /**
     * If true, the popover is visible.
     */
    open: PropTypes.bool,
    role: PropTypes.string,
    /**
     * This is the point on the popover which
     * will attach to the anchor's origin.
     *
     * Options:
     * vertical: [top, center, bottom, x(px)];
     * horizontal: [left, center, right, x(px)].
     */
    transformOrigin: customPropTypes.origin,
    /**
     * Set to 'auto' to automatically calculate transition time based on height
     */
    transitionDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    zDepth: PropTypes.number,
  };

  static defaultProps = {
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
    zDepth: 8,
  };

  static contextTypes = {
    styleManager: PropTypes.object.isRequired,
  };

  handleEnter = (element, callback) => {
    element.style.opacity = 0;
    element.style.transform = this.getScale(0.75);

    // Temp solution?
    // ensures that `asap` buffered stylesheets
    // are rendered first for correct height calc
    requestAnimFrame(() => {
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
      }

      const test = transitionDuration / 3;

      element.style.transition = [
        transitions.create('opacity', `${test * 3}ms`),
        transitions.create('transform', `${test * 2}ms`),
      ].join(',');

      callback();
    });
  };

  handleEntering = (element) => {
    element.style.opacity = 1;
    element.style.transform = this.getScale(1);

    if (this.props.onEntering) {
      this.props.onEntering();
    }
  };

  handleExit = (element) => {
    element.style.opacity = 0;
    element.style.transform = this.getScale(0.75);

    if (this.props.onExit) {
      this.props.onExit();
    }
  };

  getScale(value) {
    return `scale(${value}, ${Math.pow(value, 2)})`;
  }

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
    const marginThreshold = 16;
    const heightThreshold = window.innerHeight - marginThreshold;
    const widthThreshold = window.innerWidth - marginThreshold;

    // Check if the vertical axis needs shifting
    if (top < marginThreshold) {
      const diff = top - marginThreshold;
      top = top - diff;
      transformOrigin.vertical = transformOrigin.vertical + diff;
    } else if (bottom > heightThreshold) {
      const diff = bottom - heightThreshold;
      top = top - diff;
      transformOrigin.vertical = transformOrigin.vertical + diff;
    }

    // Check if the horizontal axis needs shifting
    if (left < marginThreshold) {
      const diff = left - marginThreshold;
      left = left - diff;
      transformOrigin.horizontal = transformOrigin.horizontal + diff;
    } else if (right > widthThreshold) {
      const diff = right - widthThreshold;
      left = left - diff;
      transformOrigin.horizontal = transformOrigin.horizontal + diff;
    }

    return {
      top: `${top}px`,
      left: `${left}px`,
      transformOrigin: this.getTransformOriginValue(transformOrigin),
    };
  }

  /**
   * Returns the top/left offset of the position
   * to attach to on the anchor element (or body if none is provided)
   */
  getAnchorOffset(contentAnchorOffset) {
    const { anchorEl: anchorElProp, anchorOrigin } = this.props;

    const anchorEl = anchorElProp || document.body;
    const anchorRect = anchorEl.getBoundingClientRect();
    const anchorVertical = contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center';

    return {
      top: anchorRect.top + this.getOffsetTop(anchorRect, anchorVertical),
      left: anchorRect.left + this.getOffsetLeft(anchorRect, anchorOrigin.horizontal),
    };
  }

  /**
   * Returns the vertical offset of inner
   * content to anchor the transform on if provided
   */
  getContentAnchorOffset(element) {
    let contentAnchorOffset = 0;

    if (this.props.getContentAnchorEl) {
      const contentAnchorEl = this.props.getContentAnchorEl(element);
      if (contentAnchorEl && contains(element, contentAnchorEl)) {
        contentAnchorOffset = contentAnchorEl.offsetTop + (contentAnchorEl.clientHeight / 2) || 0;
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
      vertical: this.getOffsetTop(elemRect, transformOrigin.vertical) + contentAnchorOffset,
      horizontal: this.getOffsetLeft(elemRect, transformOrigin.horizontal),
    };
  }

  getOffsetTop(rect, vertical) {
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

  getOffsetLeft(rect, horizontal) {
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

  getTransformOriginValue(transformOrigin) {
    return [transformOrigin.horizontal, transformOrigin.vertical]
      .map((n) => {
        return typeof n === 'number' ? `${n}px` : n;
      })
      .join(' ');
  }

  render() {
    const {
      children,
      className,
      modal, // eslint-disable-line no-unused-vars
      onRequestClose,
      open,
      getContentAnchorEl, // eslint-disable-line no-unused-vars
      anchorEl, // eslint-disable-line no-unused-vars
      anchorOrigin, // eslint-disable-line no-unused-vars
      role, // eslint-disable-line no-unused-vars
      transformOrigin, // eslint-disable-line no-unused-vars
      transitionDuration, // eslint-disable-line no-unused-vars
      enteredClassName,
      enteringClassName,
      exitedClassName,
      exitingClassName,
      onEnter, // eslint-disable-line no-unused-vars
      onEntering, // eslint-disable-line no-unused-vars
      onEntered,
      onExit, // eslint-disable-line no-unused-vars
      onExiting,
      onExited,
      zDepth,
      ...other,
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet, { group: 'mui' });

    return (
      <Modal
        show={open}
        backdropVisible={false}
        onRequestClose={onRequestClose}
      >
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
          transitionAppear
        >
          <Paper
            data-mui-test="Popover"
            className={classNames(classes.popover, className)}
            zDepth={zDepth}
            {...other}
          >
            {children}
          </Paper>
        </Transition>
      </Modal>
    );
  }
}
