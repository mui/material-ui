// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  unstable_renderSubtreeIntoContainer, // eslint-disable-line camelcase
  unmountComponentAtNode,
} from 'react-dom';

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
    return this.layer;
  }

  unrenderLayer() {
    if (!this.layer) {
      return;
    }
    unmountComponentAtNode(this.layer);
    if (document.body) {
      document.body.removeChild(this.layer);
    }
    this.layer = null;
  }

  renderLayer() {
    const { children, open } = this.props;

    if (open) {
      if (!this.layer) {
        this.layer = document.createElement('div');
        this.layer.setAttribute('data-mui-portal', 'true');
        if (document.body) {
          document.body.appendChild(this.layer);
        }
      }

      /**
       * By calling this method in componentDidMount() and
       * componentDidUpdate(), you're effectively creating a "wormhole" that
       * funnels React's hierarchical updates through to a DOM node on an
       * entirely different part of the page.
       */

      const layerElement = React.Children.only(children);
      unstable_renderSubtreeIntoContainer(this, layerElement, this.layer);
    } else {
      this.unrenderLayer();
    }
  }

  render() {
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
