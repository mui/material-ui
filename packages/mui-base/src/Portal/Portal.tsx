import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  exactProp,
  HTMLElementType,
  unstable_useEnhancedEffect as useEnhancedEffect,
  unstable_useForkRef as useForkRef,
  unstable_setRef as setRef,
} from '@mui/utils';
import { PortalProps } from './Portal.types';

function getContainer(container: PortalProps['container']) {
  return typeof container === 'function' ? container() : container;
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 *
 * Demos:
 *
 * - [Portal](https://mui.com/base/react-portal/)
 *
 * API:
 *
 * - [Portal API](https://mui.com/base/react-portal/components-api/#portal)
 */
const Portal = React.forwardRef(function Portal(
  props: PortalProps,
  ref: React.ForwardedRef<Element>,
) {
  const { children, container, disablePortal = false } = props;
  const [mountNode, setMountNode] = React.useState<ReturnType<typeof getContainer>>(null);
  // @ts-expect-error TODO upstream fix
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
      const newProps = {
        ref: handleRef,
      };
      return React.cloneElement(children, newProps);
    }
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <React.Fragment>
      {mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode}
    </React.Fragment>
  );
}) as React.ForwardRefExoticComponent<PortalProps & React.RefAttributes<Element>>;

Portal.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
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
} as any;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  (Portal as any)['propTypes' + ''] = exactProp((Portal as any).propTypes);
}

export default Portal;
