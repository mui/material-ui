let Events = require('../utils/events');

const Sizes = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
};


module.exports = {

  statics: {
    Sizes: Sizes,
  },

  getInitialState() {
    return {
      deviceSize: Sizes.SMALL,
    };
  },

  componentDidMount() {
    this._updateDeviceSize();
    if (!this.manuallyBindResize) this._bindResize();
  },

  componentWillUnmount() {
    this._unbindResize();
  },

  isDeviceSize(desiredSize) {
    return this.state.deviceSize >= desiredSize;
  },

  _updateDeviceSize() {
    let width = window.innerWidth;
    if (width >= 992) this.setState({deviceSize: Sizes.LARGE});
    else if (width >= 768) this.setState({deviceSize: Sizes.MEDIUM});
    else this.setState({deviceSize: Sizes.SMALL}); // width >= 375
  },

  _bindResize() {
    Events.on(window, 'resize', this._updateDeviceSize);
  },

  _unbindResize() {
    Events.off(window, 'resize', this._updateDeviceSize);
  },
};
