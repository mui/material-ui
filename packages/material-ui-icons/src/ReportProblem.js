import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let ReportProblem = props =>
  <SvgIcon {...props}>
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </SvgIcon>;

ReportProblem = pure(ReportProblem);
ReportProblem.muiName = 'SvgIcon';

export default ReportProblem;
