const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const ContentFilterList = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
      </SvgIcon>
    );
  },
});

module.exports = ContentFilterList;
