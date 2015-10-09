const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class HardwareKeyboardReturn extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7z"/>
      </SvgIcon>
    );
  }
}

module.exports = HardwareKeyboardReturn;
