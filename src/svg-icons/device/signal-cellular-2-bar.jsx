const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class DeviceSignalCellular2Bar extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".3" d="M2 22h20V2z"/><path d="M14 10L2 22h12z"/>
      </SvgIcon>
    );
  }
}

module.exports = DeviceSignalCellular2Bar;
