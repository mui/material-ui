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
 * @ignore - internal component.
 *
 * This module will soon be gone. We should drop it as soon as React@15.x support stop.
 */
class LegacyPortal extends React.Component {
  componentDidMount() {
    this.mounted = true;
    this.renderOverlay();
  }

  componentWillReceiveProps(nextProps) {
    if (this.overlayTarget && nextProps.container !== this.props.container) {
      this.mountNode.removeChild(this.overlayTarget);
      this.mountNode = getContainer(nextProps.container, getOwnerDocument(this).body);
      this.mountNode.appendChild(this.overlayTarget);
    }
  }

  componentDidUpdate() {
    this.renderOverlay();
  }

  componentWillUnmount() {
    this.mounted = false;
    this.unrenderOverlay();
    this.unmountOverlayTarget();
  }

  /**
   * @public
   */
  getMountNode = () => {
    return this.mountNode;
  };

  mountOverlayTarget = () => {
    if (!this.overlayTarget) {
      this.overlayTarget = document.createElement('div');
      this.mountNode = getContainer(this.props.container, getOwnerDocument(this).body);
      this.mountNode.appendChild(this.overlayTarget);
    }
  };

  unmountOverlayTarget = () => {
    if (this.overlayTarget) {
      this.mountNode.removeChild(this.overlayTarget);
      this.overlayTarget = null;
    }
    this.mountNode = null;
  };

  unrenderOverlay = () => {
    if (this.overlayTarget) {
      ReactDOM.unmountComponentAtNode(this.overlayTarget);
      this.overlayInstance = null;
    }
  };

  renderOverlay = () => {
    const overlay = this.props.children;
    this.mountOverlayTarget();
    const initialRender = !this.overlayInstance;
    this.overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      overlay,
      this.overlayTarget,
      () => {
        if (initialRender && this.props.onRendered) {
          this.props.onRendered();
        }
      },
    );
  };

  render() {
    return null;
  }
}

LegacyPortal.propTypes = {
  children: PropTypes.element.isRequired,
  container: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  onRendered: PropTypes.func,
};

LegacyPortal.propTypes = exactProp(LegacyPortal.propTypes, 'LegacyPortal');

export default LegacyPortal;
