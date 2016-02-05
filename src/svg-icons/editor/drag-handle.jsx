import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

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

export default EditorDragHandle;
