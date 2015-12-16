import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const DeviceSignalCellularNull = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M20 6.83V20H6.83L20 6.83M22 2L2 22h20V2z"/>
      </SvgIcon>
    );
  }

});

export default DeviceSignalCellularNull;
