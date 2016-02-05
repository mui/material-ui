import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

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

export default EditorShortText;
