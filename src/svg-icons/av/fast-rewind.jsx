const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class AvFastRewind extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
      </SvgIcon>
    );
  }
}

module.exports = AvFastRewind;
