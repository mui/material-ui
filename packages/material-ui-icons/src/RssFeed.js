import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let RssFeed = props =>
  <SvgIcon {...props}>
    <circle cx="6.18" cy="17.82" r="2.18" /><path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
  </SvgIcon>;

RssFeed = pure(RssFeed);
RssFeed.muiName = 'SvgIcon';

export default RssFeed;
