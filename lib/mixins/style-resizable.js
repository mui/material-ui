'use strict';

var Events = require('../utils/events');

var Sizes = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3
};

module.exports = {

  statics: {
    Sizes: Sizes
  },

  getInitialState: function getInitialState() {
    return {
      deviceSize: Sizes.SMALL
    };
  },

  componentDidMount: function componentDidMount() {
    this._updateDeviceSize();
    if (!this.manuallyBindResize) this._bindResize();
  },

  componentWillUnmount: function componentWillUnmount() {
    this._unbindResize();
  },

  isDeviceSize: function isDeviceSize(desiredSize) {
    return this.state.deviceSize >= desiredSize;
  },

  _updateDeviceSize: function _updateDeviceSize() {
    var width = window.innerWidth;
    if (width >= 992) this.setState({ deviceSize: Sizes.LARGE });else if (width >= 768) this.setState({ deviceSize: Sizes.MEDIUM });else this.setState({ deviceSize: Sizes.SMALL }); // width < 768
  },

  _bindResize: function _bindResize() {
    Events.on(window, 'resize', this._updateDeviceSize);
  },

  _unbindResize: function _unbindResize() {
    Events.off(window, 'resize', this._updateDeviceSize);
  }
};