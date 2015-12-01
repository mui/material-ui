import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const AvSkipNext = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
      </SvgIcon>
    );
  }

});

export default AvSkipNext;
