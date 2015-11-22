const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const MapsLocalBar = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9zM7.43 7L5.66 5h12.69l-1.78 2H7.43z"/>
      </SvgIcon>
    );
  }

});

module.exports = MapsLocalBar;
