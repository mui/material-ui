import Events from './events';

const Sizes = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
};

export default {

  statics: {
    Sizes: Sizes,
  },

  getInitialState() {
    return {
      deviceSize: Sizes.SMALL,
    };
  },

  componentDidMount() {
    this.updateDeviceSize();
    if (!this.manuallyBindResize) this.bindResize();
  },

  componentWillUnmount() {
    this.unbindResize();
  },

  isDeviceSize(desiredSize) {
    return this.state.deviceSize >= desiredSize;
  },

  updateDeviceSize() {
    const width = window.innerWidth;

    if (width >= 992) {
      this.setState({deviceSize: Sizes.LARGE});
    } else if (width >= 768) {
      this.setState({deviceSize: Sizes.MEDIUM});
    } else { // width < 768
      this.setState({deviceSize: Sizes.SMALL});
    }
  },

  bindResize() {
    Events.on(window, 'resize', this.updateDeviceSize);
  },

  unbindResize() {
    Events.off(window, 'resize', this.updateDeviceSize);
  },
};
