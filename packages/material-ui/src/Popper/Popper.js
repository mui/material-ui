import React from 'react';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import { chainPropTypes } from '@material-ui/utils';
import Portal from '../Portal';
import { setRef, withForwardedRef } from '../utils';

function flipPlacement(placement) {
  const direction = (typeof window !== 'undefined' && document.body.getAttribute('dir')) || 'ltr';

  if (direction !== 'rtl') {
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
  tooltipRef = React.createRef();

  constructor(props) {
    super();
    this.state = {
      exited: !props.open,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open && !this.props.open && !this.props.transition) {
      // Otherwise handleExited will call this.
      this.handleClose();
    }

    // Let's update the popper position.
    if (
      prevProps.open !== this.props.open ||
      prevProps.anchorEl !== this.props.anchorEl ||
      prevProps.popperOptions !== this.props.popperOptions ||
      prevProps.modifiers !== this.props.modifiers ||
      prevProps.disablePortal !== this.props.disablePortal ||
      prevProps.placement !== this.props.placement
    ) {
      this.handleOpen();
    }
  }

  componentWillUnmount() {
    this.handleClose();
  }

  handleOpen = () => {
    const { anchorEl, modifiers, open, placement, popperOptions = {}, disablePortal } = this.props;
    const popperNode = this.tooltipRef.current;

    if (!popperNode || !anchorEl || !open) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }

    this.popper = new PopperJS(getAnchorEl(anchorEl), popperNode, {
      placement: flipPlacement(placement),
      ...popperOptions,
      modifiers: {
        ...(disablePortal
          ? {}
          : {
              // It's using scrollParent by default, we can use the viewport when using a portal.
              preventOverflow: {
                boundariesElement: 'window',
              },
            }),
        ...modifiers,
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

  handleEnter = () => {
    this.setState({ exited: false });
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

  handleRef = ref => {
    setRef(this.props.innerRef, ref);
    setRef(this.tooltipRef, ref);
  };

  render() {
    const {
      anchorEl,
      children,
      container,
      disablePortal,
      innerRef,
      keepMounted,
      modifiers,
      open,
      placement: placementProps,
      popperOptions,
      transition,
      ...other
    } = this.props;
    const { exited, placement } = this.state;

    if (!keepMounted && !open && (!transition || exited)) {
      return null;
    }

    const childProps = {
      placement: placement || flipPlacement(placementProps),
    };

    if (transition) {
      childProps.TransitionProps = {
        in: open,
        onEnter: this.handleEnter,
        onExited: this.handleExited,
      };
    }

    return (
      <Portal onRendered={this.handleOpen} disablePortal={disablePortal} container={container}>
        <div
          ref={this.handleRef}
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
   * The return value will passed as the reference object of the Popper
   * instance.
   */
  anchorEl: chainPropTypes(PropTypes.oneOfType([PropTypes.object, PropTypes.func]), props => {
    if (props.open) {
      const resolvedAnchorEl = getAnchorEl(props.anchorEl);

      if (resolvedAnchorEl instanceof HTMLElement) {
        const box = resolvedAnchorEl.getBoundingClientRect();

        if (
          process.env.NODE_ENV !== 'test' &&
          box.top === 0 &&
          box.left === 0 &&
          box.right === 0 &&
          box.bottom === 0
        ) {
          return new Error(
            [
              'Material-UI: the `anchorEl` prop provided to the component is invalid.',
              'The node element should be visible.',
            ].join('\n'),
          );
        }
      } else {
        return new Error(
          [
            'Material-UI: the `anchorEl` prop provided to the component is invalid.',
            `It should be a HTMLElement instance but it's \`${resolvedAnchorEl}\` instead.`,
          ].join('\n'),
        );
      }
    }

    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
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
   * @ignore
   * from `withForwardedRef`
   */
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Always keep the children in the DOM.
   * This property can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   */
  keepMounted: PropTypes.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#modifiers--object).
   */
  modifiers: PropTypes.object,
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
   * Help supporting a react-transition-group/Transition component.
   */
  transition: PropTypes.bool,
};

Popper.defaultProps = {
  disablePortal: false,
  keepMounted: false,
  placement: 'bottom',
  transition: false,
};

export default withForwardedRef(Popper);
