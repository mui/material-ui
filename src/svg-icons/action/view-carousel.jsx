const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

const ActionViewCarousel = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  },

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"/>
      </SvgIcon>
    );
  },
});

module.exports = ActionViewCarousel;
