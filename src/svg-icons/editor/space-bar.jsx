const React = require('react/addons');
const PureRenderMixin = React.addons.PureRenderMixin;
const SvgIcon = require('../../svg-icon');

const EditorSpaceBar = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M18 9v4H6V9H4v6h16V9z"/>
      </SvgIcon>
    );
  }

});

module.exports = EditorSpaceBar;
