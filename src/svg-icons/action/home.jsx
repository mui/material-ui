import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let ActionHome = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </SvgIcon>
);
ActionHome = pure(ActionHome)
ActionHome.displayName = 'ActionHome';

export default ActionHome;
