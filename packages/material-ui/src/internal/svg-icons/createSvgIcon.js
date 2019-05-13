import React from 'react';
import SvgIcon from '../../SvgIcon';

export default function createSvgIcon(path, displayName) {
  const Component = React.memo(
    React.forwardRef((props, ref) => (
      <SvgIcon {...props} ref={ref}>
        {path}
      </SvgIcon>
    )),
  );

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `memo(${displayName})`;
  }

  Component.muiName = SvgIcon.muiName;

  return Component;
}
