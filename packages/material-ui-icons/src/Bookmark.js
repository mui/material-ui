import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let Bookmark = props =>
  <SvgIcon {...props}>
    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
  </SvgIcon>;

Bookmark = pure(Bookmark);
Bookmark.muiName = 'SvgIcon';

export default Bookmark;
