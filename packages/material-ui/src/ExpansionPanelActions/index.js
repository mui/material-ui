import React from 'react';
import AccordionActions from '../AccordionActions';

/**
 * Use `AccordionActions` instead. This component will be removed in v5.
 *
 * @deprecated
 */
export default React.forwardRef(function ExpansionPanelActions(props, ref) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(
      [
        'Material-UI: the ExpansionPanelActions component was renamed to AccordionActions to match the naming convention of the community.',
        '',
        "You should use `import { AccordionActions } from '@material-ui/core'`",
        "or `import AccordionActions from '@material-ui/core/AccordionActions'`",
      ].join('\n'),
    );
  }

  return <AccordionActions ref={ref} {...props} />;
});
