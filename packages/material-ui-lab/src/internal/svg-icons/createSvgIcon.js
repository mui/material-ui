import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function createSvgIcon(path, displayName) {
  const Component = React.memo(
    React.forwardRef((props, ref) => (
      <SvgIcon data-mui-test={`${displayName}Icon`} ref={ref} {...props}>
        {path}
      </SvgIcon>
    )),
  );

  if (__DEV__) {
    Component.displayName = `${displayName}Icon`;
  }

  Component.muiName = SvgIcon.muiName;

  return Component;
}
