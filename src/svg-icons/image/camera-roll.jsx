const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const ImageCameraRoll = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M14 5c0-1.1-.9-2-2-2h-1V2c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1v1H4c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2h8V5h-8zm-2 13h-2v-2h2v2zm0-9h-2V7h2v2zm4 9h-2v-2h2v2zm0-9h-2V7h2v2zm4 9h-2v-2h2v2zm0-9h-2V7h2v2z"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageCameraRoll;
