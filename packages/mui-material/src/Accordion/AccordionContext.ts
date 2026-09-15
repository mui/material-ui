'use client';
import * as React from 'react';

interface AccordionContextValue {
  expanded: boolean;
  disabled: boolean;
  disableGutters: boolean;
  toggle: (event: React.SyntheticEvent) => void;
  summaryId?: string | undefined;
  ariaControls?: string | undefined;
}

export const NOOP = () => {};

const DEFAULT_CONTEXT_VALUE: AccordionContextValue = {
  expanded: false,
  disabled: false,
  disableGutters: false,
  toggle: NOOP,
};

/**
 * @ignore - internal component.
 */
const AccordionContext = React.createContext(DEFAULT_CONTEXT_VALUE);

if (process.env.NODE_ENV !== 'production') {
  AccordionContext.displayName = 'AccordionContext';
}

export function useAccordionContext(): AccordionContextValue {
  const context = React.useContext(AccordionContext);
  if (context === DEFAULT_CONTEXT_VALUE) {
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
