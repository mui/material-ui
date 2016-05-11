import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageTune = (props) => (
  <SvgIcon {...props}>
    <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
  </SvgIcon>
);
ImageTune = pure(ImageTune);
ImageTune.displayName = 'ImageTune';
ImageTune.muiName = 'SvgIcon';

export default ImageTune;
