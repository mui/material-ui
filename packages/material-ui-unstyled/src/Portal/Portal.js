import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  exactProp,
  HTMLElementType,
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_useForkRef as useForkRef,
  unstable_setRef as setRef,
} from '@material-ui/utils';

function getContainer(container) {
  return typeof container === 'function' ? container() : container;
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
const Portal = React.forwardRef(function Portal(props, ref) {
  const { children, container, disablePortal = false } = props;
  const [mountNode, setMountNode] = React.useState(null);
  const handleRef = useForkRef(React.isValidElement(children) ? children.ref : null, ref);

  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);

  useEnhancedEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode);
      return () => {
        setRef(ref, null);
      };
    }

    return undefined;
  }, [ref, mountNode, disablePortal]);

  if (disablePortal) {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref: handleRef,
      });
    }
    return children;
  }

  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
});

Portal.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The children to render into the `container`.
   */
  children: PropTypes.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
};

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  Portal['propTypes' + ''] = exactProp(Portal.propTypes);
}

export default Portal;
