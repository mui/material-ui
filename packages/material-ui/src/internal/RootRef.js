import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * @ignore - internal component.
 *
 * Internal helper component to allow attaching a ref to a
 * child element that may not accept refs (functional component).
 * It's higly inspired by https://github.com/facebook/react/issues/11401#issuecomment-340543801
 */
class RootRef extends React.Component {
  componentDidMount() {
    this.props.rootRef(ReactDOM.findDOMNode(this));
  }

  componentWillUnmount() {
    this.props.rootRef(null);
  }

  render() {
    return this.props.children;
  }
}

RootRef.propTypes = {
  children: PropTypes.element.isRequired,
  rootRef: PropTypes.func.isRequired,
};

export default RootRef;
