import React from 'react';
import SpeedDialAction from '@material-ui/core/SpeedDialAction';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedSpeedDialAction(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: The SpeedDialAction component was moved from the lab to the core.',
        '',
        "You should use `import { SpeedDialAction } from '@material-ui/core'`",
        "or `import SpeedDialAction from '@material-ui/core/SpeedDialAction'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <SpeedDialAction ref={ref} {...props} />;
});
