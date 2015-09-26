const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const NavigationArrowDropUp = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 14l5-5 5 5z"/>
      </SvgIcon>
    );
  },
});

module.exports = NavigationArrowDropUp;
