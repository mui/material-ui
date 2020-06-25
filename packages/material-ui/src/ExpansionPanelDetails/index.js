import React from 'react';
import AccordionDetails from '../AccordionDetails';

/**
 * Use `AccordionDetails` instead. This component will be removed in v5.
 *
 * @deprecated
 */
export default React.forwardRef(function ExpansionPanelDetails(props, ref) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(
      [
        'Material-UI: the ExpansionPanelDetails component was renamed to AccordionDetails to match the naming convention of the community.',
        '',
        "You should use `import { AccordionDetails } from '@material-ui/core'`",
        "or `import AccordionDetails from '@material-ui/core/AccordionDetails'`",
      ].join('\n'),
    );
  }

  return <AccordionDetails ref={ref} {...props} />;
});
