import * as React from 'react';

export interface PortalProps {
  /**
   * The children to render into the `container`.
   */
  children?: React.ReactNode;
  /**
   * A HTML element, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: React.ReactInstance | (() => React.ReactInstance | null) | null;
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal?: boolean;
  /**
   * Callback fired once the children has been mounted into the `container`.
   *
   * This prop will be removed in v5, the ref can be used instead.
   * @deprecated Use the ref instead.
   */
  onRendered?: () => void;
}

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 * Demos:
 *
 * - [Portal](https://mui.com/components/portal/)
 *
 * API:
 *
 * - [Portal API](https://mui.com/api/portal/)
 */
export default function Portal(props: PortalProps): JSX.Element;
