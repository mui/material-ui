const React = require('react');
const PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
const SvgIcon = require('../../svg-icon');

const AvFastRewind = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvFastRewind;
