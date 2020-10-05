import React from 'react';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedToggleButtonGroup(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: The ToggleButtonGroup component was moved from the lab to the core.',
        '',
        "You should use `import { ToggleButtonGroup } from '@material-ui/core'`",
        "or `import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <ToggleButtonGroup ref={ref} {...props} />;
});
