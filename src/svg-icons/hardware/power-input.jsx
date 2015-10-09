const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class HardwarePowerInput extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M2 9v2h19V9H2zm0 6h5v-2H2v2zm7 0h5v-2H9v2zm7 0h5v-2h-5v2z"/>
      </SvgIcon>
    );
  }
}

module.exports = HardwarePowerInput;
