const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const DeviceSignalCellularConnectedNoInternet1Bar = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M22 8V2L2 22h16V8z"/><path d="M20 10v8h2v-8h-2zm-8 12V12L2 22h10zm8 0h2v-2h-2v2z"/>
      </SvgIcon>
    );
  },
});

module.exports = DeviceSignalCellularConnectedNoInternet1Bar;
