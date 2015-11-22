const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('../../svg-icon');

const EditorDragHandle = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/>
      </SvgIcon>
    );
  }

});

module.exports = EditorDragHandle;
