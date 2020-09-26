import React from 'react';
import SpeedDial from '@material-ui/core/SpeedDial';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedSpeedDial(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: The SpeedDial component was moved from the lab to the core.',
        '',
        "You should use `import { SpeedDial } from '@material-ui/core'`",
        "or `import SpeedDial from '@material-ui/core/SpeedDial'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <SpeedDial ref={ref} {...props} />;
});
