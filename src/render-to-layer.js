import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';
import Dom from './utils/dom';

// heavily inspired by https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx
const RenderToLayer = React.createClass({

  propTypes: {
    closeOnClickAway: React.PropTypes.bool,
    componentClickAway: React.PropTypes.func,
    open: React.PropTypes.bool.isRequired,
  },

  getDefaultProps() {
    return {
      closeOnClickAway:true,
    };
  },

  componentDidMount() {
    this._renderLayer();
  },

  componentDidUpdate() {
    this._renderLayer();
  },

  componentWillUnmount() {
    if (this._layer) {
      this._unrenderLayer();
    }
  },


  onClickAway(e) {
    if (e.defaltPrevented) {
      return;
    }

    const el = this._layer;
    if (e.target !== el && (e.target === window)
        || (document.documentElement.contains(e.target) && !Dom.isDescendant(el, e.target))) {
      if (this.props.closeOnClickAway && this.props.componentClickAway && this.props.open) {
        this.props.componentClickAway(e);
      }
    }
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
      if (this.props.closeOnClickAway) {
        this._layer.addEventListener('touchstart', this.onClickAway);
        this._layer.addEventListener('click', this.onClickAway);
        this._layer.style.position = 'fixed';
        this._layer.style.top = 0;
        this._layer.style.bottom = 0;
        this._layer.style.left = 0;
        this._layer.style.right = 0;
        this._layer.style.zIndex = 20;
      }
      if (this.reactUnmount) {
        this.reactUnmount.cancel();
      }
    } else if (this._layer) {
      this._layer.style.position = 'relative';
      this._layer.removeEventListener('touchstart', this.onClickAway);
      this._layer.removeEventListener('click', this.onClickAway);
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
      this.layerElement = ReactDOM.unstable_renderSubtreeIntoContainer(this, <noscript />, this._layer);
    } else {
      this.layerElement = ReactDOM.unstable_renderSubtreeIntoContainer(this, layerElement, this._layer);
    }
  },

  _unrenderLayer: function() {
    if (!this.reactUnmount)
      this.reactUnmount = debounce(() => {
        if (this._layer) {
          if (this.layerWillUnmount) {
            this.layerWillUnmount(this._layer);
          }
          ReactDOM.unmountComponentAtNode(this._layer);
          document.body.removeChild(this._layer);
          this._layer = null;
        }
      }, 1000);
    this.reactUnmount();
  },

});

export default RenderToLayer;
