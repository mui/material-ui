const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const HardwareKeyboardArrowLeft = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
      </SvgIcon>
    );
  },
});

module.exports = HardwareKeyboardArrowLeft;
