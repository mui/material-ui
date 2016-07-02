import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let MapsLocalParking = (props) => (
  <SvgIcon {...props}>
    <path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"/>
  </SvgIcon>
);
MapsLocalParking = pure(MapsLocalParking);
MapsLocalParking.displayName = 'MapsLocalParking';
MapsLocalParking.muiName = 'SvgIcon';

export default MapsLocalParking;
