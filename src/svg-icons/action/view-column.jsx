const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ActionViewColumn extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"/>
      </SvgIcon>
    );
  }
}

module.exports = ActionViewColumn;
