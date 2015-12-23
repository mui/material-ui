import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const DeviceSignalCellular2Bar = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path fillOpacity=".3" d="M2 22h20V2z"/><path d="M14 10L2 22h12z"/>
      </SvgIcon>
    );
  }

});

export default DeviceSignalCellular2Bar;
