import React from 'react';
import SvgIcon from '../../SvgIcon';

export default function createSvgIcon(path, displayName) {
  const Component = React.memo(props => <SvgIcon {...props}>{path}</SvgIcon>);

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `memo(${displayName})`;
  }

  Component.muiName = SvgIcon.muiName;

  return Component;
}
