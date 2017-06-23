import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let EventSeat = props =>
  <SvgIcon {...props}>
    <path d="M4 18v3h3v-3h10v3h3v-6H4zm15-8h3v3h-3zM2 10h3v3H2zm15 3H7V5c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v8z" />
  </SvgIcon>;

EventSeat = pure(EventSeat);
EventSeat.muiName = 'SvgIcon';

export default EventSeat;
