const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const NavigationMenu = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </SvgIcon>
    );
  },
});

module.exports = NavigationMenu;
