import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionViewDay = (props) => (
  <SvgIcon {...props}>
    <path d="M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z"/>
  </SvgIcon>
);
ActionViewDay = pure(ActionViewDay);
ActionViewDay.displayName = 'ActionViewDay';
ActionViewDay.muiName = 'SvgIcon';

export default ActionViewDay;
