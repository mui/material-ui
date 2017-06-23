import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let TextFields = props =>
  <SvgIcon {...props}>
    <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z" />
  </SvgIcon>;

TextFields = pure(TextFields);
TextFields.muiName = 'SvgIcon';

export default TextFields;
