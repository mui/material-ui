const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const DeviceSignalCellular4Bar = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M2 22h20V2z"/>
      </SvgIcon>
    );
  },
});

module.exports = DeviceSignalCellular4Bar;
