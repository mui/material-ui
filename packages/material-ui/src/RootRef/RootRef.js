import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import exactProp from '../utils/exactProp';

/**
 * Helper component to allow attaching a ref to a
 * wrapped element to access the underlying DOM element.
 *
 * It's higly inspired by https://github.com/facebook/react/issues/11401#issuecomment-340543801.
 * For example:
 * ```jsx
 * import React from 'react';
 * import RootRef from '@material-ui/core/RootRef';
 *
 * class MyComponent extends React.Component {
 *   constructor(props) {
 *     super(props);
 *     this.domRef = React.createRef();
 *   }
 *
 *   componentDidMount() {
 *     console.log(this.domRef.current); // DOM node
 *   }
 *
 *   render() {
 *     return (
 *       <RootRef rootRef={this.domRef}>
 *         <SomeChildComponent />
 *       </RootRef>
 *     );
 *   }
 * }
 * ```
 */
class RootRef extends React.Component {
  componentDidMount() {
    const rootRef = this.props.rootRef;
    const node = ReactDOM.findDOMNode(this);
    if (typeof rootRef === 'function') {
      rootRef(node);
    } else if (rootRef) {
      rootRef.current = node;
    }
  }

  componentWillUnmount() {
    const rootRef = this.props.rootRef;
    if (typeof rootRef === 'function') {
      rootRef(null);
    } else if (rootRef) {
      rootRef.current = null;
    }
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
   * Provide a way to access the DOM node of the wrapped element.
   * You can provide a callback ref or a `React.createRef()` ref.
   */
  rootRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

RootRef.propTypes = exactProp(RootRef.propTypes, 'RootRef');

export default RootRef;
