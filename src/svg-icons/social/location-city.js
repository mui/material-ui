import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let SocialLocationCity = (props) => (
  <SvgIcon {...props}>
    <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z"/>
  </SvgIcon>
);
SocialLocationCity = pure(SocialLocationCity);
SocialLocationCity.displayName = 'SocialLocationCity';
SocialLocationCity.muiName = 'SvgIcon';

export default SocialLocationCity;
