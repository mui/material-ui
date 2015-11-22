const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const ActionLineWeight = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionLineWeight;
