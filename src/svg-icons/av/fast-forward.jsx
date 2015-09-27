const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class AvFastForward extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
      </SvgIcon>
    );
  }
}

module.exports = AvFastForward;
