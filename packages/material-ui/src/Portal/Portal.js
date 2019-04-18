import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ownerDocument from '../utils/ownerDocument';
import { exactProp } from '@material-ui/utils';

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument(element) {
  return ownerDocument(ReactDOM.findDOMNode(element));
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
const Portal = React.forwardRef(function Portal(props, ref) {
  const { children, disablePortal, onRendered, container } = props;
  const [, forceUpdate] = React.useState(0);
  const mountNodeRef = React.useRef();
  const renderedTimerRef = React.useRef();

  const setMountNode = () => {
    if (disablePortal) {
      // mountNodeRef.current = ReactDOM.findDOMNode(ref).parentElement;

      return;
    }
    mountNodeRef.current = getContainer(container, getOwnerDocument(ref).body);
  };

  const child = React.cloneElement(children, {
    ref,
    ...children.props,
  });
  React.useEffect(() => {
    setMountNode();

    // Only rerender if needed
    if (!disablePortal) {
      forceUpdate(onRendered);
    }

    return () => {
      mountNodeRef.current = undefined;
      clearTimeout(renderedTimerRef.current);
    };
  }, [container, disablePortal, onRendered, setMountNode]);

  React.useEffect(() => {
    setMountNode();
    // Only rerender if needed
    if (!disablePortal) {
      if (onRendered) {
        // This might be triggered earlier than the componentDidUpdate of a parent element.
        // We need to account for it.
        clearTimeout(renderedTimerRef.current);
        renderedTimerRef.current = setTimeout(onRendered);
      }
      forceUpdate(x => x + 1);
    }
  }, [container, disablePortal, onRendered, setMountNode]);
  if (disablePortal) {
    return children;
  }

  return mountNodeRef.current && ReactDOM.createPortal(child, mountNodeRef.current);
});

Portal.propTypes = {
  /**
   * The children to render into the `container`.
   */
  children: PropTypes.node.isRequired,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered: PropTypes.func,
};

Portal.defaultProps = {
  disablePortal: false,
};

if (process.env.NODE_ENV !== 'production') {
  Portal.propTypes = exactProp(Portal.propTypes);
}

export default Portal;
