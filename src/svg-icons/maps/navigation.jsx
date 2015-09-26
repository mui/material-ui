const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const MapsNavigation = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
      </SvgIcon>
    );
  },
});

module.exports = MapsNavigation;
