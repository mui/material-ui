import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Subject = props =>
  <SvgIcon {...props}>
    <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z" />
  </SvgIcon>;

Subject = pure(Subject);
Subject.muiName = 'SvgIcon';

export default Subject;
