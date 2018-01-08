// @inheritedComponent Modal

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import warning from 'warning';
import contains from 'dom-helpers/query/contains';
import debounce from 'lodash/debounce';
import EventListener from 'react-event-listener';
import withStyles from '../styles/withStyles';
import Modal from '../Modal';
import Grow from '../transitions/Grow';
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

// Sum the scrollTop between two elements.
function getScrollParent(parent, child) {
  let element = child;
  let scrollTop = 0;

  while (element && element !== parent) {
    element = element.parentNode;
    scrollTop += element.scrollTop;
  }
  return scrollTop;
}

export const styles = {
  paper: {
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    // So we see the popover when it's empty.
    // It's most likely on issue on userland.
    minWidth: 16,
    minHeight: 16,
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: 'calc(100vh - 32px)',
    '&:focus': {
      outline: 'none',
    },
  },
};

class Popover extends React.Component {
  componentDidMount() {
    if (this.props.action) {
      this.props.action({
        updatePosition: this.handleResize,
      });
    }
  }

  componentWillUnmount = () => {
    this.handleResize.cancel();
  };

  setPositioningStyles = element => {
    if (element && element.style) {
      const positioning = this.getPositioningStyle(element);
      element.style.top = positioning.top;
      element.style.left = positioning.left;
      element.style.transformOrigin = positioning.transformOrigin;
    }
  };

  getPositioningStyle = element => {
    const { marginThreshold } = this.props;

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
    const heightThreshold = window.innerHeight - marginThreshold;
    const widthThreshold = window.innerWidth - marginThreshold;

    // Check if the vertical axis needs shifting
    if (top < marginThreshold) {
      const diff = top - marginThreshold;
      top -= diff;
      transformOrigin.vertical += diff;
    } else if (bottom > heightThreshold) {
      const diff = bottom - heightThreshold;
      top -= diff;
      transformOrigin.vertical += diff;
    }

    warning(
      elemRect.height < heightThreshold || !elemRect.height || !heightThreshold,
      [
        'Material-UI: the popover component is too tall.',
        `Some part of it can not be seen on the screen (${elemRect.height - heightThreshold}px).`,
        'Please consider adding a `max-height` to improve the user-experience.',
      ].join('\n'),
    );

    // Check if the horizontal axis needs shifting
    if (left < marginThreshold) {
      const diff = left - marginThreshold;
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
  };

  // Returns the top/left offset of the position
  // to attach to on the anchor element (or body if none is provided)
  getAnchorOffset(contentAnchorOffset) {
    const { anchorEl, anchorOrigin, anchorReference, anchorPosition } = this.props;

    if (anchorReference === 'anchorPosition') {
      return anchorPosition;
    }

    const anchorElement = anchorEl || document.body;
    const anchorRect = anchorElement.getBoundingClientRect();
    const anchorVertical = contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center';

    return {
      top: anchorRect.top + this.handleGetOffsetTop(anchorRect, anchorVertical),
      left: anchorRect.left + this.handleGetOffsetLeft(anchorRect, anchorOrigin.horizontal),
    };
  }

  // Returns the vertical offset of inner content to anchor the transform on if provided
  getContentAnchorOffset(element) {
    const { getContentAnchorEl, anchorReference } = this.props;
    let contentAnchorOffset = 0;

    if (getContentAnchorEl && anchorReference === 'anchorEl') {
      const contentAnchorEl = getContentAnchorEl(element);

      if (contentAnchorEl && contains(element, contentAnchorEl)) {
        const scrollTop = getScrollParent(element, contentAnchorEl);
        contentAnchorOffset =
          contentAnchorEl.offsetTop + contentAnchorEl.clientHeight / 2 - scrollTop || 0;
      }

      // != the default value
      warning(
        this.props.anchorOrigin.vertical === 'top',
        [
          'Material-UI: you can not change the default `anchorOrigin.vertical` value ',
          'when also providing the `getContentAnchorEl` property to the popover component.',
          'Only use one of the two properties.',
          'Set `getContentAnchorEl` to null or left `anchorOrigin.vertical` unchanged.',
        ].join('\n'),
      );
    }

    return contentAnchorOffset;
  }

  // Return the base transform origin using the element
  // and taking the content anchor offset into account if in use
  getTransformOrigin(elemRect, contentAnchorOffset = 0) {
    const { transformOrigin } = this.props;
    return {
      vertical: this.handleGetOffsetTop(elemRect, transformOrigin.vertical) + contentAnchorOffset,
      horizontal: this.handleGetOffsetLeft(elemRect, transformOrigin.horizontal),
    };
  }

  transitionEl = undefined;

  handleGetOffsetTop = getOffsetTop;

  handleGetOffsetLeft = getOffsetLeft;

  handleEnter = element => {
    if (this.props.onEnter) {
      this.props.onEnter(element);
    }

    this.setPositioningStyles(element);
  };

  handleResize = debounce(() => {
    const element = ReactDOM.findDOMNode(this.transitionEl);
    this.setPositioningStyles(element);
  }, 166);

  render() {
    const {
      anchorEl,
      anchorOrigin,
      anchorPosition,
      anchorReference,
      children,
      classes,
      elevation,
      getContentAnchorEl,
      marginThreshold,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      open,
      PaperProps,
      role,
      transformOrigin,
      transition: TransitionProp,
      transitionDuration,
      action,
      ...other
    } = this.props;

    const transitionProps = {};

    // The provided transition might not support the auto timeout value.
    if (TransitionProp === Grow) {
      transitionProps.timeout = transitionDuration;
    }

    return (
      <Modal open={open} BackdropProps={{ invisible: true }} {...other}>
        <TransitionProp
          appear
          in={open}
          onEnter={this.handleEnter}
          onEntered={onEntered}
          onEntering={onEntering}
          onExit={onExit}
          onExited={onExited}
          onExiting={onExiting}
          role={role}
          ref={node => {
            this.transitionEl = node;
          }}
          {...transitionProps}
        >
          <Paper
            className={classes.paper}
            data-mui-test="Popover"
            elevation={elevation}
            {...PaperProps}
          >
            <EventListener target="window" onResize={this.handleResize} />
            {children}
          </Paper>
        </TransitionProp>
      </Modal>
    );
  }
}

Popover.propTypes = {
  /**
   * This is callback property. It's called by the component on mount.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports updatePosition() action.
   *
   * @param {object} actions This object contains all posible actions
   * that can be triggered programmatically.
   */
  action: PropTypes.func,
  /**
   * This is the DOM element that may be used
   * to set the position of the popover.
   */
  anchorEl: PropTypes.object,
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['left', 'center', 'right']),
    ]),
    vertical: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['top', 'center', 'bottom'])]),
  }),
  /**
   * This is the position that may be used
   * to set the position of the popover.
   * The coordinates are relative to
   * the application's client area.
   */
  anchorPosition: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
  }),
  /*
   * This determines which anchor prop to refer to to set
   * the position of the popover.
   */
  anchorReference: PropTypes.oneOf(['anchorEl', 'anchorPosition']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * The elevation of the popover.
   */
  elevation: PropTypes.number,
  /**
   * This function is called in order to retrieve the content anchor element.
   * It's the opposite of the `anchorEl` property.
   * The content anchor element should be an element inside the popover.
   * It's used to correctly scroll and set the position of the popover.
   * The positioning strategy tries to make the content anchor element just above the
   * anchor element.
   */
  getContentAnchorEl: PropTypes.func,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   */
  marginThreshold: PropTypes.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * Callback fired before the component is entering.
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired when the component has entered.
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired when the component is entering.
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired before the component is exiting.
   */
  onExit: PropTypes.func,
  /**
   * Callback fired when the component has exited.
   */
  onExited: PropTypes.func,
  /**
   * Callback fired when the component is exiting.
   */
  onExiting: PropTypes.func,
  /**
   * If `true`, the popover is visible.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Properties applied to the `Paper` element.
   */
  PaperProps: PropTypes.object,
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   */
  transformOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['left', 'center', 'right']),
    ]),
    vertical: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['top', 'center', 'bottom'])]),
  }),
  /**
   * Transition component.
   */
  transition: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    PropTypes.oneOf(['auto']),
  ]),
};

Popover.defaultProps = {
  anchorReference: 'anchorEl',
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  elevation: 8,
  marginThreshold: 16,
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  transition: Grow,
  transitionDuration: 'auto',
};

export default withStyles(styles, { name: 'MuiPopover' })(Popover);
