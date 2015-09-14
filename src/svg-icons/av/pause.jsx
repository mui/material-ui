const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const AvPause = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvPause;
