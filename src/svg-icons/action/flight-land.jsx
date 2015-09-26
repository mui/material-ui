const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const ActionFlightLand = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <defs><path id="a" d="M0 0h24v24H0V0z"/></defs><defs><path id="c" d="M0 0h24v24H0V0z"/></defs><clipPath id="b"><use  overflow="visible"/></clipPath><clipPath id="d" clip-path="url(#b)"><use  overflow="visible"/></clipPath><path d="M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16 5.31 1.42c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l1.6.43 5.31 1.43z" clip-path="url(#d)"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionFlightLand;
