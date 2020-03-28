import React from 'react';
import SvgIcon from '../SvgIcon';

/**
 * Private module reserved for @material-ui/x packages.
 */
export default function createSvgIcon(path, displayName) {
  const Component = React.memo(
    React.forwardRef((props, ref) => (
      <SvgIcon data-mui-test={`${displayName}Icon`} ref={ref} {...props}>
        {path}
      </SvgIcon>
    )),
  );

  if (process.env.NODE_ENV !== 'production') {
    Component.displayName = `${displayName}Icon`;
  }

  Component.muiName = SvgIcon.muiName;

  return Component;
}
