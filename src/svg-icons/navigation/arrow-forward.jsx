const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class NavigationArrowForward extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
      </SvgIcon>
    );
  }
}

module.exports = NavigationArrowForward;
