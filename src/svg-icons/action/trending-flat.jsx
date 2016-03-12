import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ActionTrendingFlat = (props) => (
  <SvgIcon {...props}>
    <path d="M22 12l-4-4v3H3v2h15v3z"/>
  </SvgIcon>
);
ActionTrendingFlat = pure(ActionTrendingFlat)
ActionTrendingFlat.displayName = 'ActionTrendingFlat';

export default ActionTrendingFlat;
