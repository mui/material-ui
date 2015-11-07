import React from 'react';
import ReactDOM from 'react-dom';
import Events from './utils/events';
import Dom from './utils/dom';
import debounce from 'lodash.debounce';

// heavily inspired by https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx
const RenderToLayer = React.createClass({

  componentDidMount() {
    this._renderLayer();
  },

  componentDidUpdate() {
    this._renderLayer();
  },

  componentWillUnmount() {
    this._unbindClickAway();
    if (this._layer) {
      this._unrenderLayer();
    }
  },

  _checkClickAway(e) {
    if (!this.canClickAway) {
      return;
    }
    const el = this._layer;
    if (e.target !== el &&
        !Dom.isDescendant(el, e.target) &&
        document.documentElement.contains(e.target)) {
      if (this.props.componentClickAway) {
        this.props.componentClickAway(e);
      }
    }
  },

  _preventClickAway(e) {
    if (e.detail === this) {
      return;
    }
    this.canClickAway = false;
  },

  _allowClickAway() {
    this.canClickAway = true;
  },

  getLayer() {
    return this._layer;
  },

  render() {
    return null;
  },

  _renderLayer() {
    if (this.props.open) {
      if (!this._layer) {
        this._layer = document.createElement('div');
        document.body.appendChild(this._layer);
      }
      this._bindClickAway();
      if (this.reactUnmount) {
        this.reactUnmount.cancel();
      }
    } else if (this._layer) {
      this._unbindClickAway();
      this._unrenderLayer();
    } else {
      return;
    }

    // By calling this method in componentDidMount() and
    // componentDidUpdate(), you're effectively creating a "wormhole" that
    // funnels React's hierarchical updates through to a DOM node on an
    // entirely different part of the page.

    const layerElement = this.props.render();
    // Renders can return null, but React.render() doesn't like being asked
    // to render null. If we get null back from renderLayer(), just render
    // a noscript element, like React does when an element's render returns
    // null.
    if (layerElement === null) {
        this.layerElement = ReactDOM.unstable_renderSubtreeIntoContainer (this, <noscript />, this._layer);
    } else {
        this.layerElement = ReactDOM.unstable_renderSubtreeIntoContainer(this, layerElement, this._layer);
    }
  },

  _unrenderLayer: function() {
    if (this.layerWillUnmount) {
        this.layerWillUnmount(this._layer);
    }
    if (!this.reactUnmount)
      this.reactUnmount = debounce(() => {
        if (this._layer) {
          ReactDOM.unmountComponentAtNode(this._layer);
          document.body.removeChild(this._layer);
          this._layer = null;
        }
      }, 1000);
    this.reactUnmount();
  },

  _bindClickAway() {
    this.canClickAway = true;
    Events.on(document, 'mousedown', this._checkClickAway);
    Events.on(document, 'touchend', this._checkClickAway);
    Events.on(document, 'popOverOnShow', this._preventClickAway);
    Events.on(document, 'popOverOnHide', this._allowClickAway);
  },

  _unbindClickAway() {
    Events.off(document, 'mousedown', this._checkClickAway);
    Events.off(document, 'touchend', this._checkClickAway);
    Events.off(document, 'popOverOnShow', this._preventClickAway);
    Events.off(document, 'popOverOnHide', this._allowClickAway);
  },
});

export default RenderToLayer;
