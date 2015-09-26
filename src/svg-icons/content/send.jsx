const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const ContentSend = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
      </SvgIcon>
    );
  },
});

module.exports = ContentSend;
