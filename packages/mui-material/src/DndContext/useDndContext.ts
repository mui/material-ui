'use client';
import * as React from 'react';
import type { DndContextValue } from './DndContextTypes';

/**
 * Internal React context for DnD state and methods.
 * This context is consumed by useDraggable and useDroppable hooks.
 */
export const DndInternalContext = React.createContext<DndContextValue | null>(null);

if (process.env.NODE_ENV !== 'production') {
  DndInternalContext.displayName = 'DndInternalContext';
}

/**
 * Internal hook to access the DnD context.
 * Used by useDraggable and useDroppable hooks.
 *
 * @throws Error if used outside of a DndContext provider
 */
export function useDndContext(): DndContextValue {
  const context = React.useContext(DndInternalContext);

  if (context === null) {
    throw new Error(
      'MUI: useDndContext must be used within a DndContext provider. ' +
        'Wrap your component tree with <DndContext>.',
    );
  }

  return context;
}

/**
 * Hook to check if we're inside a DndContext.
 * Returns null if not inside a context (doesn't throw).
 */
export function useDndContextOptional(): DndContextValue | null {
  return React.useContext(DndInternalContext);
}
