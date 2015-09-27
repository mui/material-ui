const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class DeviceNetworkCell extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M2 22h20V2z"/><path d="M17 7L2 22h15z"/>
      </SvgIcon>
    );
  }
}

module.exports = DeviceNetworkCell;
