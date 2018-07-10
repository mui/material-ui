import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import withTheme from '../styles/withTheme';
import Portal from '../Portal';

function flipPlacement(theme, placement) {
  if (theme.direction !== 'rtl') {
    return placement;
  }

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

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

/**
 * Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
class Popper extends React.Component {
  popper = null;

  constructor(props) {
    super(props);

    this.state = {
      exited: !this.props.open,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open && !this.props.open && !this.props.transition) {
      // Otherwise handleExited will call this.
      this.handleClose();
    }

    // Let's update the popper position.
    if (
      prevProps.anchorEl !== this.props.anchorEl ||
      prevProps.popperOptions !== this.props.popperOptions ||
      prevProps.disablePortal !== this.props.disablePortal ||
      prevProps.placement !== this.props.placement
    ) {
      this.handleRendered();
    }
  }

  componentWillUnmount() {
    this.handleClose();
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.open) {
      return {
        exited: false,
      };
    }

    if (!nextProps.transition) {
      // Otherwise let handleExited take care of marking exited.
      return {
        exited: true,
      };
    }

    return null;
  }

  handleRendered = () => {
    const { anchorEl, open, placement, popperOptions = {}, theme, disablePortal } = this.props;
    const popperNode = ReactDOM.findDOMNode(this);

    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }

    if (!popperNode || !anchorEl || !open) {
      return;
    }

    this.popper = new PopperJS(getAnchorEl(anchorEl), popperNode, {
      placement: flipPlacement(theme, placement),
      ...popperOptions,
      modifiers: {
        ...(disablePortal
          ? {}
          : {
              // It's using scrollParent by default, we can use the viewport when using a portal.
              preventOverflow: {
                boundariesElement: 'viewport',
              },
            }),
        ...popperOptions.modifiers,
      },
      // We could have been using a custom modifier like react-popper is doing.
      // But it seems this is the best public API for this use case.
      onCreate: this.handlePopperUpdate,
      onUpdate: this.handlePopperUpdate,
    });
  };

  handlePopperUpdate = data => {
    if (data.placement !== this.state.placement) {
      this.setState({
        placement: data.placement,
      });
    }
  };

  handleExited = () => {
    this.setState({ exited: true });
    this.handleClose();
  };

  handleClose = () => {
    if (!this.popper) {
      return;
    }

    this.popper.destroy();
    this.popper = null;
  };

  render() {
    const {
      anchorEl,
      children,
      container,
      disablePortal,
      keepMounted,
      open,
      placement: placementProps,
      popperOptions,
      theme,
      transition,
      ...other
    } = this.props;
    const { exited, placement } = this.state;

    if (!keepMounted && !open && (!transition || exited)) {
      return null;
    }

    const childProps = {
      placement: placement || flipPlacement(theme, placementProps),
    };

    if (transition) {
      childProps.TransitionProps = {
        in: open,
        onExited: this.handleExited,
      };
    }

    return (
      <Portal onRendered={this.handleRendered} disablePortal={disablePortal} container={container}>
        <div
          role="tooltip"
          style={{
            // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
            position: 'absolute',
          }}
          {...other}
        >
          {typeof children === 'function' ? children(childProps) : children}
        </div>
      </Portal>
    );
  }
}

Popper.propTypes = {
  /**
   * This is the DOM element, or a function that returns the DOM element,
   * that may be used to set the position of the popover.
   */
  anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Popper render function or node.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  /**
   * A node, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This property can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   */
  keepMounted: PropTypes.bool,
  /**
   * If `true`, the popper is visible.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Popper placement.
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
   * Options provided to the [`popper.js`](https://github.com/FezVrasta/popper.js) instance.
   */
  popperOptions: PropTypes.object,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * Help supporting a react-transition-group/Transition component.
   */
  transition: PropTypes.bool,
};

Popper.defaultProps = {
  disablePortal: false,
  placement: 'bottom',
  transition: false,
};

export default withTheme()(Popper);
