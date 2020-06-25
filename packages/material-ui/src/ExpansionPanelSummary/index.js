import React from 'react';
import AccordionSummary from '../AccordionSummary';

/**
 * Use `AccordionSummary` instead. This component will be removed in v5.
 *
 * @deprecated
 */
export default React.forwardRef(function ExpansionPanelSummary(props, ref) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(
      [
        'Material-UI: the ExpansionPanelSummary component was renamed to AccordionSummary to match the naming convention of the community.',
        '',
        "You should use `import { AccordionSummary } from '@material-ui/core'`",
        "or `import AccordionSummary from '@material-ui/core/AccordionSummary'`",
      ].join('\n'),
    );
  }

  return <AccordionSummary ref={ref} {...props} />;
});