const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class NavigationChevronRight extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </SvgIcon>
    );
  }
}

module.exports = NavigationChevronRight;
