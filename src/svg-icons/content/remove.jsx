const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const ContentRemove = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 13H5v-2h14v2z"/>
      </SvgIcon>
    );
  },
});

module.exports = ContentRemove;
