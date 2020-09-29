import React from 'react';
import SpeedDialIcon from '@material-ui/core/SpeedDialIcon';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedSpeedDialIcon(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: The SpeedDialIcon component was moved from the lab to the core.',
        '',
        "You should use `import { SpeedDialIcon } from '@material-ui/core'`",
        "or `import SpeedDialIcon from '@material-ui/core/SpeedDialIcon'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <SpeedDialIcon ref={ref} {...props} />;
});
