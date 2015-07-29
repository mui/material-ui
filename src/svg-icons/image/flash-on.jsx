const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
const SvgIcon = require('../../svg-icon');

const ImageFlashOn = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageFlashOn;
