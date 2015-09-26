const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const AvSkipPrevious = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
      </SvgIcon>
    );
  },
});

module.exports = AvSkipPrevious;
