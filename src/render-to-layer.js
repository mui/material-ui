import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash.debounce';
import Dom from './utils/dom';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

// heavily inspired by https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx
const RenderToLayer = React.createClass({

  propTypes: {
    componentClickAway: React.PropTypes.func,
    open: React.PropTypes.bool.isRequired,
    useLayerForClickAway: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      useLayerForClickAway:true,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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
    if (e.defaultPrevented) {
      return;
    }

    const el = this._layer;
    if (e.target !== el && (e.target === window)
        || (document.documentElement.contains(e.target) && !Dom.isDescendant(el, e.target))) {
      if (this.props.componentClickAway && this.props.open) {
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
      if (this.props.useLayerForClickAway) {
        this._layer.addEventListener('touchstart', this.onClickAway);
        this._layer.addEventListener('click', this.onClickAway);
        this._layer.style.position = 'fixed';
        this._layer.style.top = 0;
        this._layer.style.bottom = 0;
        this._layer.style.left = 0;
        this._layer.style.right = 0;
        this._layer.style.zIndex = this.state.muiTheme.zIndex.layer;
      }
      else {
        setTimeout(() => {
          window.addEventListener('touchstart', this.onClickAway);
          window.addEventListener('click', this.onClickAway);
        }, 0);
      }
      if (this.reactUnmount) {
        this.reactUnmount.cancel();
      }
    } else if (this._layer) {
      if (this.props.useLayerForClickAway) {
        this._layer.style.position = 'relative';
        this._layer.removeEventListener('touchstart', this.onClickAway);
        this._layer.removeEventListener('click', this.onClickAway);
      } else {
        window.removeEventListener('touchstart', this.onClickAway);
        window.removeEventListener('click', this.onClickAway);
      }
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
