const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const DeviceSignalCellularConnectedNoInternet4Bar = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 18h2v-8h-2v8zm0 4h2v-2h-2v2zM2 22h16V8h4V2L2 22z"/>
      </SvgIcon>
    );
  },
});

module.exports = DeviceSignalCellularConnectedNoInternet4Bar;
