const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const ImageBrightness1 = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <circle cx="12" cy="12" r="10"/>
      </SvgIcon>
    );
  }

});

module.exports = ImageBrightness1;
