const React = require('react');
const PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
const SvgIcon = require('../../svg-icon');

const AvVolumeMute = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvVolumeMute;
