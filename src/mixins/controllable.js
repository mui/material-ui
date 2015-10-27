let React = require('react');

module.exports = {

  propTypes: {
    onChange: React.PropTypes.func,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
    ]),
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.string.isRequired,
      requestChange: React.PropTypes.func.isRequired,
    }),
  },

  getDefaultProps() {
    return {
      onChange: () => {},
    };
  },

  getValueLink(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange,
    };
  },

};
