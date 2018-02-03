import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

const SvgIconCustom = global.__MUI_SvgIcon__ || SvgIcon;

let AssistantPhoto = props =>
  <SvgIconCustom {...props}>
    <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
  </SvgIconCustom>;

AssistantPhoto = pure(AssistantPhoto);
AssistantPhoto.muiName = 'SvgIcon';

export default AssistantPhoto;
