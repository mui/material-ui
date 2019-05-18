import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ownerDocument from '../utils/ownerDocument';
import { useForkRef } from '../utils/reactHelpers';
import { elementAcceptingRef, exactProp } from '@material-ui/utils';

function useMountedRef() {
  const mountedRef = React.useRef(false);
  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
}

function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */
function ClickAwayListener(props) {
  const { children, mouseEvent = 'onClick', touchEvent = 'onTouchEnd', onClickAway } = props;
  const mountedRef = useMountedRef();
  const movedRef = React.useRef(false);

  const nodeRef = React.useRef(null);
  // can be removed once we drop support for non ref forwarding class components
  const handleOwnRef = React.useCallback(instance => {
    // #StrictMode ready
    nodeRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  const handleRef = useForkRef(children.ref, handleOwnRef);

  const handleClickAway = React.useCallback(
    event => {
      // Ignore events that have been `event.preventDefault()` marked.
      if (event.defaultPrevented) {
        return;
      }

      // IE 11 support, which trigger the handleClickAway even after the unbind
      if (!mountedRef.current) {
        return;
      }

      // Do not act if user performed touchmove
      if (movedRef.current) {
        movedRef.current = false;
        return;
      }

      const { current: node } = nodeRef;
      // The child might render null.
      if (!node) {
        return;
      }

      const doc = ownerDocument(node);

      if (
        doc.documentElement &&
        doc.documentElement.contains(event.target) &&
        !node.contains(event.target)
      ) {
        onClickAway(event);
      }
    },
    [mountedRef, onClickAway],
  );

  const handleTouchMove = React.useCallback(() => {
    movedRef.current = true;
  }, []);

  React.useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);

      document.addEventListener(mappedTouchEvent, handleClickAway);
      document.addEventListener('touchmove', handleTouchMove);

      return () => {
        document.removeEventListener(mappedTouchEvent, handleClickAway);
        document.removeEventListener('touchmove', handleTouchMove);
      };
    }

    return undefined;
  }, [handleClickAway, handleTouchMove, touchEvent]);

  React.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      document.addEventListener(mappedMouseEvent, handleClickAway);

      return () => {
        document.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }

    return undefined;
  }, [handleClickAway, mouseEvent]);

  return <React.Fragment>{React.cloneElement(children, { ref: handleRef })}</React.Fragment>;
}

ClickAwayListener.propTypes = {
  /**
   * The wrapped element.
   */
  children: elementAcceptingRef.isRequired,
  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent: PropTypes.oneOf(['onClick', 'onMouseDown', 'onMouseUp', false]),
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: PropTypes.func.isRequired,
  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent: PropTypes.oneOf(['onTouchStart', 'onTouchEnd', false]),
};

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  ClickAwayListener['propTypes' + ''] = exactProp(ClickAwayListener.propTypes);
}

export default ClickAwayListener;
