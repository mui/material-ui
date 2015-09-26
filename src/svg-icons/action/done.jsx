const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const ActionDone = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
      </SvgIcon>
    );
  },
});

module.exports = ActionDone;
