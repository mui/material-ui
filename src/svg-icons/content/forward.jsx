const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const ContentForward = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 8V4l8 8-8 8v-4H4V8z"/>
      </SvgIcon>
    );
  },
});

module.exports = ContentForward;
