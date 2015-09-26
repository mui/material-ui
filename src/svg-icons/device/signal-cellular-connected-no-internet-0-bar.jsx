const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const DeviceSignalCellularConnectedNoInternet0Bar = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M22 8V2L2 22h16V8z"/><path d="M20 22h2v-2h-2v2zm0-12v8h2v-8h-2z"/>
      </SvgIcon>
    );
  },
});

module.exports = DeviceSignalCellularConnectedNoInternet0Bar;
