import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ToggleIndeterminateCheckBox = (props) => (
  <SvgIcon {...props}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/>
  </SvgIcon>
);
ToggleIndeterminateCheckBox = pure(ToggleIndeterminateCheckBox)
ToggleIndeterminateCheckBox.displayName = 'ToggleIndeterminateCheckBox';

export default ToggleIndeterminateCheckBox;
