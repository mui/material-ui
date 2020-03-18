import * as React from 'react';

export interface RootRefProps<T = any> {
  rootRef?: ((instance: T | null) => void) | React.RefObject<T>;
}

/**
 * ⚠️⚠️⚠️
 * If you want the DOM element of a Material-UI component check out
 * [FAQ: How can I access the DOM element?](https://material-ui.com/getting-started/faq/#how-can-i-access-the-dom-element)
 * first.
 *
 * This component uses `findDOMNode` which is deprecated in React.StrictMode.
 *
 * Helper component to allow attaching a ref to a
 * wrapped element to access the underlying DOM element.
 *
 * It's highly inspired by <https://github.com/facebook/react/issues/11401#issuecomment-340543801>.
 * For example:
 *
 * ```jsx
 * import React from 'react';
 * import RootRef from '@material-ui/core/RootRef';
 *
 * function MyComponent() {
 *   const domRef = React.useRef();
 *
 *   React.useEffect(() => {
 *     console.log(domRef.current); // DOM node
 *   }, []);
 *
 *   return (
 *     <RootRef rootRef={domRef}>
 *       <SomeChildComponent />
 *     </RootRef>
 *   );
 * }
 * ```
 * API:
 *
 * - [RootRef API](https://material-ui.com/api/root-ref/)
 */
declare const RootRef: React.ComponentType<RootRefProps>;

export default RootRef;
