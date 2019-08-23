import React from 'react';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import { chainPropTypes } from '@material-ui/utils';
import Portal from '../Portal';
import { createChainedFunction } from '../utils/helpers';
import { setRef, useForkRef } from '../utils/reactHelpers';
import ownerWindow from '../utils/ownerWindow';

/**
 * Flips placement if in <body dir="rtl" />
 * @param {string} placement
 */
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

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const defaultPopperOptions = {};

/**
 * Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */
const Popper = React.forwardRef(function Popper(props, ref) {
  const {
    anchorEl,
    children,
    container,
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement: initialPlacement = 'bottom',
    popperOptions = defaultPopperOptions,
    popperRef: popperRefProp,
    transition = false,
    ...other
  } = props;
  const tooltipRef = React.useRef(null);
  const ownRef = useForkRef(tooltipRef, ref);

  const popperRef = React.useRef(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = React.useRef(handlePopperRef);
  useEnhancedEffect(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  React.useImperativeHandle(popperRefProp, () => popperRef.current, []);

  const [exited, setExited] = React.useState(true);

  const rtlPlacement = flipPlacement(initialPlacement);
  /**
   * placement initialized from prop but can change during lifetime if modifiers.flip.
   * modifiers.flip is essentially a flip for controlled/uncontrolled behavior
   */
  const [placement, setPlacement] = React.useState(rtlPlacement);
  if (rtlPlacement !== placement) {
    setPlacement(rtlPlacement);
  }

  const handleOpen = React.useCallback(() => {
    const popperNode = tooltipRef.current;

    if (!popperNode || !anchorEl || !open) {
      return;
    }

    if (popperRef.current) {
      popperRef.current.destroy();
      handlePopperRefRef.current(null);
    }

    const handlePopperUpdate = data => {
      setPlacement(data.placement);
    };

    const popper = new PopperJS(getAnchorEl(anchorEl), popperNode, {
      placement: rtlPlacement,
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
      onUpdate: createChainedFunction(handlePopperUpdate, popperOptions.onUpdate),
    });
    handlePopperRefRef.current(popper);
  }, [anchorEl, disablePortal, modifiers, open, rtlPlacement, popperOptions]);

  const handleRef = React.useCallback(
    node => {
      setRef(ownRef, node);
      handleOpen();
    },
    [ownRef, handleOpen],
  );

  const handleEnter = () => {
    setExited(false);
  };

  const handleClose = () => {
    if (!popperRef.current) {
      return;
    }

    popperRef.current.destroy();
    handlePopperRefRef.current(null);
  };

  const handleExited = () => {
    setExited(true);
    handleClose();
  };

  React.useEffect(() => {
    // Let's update the popper position.
    handleOpen();
  }, [handleOpen]);

  React.useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);

  React.useEffect(() => {
    if (!open && !transition) {
      // Otherwise handleExited will call this.
      handleClose();
    }
  }, [open, transition]);

  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }

  const childProps = { placement };

  if (transition) {
    childProps.TransitionProps = {
      in: open,
      onEnter: handleEnter,
      onExited: handleExited,
    };
  }

  return (
    <Portal disablePortal={disablePortal} container={container}>
      <div
        ref={handleRef}
        role="tooltip"
        style={{
          // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
          position: 'fixed',
        }}
        {...other}
      >
        {typeof children === 'function' ? children(childProps) : children}
      </div>
    </Portal>
  );
});

Popper.propTypes = {
  /**
   * This is the reference element, or a function that returns the reference element,
   * that may be used to set the position of the popover.
   * The return value will passed as the reference object of the Popper
   * instance.
   *
   * The reference element should be an HTML Element instance or a referenceObject:
   * https://popper.js.org/popper-documentation.html#referenceObject.
   */
  anchorEl: chainPropTypes(PropTypes.oneOfType([PropTypes.object, PropTypes.func]), props => {
    if (props.open) {
      const resolvedAnchorEl = getAnchorEl(props.anchorEl);
      const containerWindow = ownerWindow(resolvedAnchorEl);

      if (resolvedAnchorEl instanceof containerWindow.Element) {
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
              'The reference element should be part of the document layout.',
              "Make sure the element is present in the document or that it's not display none.",
            ].join('\n'),
          );
        }
      } else if (
        !resolvedAnchorEl ||
        typeof resolvedAnchorEl.clientWidth !== 'number' ||
        typeof resolvedAnchorEl.clientHeight !== 'number' ||
        typeof resolvedAnchorEl.getBoundingClientRect !== 'function'
      ) {
        return new Error(
          [
            'Material-UI: the `anchorEl` prop provided to the component is invalid.',
            'It should be an HTML Element instance or a referenceObject:',
            'https://popper.js.org/popper-documentation.html#referenceObject.',
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
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
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
   * Callback fired when a new popper instance is used.
   */
  popperRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   */
  transition: PropTypes.bool,
};

export default Popper;
