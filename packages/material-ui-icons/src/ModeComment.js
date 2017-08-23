import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from 'material-ui/SvgIcon';

let ModeComment = props =>
  <SvgIcon {...props}>
    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
  </SvgIcon>;

ModeComment = pure(ModeComment);
ModeComment.muiName = 'SvgIcon';

export default ModeComment;
