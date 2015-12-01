import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const ImageBrightness1 = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <circle cx="12" cy="12" r="10"/>
      </SvgIcon>
    );
  }

});

export default ImageBrightness1;
