import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const AvFiberManualRecord = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <circle cx="12" cy="12" r="8"/>
      </SvgIcon>
    );
  }

});

export default AvFiberManualRecord;
