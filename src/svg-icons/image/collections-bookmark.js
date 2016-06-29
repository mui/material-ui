import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageCollectionsBookmark = (props) => (
  <SvgIcon {...props}>
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 10l-2.5-1.5L15 12V4h5v8z"/>
  </SvgIcon>
);
ImageCollectionsBookmark = pure(ImageCollectionsBookmark);
ImageCollectionsBookmark.displayName = 'ImageCollectionsBookmark';
ImageCollectionsBookmark.muiName = 'SvgIcon';

export default ImageCollectionsBookmark;
