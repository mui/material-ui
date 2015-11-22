const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const EditorShortText = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M4 9h16v2H4zm0 4h10v2H4z"/>
      </SvgIcon>
    );
  }

});

module.exports = EditorShortText;
