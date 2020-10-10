import React from 'react';
import ToggleButton from '@material-ui/core/ToggleButton';

let warnedOnce = false;

/**
 * @ignore - do not document.
 */
export default React.forwardRef(function DeprecatedToggleButton(props, ref) {
  if (!warnedOnce) {
    console.warn(
      [
        'Material-UI: The ToggleButton component was moved from the lab to the core.',
        '',
        "You should use `import { ToggleButton } from '@material-ui/core'`",
        "or `import ToggleButton from '@material-ui/core/ToggleButton'`",
      ].join('\n'),
    );

    warnedOnce = true;
  }

  return <ToggleButton ref={ref} {...props} />;
});
