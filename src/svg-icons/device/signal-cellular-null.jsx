const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const DeviceSignalCellularNull = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 6.83V20H6.83L20 6.83M22 2L2 22h20V2z"/>
      </SvgIcon>
    );
  },
});

module.exports = DeviceSignalCellularNull;
