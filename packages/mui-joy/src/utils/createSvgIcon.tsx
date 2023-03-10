import * as React from 'react';
import SvgIcon from '../SvgIcon';

/**
 * Private module reserved for @mui packages.
 */
export default function createSvgIcon(path: React.ReactNode, displayName: string): typeof SvgIcon {
  // @ts-ignore internal component
  function Component(props, ref) {
    return (
      <SvgIcon data-testid={`${displayName}Icon`} ref={ref} {...props}>
        {path}
      </SvgIcon>
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }

  // @ts-ignore internal component
  Component.muiName = SvgIcon.muiName;

  // @ts-ignore internal component
  return React.memo(React.forwardRef(Component));
}
