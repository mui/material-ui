import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '@docly/web/SvgIcon';

function createSvgIcon(path, displayName) {
  let Icon = props => <SvgIcon {...props}>{path}</SvgIcon>;

  Icon.displayName = `${displayName}Icon`;
  Icon = pure(Icon);
  Icon.muiName = 'SvgIcon';

  return Icon;
}

export default createSvgIcon;
