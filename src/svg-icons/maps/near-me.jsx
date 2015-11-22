const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const MapsNearMe = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/>
      </SvgIcon>
    );
  }

});

module.exports = MapsNearMe;
