import React from 'react';
import SvgIcon from '../../SvgIcon';

export default function createIcon(name, path) {
  const Component = React.memo(props => (
    <SvgIcon {...props}>
      <path d={path} />
    </SvgIcon>
  ));

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `memo(${name})`;
  }

  Component.muiName = SvgIcon.muiName;

  return Component;
}
