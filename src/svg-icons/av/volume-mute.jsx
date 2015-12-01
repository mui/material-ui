import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const AvVolumeMute = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 9v6h4l5 5V4l-5 5H7z"/>
      </SvgIcon>
    );
  }

});

export default AvVolumeMute;
