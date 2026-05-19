'use client';
import * as React from 'react';

interface AccordionContextValue {
  expanded?: boolean | undefined;
  disabled?: boolean | undefined;
  disableGutters?: boolean | undefined;
  toggle?: ((event: React.SyntheticEvent) => void) | undefined;
  summaryId?: string | undefined;
  ariaControls?: string | undefined;
}

/**
 * @ignore - internal component.
 */
const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  AccordionContext.displayName = 'AccordionContext';
}

export function useAccordionContext(): AccordionContextValue | undefined {
  const context = React.useContext(AccordionContext);
  if (context === undefined) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'MUI: AccordionSummary should be rendered inside <Accordion>. ' +
          'Rendering AccordionSummary outside <Accordion> is deprecated and will no longer be supported in the next major version.',
      );
    }
  }

  return context;
}

export default AccordionContext;
