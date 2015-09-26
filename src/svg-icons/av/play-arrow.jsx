const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const AvPlayArrow = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M8 5v14l11-7z"/>
      </SvgIcon>
    );
  },
});

module.exports = AvPlayArrow;
