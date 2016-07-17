import React, { Component, PropTypes } from 'react';
import {
  unstable_renderSubtreeIntoContainer, // eslint-disable-line camelcase
  unmountComponentAtNode,
} from 'react-dom';

// const reflow = (elem) => elem.offsetHeight;

export default class Portal extends Component {
  static propTypes = {
    children: PropTypes.node,
    container: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    open: PropTypes.bool,
  };

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

  getLayer() {
    return this.layer;
  }

  unrenderLayer() {
    if (!this.layer) {
      return;
    }
    unmountComponentAtNode(this.layer);
    document.body.removeChild(this.layer);
    this.layer = null;
  }

  renderLayer() {
    const { children, open } = this.props;

    if (open) {
      if (!this.layer) {
        this.layer = document.createElement('div');
        document.body.appendChild(this.layer);
      }

      /**
       * By calling this method in componentDidMount() and
       * componentDidUpdate(), you're effectively creating a "wormhole" that
       * funnels React's hierarchical updates through to a DOM node on an
       * entirely different part of the page.
       */

      const layerElement = !children ? null : React.Children.only(children);

      this.layerElement = unstable_renderSubtreeIntoContainer(
        this, layerElement, this.layer
      );
      // reflow(this.layer);
    } else {
      this.unrenderLayer();
    }
  }

  render() {
    return null;
  }
}

