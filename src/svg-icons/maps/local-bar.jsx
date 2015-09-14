const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const MapsLocalBar = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M11 13v6H6v2h12v-2h-5v-6l8-8V3H3v2l8 8zM7.5 7l-2-2h13l-2 2h-9z"/>
      </SvgIcon>
    );
  }

});

module.exports = MapsLocalBar;
