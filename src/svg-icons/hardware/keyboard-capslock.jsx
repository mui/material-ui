const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class HardwareKeyboardCapslock extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 8.41L16.59 13 18 11.59l-6-6-6 6L7.41 13 12 8.41zM6 18h12v-2H6v2z"/>
      </SvgIcon>
    );
  }
}

module.exports = HardwareKeyboardCapslock;
