import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const ImagePhotoFilter = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M17.13 8.9l.59-1.3 1.3-.6-1.3-.59-.59-1.3-.59 1.3-1.31.59 1.31.6zm-4.74-2.37l-1.18 2.61-2.61 1.18 2.61 1.18 1.18 2.61 1.19-2.61 2.6-1.18-2.6-1.18zM19.02 10v9H5V5h9V3H5.02c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2z"/>
      </SvgIcon>
    );
  }

});

export default ImagePhotoFilter;
