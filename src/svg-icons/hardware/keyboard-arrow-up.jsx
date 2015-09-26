const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const HardwareKeyboardArrowUp = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
      </SvgIcon>
    );
  },
});

module.exports = HardwareKeyboardArrowUp;
