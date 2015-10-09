const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class NavigationCheck extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
      </SvgIcon>
    );
  }
}

module.exports = NavigationCheck;
