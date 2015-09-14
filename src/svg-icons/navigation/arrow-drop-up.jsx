const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const NavigationArrowDropUp = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 14l5-5 5 5z"/>
      </SvgIcon>
    );
  }

});

module.exports = NavigationArrowDropUp;
