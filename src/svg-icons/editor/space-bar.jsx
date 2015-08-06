const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
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
