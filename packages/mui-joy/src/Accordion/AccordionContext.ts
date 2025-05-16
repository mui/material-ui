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

export default AccordionContext;
