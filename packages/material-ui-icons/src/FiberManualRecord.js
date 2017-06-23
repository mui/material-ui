import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let FiberManualRecord = props =>
  <SvgIcon {...props}>
    <circle cx="12" cy="12" r="8" />
  </SvgIcon>;

FiberManualRecord = pure(FiberManualRecord);
FiberManualRecord.muiName = 'SvgIcon';

export default FiberManualRecord;
