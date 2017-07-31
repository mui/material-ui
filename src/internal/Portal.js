// @flow weak

import { Component, Children } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

/**
 * @ignore - internal component.
 */
class Portal extends Component {
  static defaultProps = {
    open: false,
  };

  componentDidMount() {
    this.renderLayer();
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    this.unrenderLayer();
  }

  layer = null;

  getLayer() {
    if (!this.layer) {
      this.layer = document.createElement('div');
      this.layer.setAttribute('data-mui-portal', 'true');
      if (document.body) {
        document.body.appendChild(this.layer);
      }
    }

    return this.layer;
  }

  unrenderLayer() {
    if (!this.layer) {
      return;
    }

    // Support react@15.x
    if (!ReactDOM.unstable_createPortal) {
      ReactDOM.unmountComponentAtNode(this.layer);
    }

    if (document.body) {
      document.body.removeChild(this.layer);
    }
    this.layer = null;
  }

  renderLayer() {
    // Support react@15.x
    if (ReactDOM.unstable_createPortal) {
      return;
    }

    const { children, open } = this.props;

    if (open) {
      /**
       * By calling this method in componentDidMount() and
       * componentDidUpdate(), you're effectively creating a "wormhole" that
       * funnels React's hierarchical updates through to a DOM node on an
       * entirely different part of the page.
       */

      const layerElement = Children.only(children);
      ReactDOM.unstable_renderSubtreeIntoContainer(this, layerElement, this.getLayer());
    } else {
      this.unrenderLayer();
    }
  }

  render() {
    const { children, open } = this.props;

    // Support react@16.x
    if (ReactDOM.unstable_createPortal && open) {
      return ReactDOM.unstable_createPortal(children, this.getLayer());
    }

    return null;
  }
}

Portal.propTypes = {
  /**
   * The content to portal in order to escape the parent DOM node.
   */
  children: PropTypes.node,
  /**
   * If `true` the children will be mounted into the DOM.
   */
  open: PropTypes.bool,
};

export default Portal;
