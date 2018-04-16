import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ownerDocument from 'dom-helpers/ownerDocument';
import exactProp from '../utils/exactProp';

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return ReactDOM.findDOMNode(container) || defaultContainer;
}

function getOwnerDocument(element) {
  return ownerDocument(ReactDOM.findDOMNode(element));
}

/**
 * This component shares many concepts with
 * [react-overlays](https://react-bootstrap.github.io/react-overlays/#portals)
 * But has been forked in order to fix some bugs, reduce the number of dependencies
 * and take the control of our destiny.
 */
class Portal extends React.Component {
  componentDidMount() {
    this.setContainer(this.props.container);
    this.forceUpdate(this.props.onRendered);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.container !== this.props.container) {
      this.setContainer(this.props.container);
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    this.mountNode = null;
  }

  setContainer(container) {
    this.mountNode = getContainer(container, getOwnerDocument(this).body);
  }

  /**
   * @public
   */
  getMountNode = () => {
    return this.mountNode;
  };

  render() {
    const { children } = this.props;

    return this.mountNode ? ReactDOM.createPortal(children, this.mountNode) : null;
  }
}

Portal.propTypes = {
  /**
   * The children to render into the `container`.
   */
  children: PropTypes.node.isRequired,
  /**
   * A node, component instance, or function that returns either.
   * The `container` will have the portal children appended to it.
   * By default, it's using the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  /**
   * Callback fired once the children has been mounted into the `container`.
   */
  onRendered: PropTypes.func,
};

Portal.propTypes = exactProp(Portal.propTypes, 'Portal');

export default Portal;
