import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let AvFiberManualRecord = (props) => (
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="8"/>
  </SvgIcon>
);
AvFiberManualRecord = pure(AvFiberManualRecord)
AvFiberManualRecord.displayName = 'AvFiberManualRecord';

export default AvFiberManualRecord;
