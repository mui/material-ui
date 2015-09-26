const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const EditorVerticalAlignTop = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"/>
      </SvgIcon>
    );
  }

});

module.exports = EditorVerticalAlignTop;
