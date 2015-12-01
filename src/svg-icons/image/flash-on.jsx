import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const ImageFlashOn = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
      </SvgIcon>
    );
  }

});

export default ImageFlashOn;
