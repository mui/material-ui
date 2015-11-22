const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const AvPlaylistPlay = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 9H2v2h17V9zm0-4H2v2h17V5zM2 15h13v-2H2v2zm15-2v6l5-3-5-3z"/>
      </SvgIcon>
    );
  }

});

module.exports = AvPlaylistPlay;
