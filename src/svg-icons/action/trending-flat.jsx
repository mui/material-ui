const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const ActionTrendingFlat = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M22 12l-4-4v3H3v2h15v3z"/>
      </SvgIcon>
    );
  },
});

module.exports = ActionTrendingFlat;
