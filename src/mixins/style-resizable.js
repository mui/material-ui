var React = require('react');
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

	getInitialState: function() {
		return {
			deviceSize: Sizes.SMALL
		};
	},

  componentDidMount: function() {
    this._updateDeviceSize();
    if (!this.manuallyBindResize) this._bindResize();
  },

  componentWillUnmount: function() {
    this._unbindResize();
  },

  isDeviceSize: function(desiredSize) {
    return this.state.deviceSize >= desiredSize;
  },

  _updateDeviceSize: function(e) {
    var width = window.innerWidth;
    if (width >= 992) this.setState({deviceSize: Sizes.LARGE});
    else if (width >= 768) this.setState({deviceSize: Sizes.MEDIUM});
    else this.setState({deviceSize: Sizes.SMALL}); // width >= 375
  },

  _bindResize: function() {
    Events.on(window, 'resize', this._updateDeviceSize);
  },

  _unbindResize: function() {
    Events.off(window, 'resize', this._updateDeviceSize);
  }
};