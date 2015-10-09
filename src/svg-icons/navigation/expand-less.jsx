const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class NavigationExpandLess extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
      </SvgIcon>
    );
  }
}

module.exports = NavigationExpandLess;
