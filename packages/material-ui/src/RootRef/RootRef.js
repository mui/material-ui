import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Helper component to allow attaching a ref to a
 * child element that may not accept refs (functional component).
 * It's higly inspired by https://github.com/facebook/react/issues/11401#issuecomment-340543801
 */
class RootRef extends React.Component {
  componentDidMount() {
    const rootRef = this.props.rootRef;
    const node = ReactDOM.findDOMNode(this);
    if (typeof rootRef === 'function') {
      rootRef(node);
    } else {
      rootRef.current = node;
    }
  }

  componentWillUnmount() {
    const rootRef = this.props.rootRef;
    if (typeof rootRef === 'function') {
      rootRef(null);
    } else {
      rootRef.current = null;
    }
  }

  render() {
    return this.props.children;
  }
}

RootRef.propTypes = {
  children: PropTypes.element.isRequired,
  rootRef: PropTypes.oneOfType([PropTypes.func.isRequired, PropTypes.object.isRequired]),
};

export default RootRef;
