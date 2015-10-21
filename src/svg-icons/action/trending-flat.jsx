const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
const SvgIcon = require('../../svg-icon');

const ActionTrendingFlat = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M22 12l-4-4v3H3v2h15v3z"/>
      </SvgIcon>
    );
  }

});

module.exports = ActionTrendingFlat;
