import React from 'react';
import Accordion from '../Accordion';

/**
 * Use `Accordion` instead. This component will be removed in v5.
 *
 * @deprecated
 */
export default React.forwardRef(function ExpansionPanel(props, ref) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(
      [
        'Material-UI: the ExpansionPanel component was renamed to Accordion to match the naming convention of the community.',
        '',
        "You should use `import { Accordion } from '@material-ui/core'`",
        "or `import Accordion from '@material-ui/core/Accordion'`",
      ].join('\n'),
    );
  }

  return <Accordion ref={ref} {...props} />;
});
