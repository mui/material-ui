const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const MapsLocalBar = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M11 13v6H6v2h12v-2h-5v-6l8-8V3H3v2l8 8zM7.5 7l-2-2h13l-2 2h-9z"/>
      </SvgIcon>
    );
  },
});

module.exports = MapsLocalBar;
