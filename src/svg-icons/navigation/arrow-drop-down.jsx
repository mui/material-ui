const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const NavigationArrowDropDown = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 10l5 5 5-5z"/>
      </SvgIcon>
    );
  },
});

module.exports = NavigationArrowDropDown;
