import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let MapsNavigation = (props) => (
  <SvgIcon {...props}>
    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
  </SvgIcon>
);
MapsNavigation = pure(MapsNavigation);
MapsNavigation.displayName = 'MapsNavigation';
MapsNavigation.muiName = 'SvgIcon';

export default MapsNavigation;
