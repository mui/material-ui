const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const ImageViewCompact = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M3 19h6v-7H3v7zm7 0h12v-7H10v7zM3 5v6h19V5H3z"/>
      </SvgIcon>
    );
  },
});

module.exports = ImageViewCompact;
