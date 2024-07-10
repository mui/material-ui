'use client';
import * as React from 'react';
import AvatarGroup from '@mui/material/AvatarGroup';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The AvatarGroup component was moved from the lab to the core.',
        '',
        "You should use `import { AvatarGroup } from '@mui/material'`",
        "or `import AvatarGroup from '@mui/material/AvatarGroup'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedAvatarGroup(props, ref) {
  warn();

  return <AvatarGroup ref={ref} {...props} />;
});
