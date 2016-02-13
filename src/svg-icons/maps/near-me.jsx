import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let MapsNearMe = (props) => (
  <SvgIcon {...props}>
    <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/>
  </SvgIcon>
);
MapsNearMe = pure(MapsNearMe)
MapsNearMe.displayName = 'MapsNearMe';

export default MapsNearMe;
