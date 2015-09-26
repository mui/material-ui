const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const ImageBrightness1 = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <circle cx="12" cy="12" r="10"/>
      </SvgIcon>
    );
  },
});

module.exports = ImageBrightness1;
