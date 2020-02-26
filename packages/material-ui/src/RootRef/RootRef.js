import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { exactProp, refType } from '@material-ui/utils';
import setRef from '../utils/setRef';

/**
 * ⚠️⚠️⚠️
 * If you want the DOM element of a Material-UI component check out
 * [FAQ: How can I access the DOM element?](/getting-started/faq/#how-can-i-access-the-dom-element)
 * first.
 *
 * This component uses `findDOMNode` which is deprecated in React.StrictMode.
 *
 * Helper component to allow attaching a ref to a
 * wrapped element to access the underlying DOM element.
 *
 * It's highly inspired by https://github.com/facebook/react/issues/11401#issuecomment-340543801.
 * For example:
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
 */
class RootRef extends React.Component {
  componentDidMount() {
    this.ref = ReactDOM.findDOMNode(this);
    setRef(this.props.rootRef, this.ref);
  }

  componentDidUpdate(prevProps) {
    const ref = ReactDOM.findDOMNode(this);

    if (prevProps.rootRef !== this.props.rootRef || this.ref !== ref) {
      if (prevProps.rootRef !== this.props.rootRef) {
        setRef(prevProps.rootRef, null);
      }

      this.ref = ref;
      setRef(this.props.rootRef, this.ref);
    }
  }

  componentWillUnmount() {
    this.ref = null;
    setRef(this.props.rootRef, null);
  }

  render() {
    return this.props.children;
  }
}

RootRef.propTypes = {
  /**
   * The wrapped element.
   */
  children: PropTypes.element.isRequired,
  /**
   * A ref that points to the first DOM node of the wrapped element.
   */
  rootRef: refType.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  RootRef.propTypes = exactProp(RootRef.propTypes);
}

export default RootRef;
