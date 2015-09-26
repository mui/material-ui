const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const ActionSwapHoriz = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
      </SvgIcon>
    );
  },
});

module.exports = ActionSwapHoriz;
