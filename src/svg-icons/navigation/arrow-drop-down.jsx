const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class NavigationArrowDropDown extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 10l5 5 5-5z"/>
      </SvgIcon>
    );
  }
}

module.exports = NavigationArrowDropDown;
