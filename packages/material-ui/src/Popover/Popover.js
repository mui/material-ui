import * as React from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import {
  chainPropTypes,
  elementTypeAcceptingRef,
  refType,
  HTMLElementType,
} from '@material-ui/utils';
import debounce from '../utils/debounce';
import clsx from 'clsx';
import ownerDocument from '../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';
import createChainedFunction from '../utils/createChainedFunction';
import withStyles from '../styles/withStyles';
import Modal from '../Modal';
import Grow from '../Grow';
import Paper from '../Paper';

export function getOffsetTop(rect, vertical) {
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

export function getOffsetLeft(rect, horizontal) {
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
    .map((n) => (typeof n === 'number' ? `${n}px` : n))
    .join(' ');
}

// Sum the scrollTop between two elements.
function getScrollParent(parent, child) {
  let element = child;
  let scrollTop = 0;

  while (element && element !== parent) {
    element = element.parentElement;
    scrollTop += element.scrollTop;
  }
  return scrollTop;
}

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

export const styles = {
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the `Paper` component. */
  paper: {
    position: 'absolute',
    overflowY: 'auto',
    overflowX: 'hidden',
    // So we see the popover when it's empty.
    // It's most likely on issue on userland.
    minWidth: 16,
    minHeight: 16,
    maxWidth: 'calc(100% - 32px)',
    maxHeight: 'calc(100% - 32px)',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
  },
};

const Popover = React.forwardRef(function Popover(props, ref) {
  const {
    action,
    anchorEl,
    anchorOrigin = {
      vertical: 'top',
      horizontal: 'left',
    },
    anchorPosition,
    anchorReference = 'anchorEl',
    children,
    classes,
    className,
    container: containerProp,
    elevation = 8,
    getContentAnchorEl,
    marginThreshold = 16,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    open,
    PaperProps = {},
    transformOrigin = {
      vertical: 'top',
      horizontal: 'left',
    },
    TransitionComponent = Grow,
    transitionDuration: transitionDurationProp = 'auto',
    TransitionProps = {},
    ...other
  } = props;
  const paperRef = React.useRef();

  // Returns the top/left offset of the position
  // to attach to on the anchor element (or body if none is provided)
  const getAnchorOffset = React.useCallback(
    (contentAnchorOffset) => {
      if (anchorReference === 'anchorPosition') {
        if (process.env.NODE_ENV !== 'production') {
          if (!anchorPosition) {
            console.error(
              'Material-UI: You need to provide a `anchorPosition` prop when using ' +
                '<Popover anchorReference="anchorPosition" />.',
            );
          }
        }
        return anchorPosition;
      }

      const resolvedAnchorEl = getAnchorEl(anchorEl);

      // If an anchor element wasn't provided, just use the parent body element of this Popover
      const anchorElement =
        resolvedAnchorEl && resolvedAnchorEl.nodeType === 1
          ? resolvedAnchorEl
          : ownerDocument(paperRef.current).body;
      const anchorRect = anchorElement.getBoundingClientRect();

      if (process.env.NODE_ENV !== 'production') {
        const box = anchorElement.getBoundingClientRect();

        if (
          process.env.NODE_ENV !== 'test' &&
          box.top === 0 &&
          box.left === 0 &&
          box.right === 0 &&
          box.bottom === 0
        ) {
          console.warn(
            [
              'Material-UI: The `anchorEl` prop provided to the component is invalid.',
              'The anchor element should be part of the document layout.',
              "Make sure the element is present in the document or that it's not display none.",
            ].join('\n'),
          );
        }
      }

      const anchorVertical = contentAnchorOffset === 0 ? anchorOrigin.vertical : 'center';

      return {
        top: anchorRect.top + getOffsetTop(anchorRect, anchorVertical),
        left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
      };
    },
    [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition, anchorReference],
  );

  // Returns the vertical offset of inner content to anchor the transform on if provided
  const getContentAnchorOffset = React.useCallback(
    (element) => {
      let contentAnchorOffset = 0;

      if (getContentAnchorEl && anchorReference === 'anchorEl') {
        const contentAnchorEl = getContentAnchorEl(element);

        if (contentAnchorEl && element.contains(contentAnchorEl)) {
          const scrollTop = getScrollParent(element, contentAnchorEl);
          contentAnchorOffset =
            contentAnchorEl.offsetTop + contentAnchorEl.clientHeight / 2 - scrollTop || 0;
        }

        // != the default value
        if (process.env.NODE_ENV !== 'production') {
          if (anchorOrigin.vertical !== 'top') {
            console.error(
              [
                'Material-UI: You can not change the default `anchorOrigin.vertical` value ',
                'when also providing the `getContentAnchorEl` prop to the popover component.',
                'Only use one of the two props.',
                'Set `getContentAnchorEl` to `null | undefined`' +
                  ' or leave `anchorOrigin.vertical` unchanged.',
              ].join('\n'),
            );
          }
        }
      }

      return contentAnchorOffset;
    },
    [anchorOrigin.vertical, anchorReference, getContentAnchorEl],
  );

  // Return the base transform origin using the element
  // and taking the content anchor offset into account if in use
  const getTransformOrigin = React.useCallback(
    (elemRect, contentAnchorOffset = 0) => {
      return {
        vertical: getOffsetTop(elemRect, transformOrigin.vertical) + contentAnchorOffset,
        horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal),
      };
    },
    [transformOrigin.horizontal, transformOrigin.vertical],
  );

  const getPositioningStyle = React.useCallback(
    (element) => {
      // Check if the parent has requested anchoring on an inner content node
      const contentAnchorOffset = getContentAnchorOffset(element);
      const elemRect = {
        width: element.offsetWidth,
        height: element.offsetHeight,
      };

      // Get the transform origin point on the element itself
      const elemTransformOrigin = getTransformOrigin(elemRect, contentAnchorOffset);

      if (anchorReference === 'none') {
        return {
          top: null,
          left: null,
          transformOrigin: getTransformOriginValue(elemTransformOrigin),
        };
      }

      // Get the offset of of the anchoring element
      const anchorOffset = getAnchorOffset(contentAnchorOffset);

      // Calculate element positioning
      let top = anchorOffset.top - elemTransformOrigin.vertical;
      let left = anchorOffset.left - elemTransformOrigin.horizontal;
      const bottom = top + elemRect.height;
      const right = left + elemRect.width;

      // Use the parent window of the anchorEl if provided
      const containerWindow = ownerWindow(getAnchorEl(anchorEl));

      // Window thresholds taking required margin into account
      const heightThreshold = containerWindow.innerHeight - marginThreshold;
      const widthThreshold = containerWindow.innerWidth - marginThreshold;

      // Check if the vertical axis needs shifting
      if (top < marginThreshold) {
        const diff = top - marginThreshold;
        top -= diff;
        elemTransformOrigin.vertical += diff;
      } else if (bottom > heightThreshold) {
        const diff = bottom - heightThreshold;
        top -= diff;
        elemTransformOrigin.vertical += diff;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (elemRect.height > heightThreshold && elemRect.height && heightThreshold) {
          console.error(
            [
              'Material-UI: The popover component is too tall.',
              `Some part of it can not be seen on the screen (${
                elemRect.height - heightThreshold
              }px).`,
              'Please consider adding a `max-height` to improve the user-experience.',
            ].join('\n'),
          );
        }
      }

      // Check if the horizontal axis needs shifting
      if (left < marginThreshold) {
        const diff = left - marginThreshold;
        left -= diff;
        elemTransformOrigin.horizontal += diff;
      } else if (right > widthThreshold) {
        const diff = right - widthThreshold;
        left -= diff;
        elemTransformOrigin.horizontal += diff;
      }

      return {
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
        transformOrigin: getTransformOriginValue(elemTransformOrigin),
      };
    },
    [
      anchorEl,
      anchorReference,
      getAnchorOffset,
      getContentAnchorOffset,
      getTransformOrigin,
      marginThreshold,
    ],
  );

  const setPositioningStyles = React.useCallback(() => {
    const element = paperRef.current;

    if (!element) {
      return;
    }

    const positioning = getPositioningStyle(element);

    if (positioning.top !== null) {
      element.style.top = positioning.top;
    }
    if (positioning.left !== null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
  }, [getPositioningStyle]);

  const handleEntering = (element, isAppearing) => {
    if (onEntering) {
      onEntering(element, isAppearing);
    }

    setPositioningStyles();
  };

  const handlePaperRef = React.useCallback((instance) => {
    // #StrictMode ready
    paperRef.current = ReactDOM.findDOMNode(instance);
  }, []);

  React.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  });

  React.useImperativeHandle(
    action,
    () =>
      open
        ? {
            updatePosition: () => {
              setPositioningStyles();
            },
          }
        : null,
    [open, setPositioningStyles],
  );

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleResize = debounce(() => {
      setPositioningStyles();
    });

    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [open, setPositioningStyles]);

  let transitionDuration = transitionDurationProp;

  if (transitionDurationProp === 'auto' && !TransitionComponent.muiSupportAuto) {
    transitionDuration = undefined;
  }

  // If the container prop is provided, use that
  // If the anchorEl prop is provided, use its parent body element as the container
  // If neither are provided let the Modal take care of choosing the container
  const container =
    containerProp || (anchorEl ? ownerDocument(getAnchorEl(anchorEl)).body : undefined);

  return (
    <Modal
      container={container}
      open={open}
      ref={ref}
      BackdropProps={{ invisible: true }}
      className={clsx(classes.root, className)}
      {...other}
    >
      <TransitionComponent
        appear
        in={open}
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
        onExited={onExited}
        onExiting={onExiting}
        timeout={transitionDuration}
        {...TransitionProps}
        onEntering={createChainedFunction(handleEntering, TransitionProps.onEntering)}
      >
        <Paper
          data-mui-test="Popover"
          elevation={elevation}
          ref={handlePaperRef}
          {...PaperProps}
          className={clsx(classes.paper, PaperProps.className)}
        >
          {children}
        </Paper>
      </TransitionComponent>
    </Modal>
  );
});

Popover.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: refType,
  /**
   * A HTML element, or a function that returns it.
   * It's used to set the position of the popover.
   */
  anchorEl: chainPropTypes(PropTypes.oneOfType([HTMLElementType, PropTypes.func]), (props) => {
    if (props.open && (!props.anchorReference || props.anchorReference === 'anchorEl')) {
      const resolvedAnchorEl = getAnchorEl(props.anchorEl);

      if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
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
              'Material-UI: The `anchorEl` prop provided to the component is invalid.',
              'The anchor element should be part of the document layout.',
              "Make sure the element is present in the document or that it's not display none.",
            ].join('\n'),
          );
        }
      } else {
        return new Error(
          [
            'Material-UI: The `anchorEl` prop provided to the component is invalid.',
            `It should be an Element instance but it's \`${resolvedAnchorEl}\` instead.`,
          ].join('\n'),
        );
      }
    }

    return null;
  }),
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
      PropTypes.oneOf(['center', 'left', 'right']),
      PropTypes.number,
    ]).isRequired,
    vertical: PropTypes.oneOfType([PropTypes.oneOf(['bottom', 'center', 'top']), PropTypes.number])
      .isRequired,
  }),
  /**
   * This is the position that may be used
   * to set the position of the popover.
   * The coordinates are relative to
   * the application's client area.
   */
  anchorPosition: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }),
  /**
   * This determines which anchor prop to refer to to set
   * the position of the popover.
   */
  anchorReference: PropTypes.oneOf(['anchorEl', 'anchorPosition', 'none']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * A HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.instanceOf(React.Component),
    PropTypes.func,
  ]),
  /**
   * The elevation of the popover.
   */
  elevation: PropTypes.number,
  /**
   * This function is called in order to retrieve the content anchor element.
   * It's the opposite of the `anchorEl` prop.
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
   * Props applied to the [`Paper`](/api/paper/) element.
   */
  PaperProps: PropTypes /* @typescript-to-proptypes-ignore */.shape({
    component: elementTypeAcceptingRef,
  }),
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
      PropTypes.oneOf(['center', 'left', 'right']),
      PropTypes.number,
    ]).isRequired,
    vertical: PropTypes.oneOfType([PropTypes.oneOf(['bottom', 'center', 'top']), PropTypes.number])
      .isRequired,
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   */
  TransitionComponent: PropTypes.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.oneOf(['auto']),
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
  /**
   * Props applied to the [`Transition`](http://reactcommunity.org/react-transition-group/transition#Transition-props) element.
   */
  TransitionProps: PropTypes.object,
};

export default withStyles(styles, { name: 'MuiPopover' })(Popover);
