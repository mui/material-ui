const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class HardwareKeyboardBackspace extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/>
      </SvgIcon>
    );
  }
}

module.exports = HardwareKeyboardBackspace;
