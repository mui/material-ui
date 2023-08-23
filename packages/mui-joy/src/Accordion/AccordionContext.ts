'use client';
import * as React from 'react';

/**
 * @ignore - internal component.
 */
const AccordionContext = React.createContext<
  Partial<{
    disabled: boolean;
    expanded: boolean;
    toggle: (event: React.SyntheticEvent) => void;
    accordionId: string;
  }>
>({});

if (process.env.NODE_ENV !== 'production') {
  AccordionContext.displayName = 'AccordionContext';
}

export default AccordionContext;
