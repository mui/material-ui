import * as React from 'react';
import AvatarGroup from '@material-ui/core/AvatarGroup';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedAvatarGroup(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: The AvatarGroup component was moved from the lab to the core.',
        '',
        "You should use `import { AvatarGroup } from '@material-ui/core'`",
        "or `import AvatarGroup from '@material-ui/core/AvatarGroup'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <AvatarGroup ref={ref} {...props} />;
});
