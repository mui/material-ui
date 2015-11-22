const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const PlacesBusinessCenter = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V5h4v2z"/>
      </SvgIcon>
    );
  }

});

module.exports = PlacesBusinessCenter;
